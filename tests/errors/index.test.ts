import { describe, expect, it } from 'vitest';

import {
    APIError,
    AppError,
    buildFetchError,
    concatenateSerialisedErrorMessages,
    ConnectorError,
    EngineError,
    FetchError,
    ignoreErrors,
    normalizeToError,
    serialiseError,
    unserialiseError
} from '@/errors';

describe('normalizeToError', () => {
    it('normalizes primitive values to errors', () => {
        expect(normalizeToError('boom').message).toBe('boom');
        expect(normalizeToError(42).message).toBe('42');
        expect(normalizeToError(Symbol('token')).message).toBe('token');
    });

    it('normalizes the remaining primitive kinds', () => {
        expect(normalizeToError(true).message).toBe('true');
        expect(normalizeToError(10n).message).toBe('10');
        expect(normalizeToError(undefined).message).toBe('Unknown error');
        expect(normalizeToError(Symbol()).message).toBe('Unknown error'); // A symbol with no description.
    });

    it('returns an error unchanged', () => {
        const error = new Error('original');

        expect(normalizeToError(error)).toBe(error);
    });

    it('falls back to unknown error for circular objects', () => {
        const circular: { self?: unknown } = {};
        circular.self = circular;

        expect(normalizeToError(circular).message).toBe('Unknown error');
    });
});

describe('buildFetchError', () => {
    it('captures the response body and status information', async () => {
        const error = await buildFetchError(
            {
                status: 500,
                statusText: 'Internal Server Error',
                text: () => Promise.resolve('body content')
            },
            'Request failed.',
            'tests.fetch'
        );

        expect(error).toBeInstanceOf(FetchError);
        expect(error.message).toBe("Request failed. Response status '500 - Internal Server Error' received.");
        expect(error.locator).toBe('tests.fetch');
        expect(error.data).toEqual({ body: 'body content' });
    });

    it('falls back when reading the response body fails and truncates long bodies', async () => {
        const readFailure = await buildFetchError(
            {
                status: 502,
                statusText: 'Bad Gateway',
                text: () => Promise.reject(new Error('stream closed'))
            },
            'Upstream failed.',
            'tests.fetch'
        );

        expect(readFailure.data).toEqual({ body: '<body unavailable: stream closed>' });

        const longBody = 'x'.repeat(3000);
        const truncated = await buildFetchError(
            {
                status: 413,
                statusText: 'Payload Too Large',
                text: () => Promise.resolve(longBody)
            },
            'Payload failed.',
            'tests.fetch'
        );

        const body = truncated.data?.['body'];
        if (typeof body !== 'string') throw new TypeError('Expected truncated body to be a string.');

        expect(body).toHaveLength(2063);
        expect(body.endsWith('... [truncated]')).toBe(true);
    });
});

describe('serialiseError and unserialiseError', () => {
    it('serializes and rebuilds typed error chains', () => {
        const rootCause = new ConnectorError('Connector failed', 'tests.connector', { connectorId: 'demo' });
        const error = new AppError('App failed', 'tests.app', { appId: 'demo' }, { cause: rootCause });

        const serialised = serialiseError(error);

        expect(serialised).toHaveLength(2);

        const [outerError, innerError] = serialised;
        if (!outerError || !innerError) throw new TypeError('Expected two serialised errors.');

        expect(outerError).toMatchObject({
            data: { appId: 'demo' },
            locator: 'tests.app',
            message: 'App failed.',
            name: 'AppError'
        });
        expect(innerError).toMatchObject({
            data: { connectorId: 'demo' },
            locator: 'tests.connector',
            message: 'Connector failed.',
            name: 'ConnectorError'
        });
        expect(typeof outerError.stack).toBe('string');
        expect(typeof innerError.stack).toBe('string');

        const rebuilt = unserialiseError(serialised);

        expect(rebuilt).toBeInstanceOf(AppError);
        expect((rebuilt as AppError).locator).toBe('tests.app');
        expect(rebuilt.cause).toBeInstanceOf(ConnectorError);
        expect((rebuilt.cause as ConnectorError).locator).toBe('tests.connector');
    });

    it('stops at cycles in the cause chain', () => {
        const error = new APIError('Loop', 'tests.api');
        error.cause = error;

        expect(serialiseError(error)).toHaveLength(1);
    });

    it('rebuilds every DPUse error class, including EngineError', () => {
        const rebuilt = unserialiseError(serialiseError(new EngineError('Engine failed', 'tests.engine', { engineId: 'demo' })));

        expect(rebuilt).toBeInstanceOf(EngineError);
        expect((rebuilt as EngineError).locator).toBe('tests.engine');
        expect((rebuilt as EngineError).data).toEqual({ engineId: 'demo' });
    });

    it('rebuilds an unrecognised error name as a plain error that keeps the name', () => {
        const serialised = serialiseError(new Error('Third party failed'));
        const [outerError] = serialised;
        if (!outerError) throw new TypeError('Expected one serialised error.');
        outerError.name = 'ThirdPartyError';

        const rebuilt = unserialiseError(serialised);

        expect(rebuilt.name).toBe('ThirdPartyError');
        expect(rebuilt.message).toBe('Third party failed.');
    });

    it('falls back to a serialised copy of the error when it has no name', () => {
        class NamelessError extends Error {
            override name = '';
        }
        const error = new NamelessError('Nameless');

        const [serialisedError] = serialiseError(error);

        expect(serialisedError?.name).toBe('Error');
        expect(serialisedError?.message).toBe('{"name":""}.');
    });

    it('rebuilds APIError and FetchError from their serialised names', () => {
        const apiError = unserialiseError(serialiseError(new APIError('API failed', 'tests.api')));
        const fetchError = unserialiseError(serialiseError(new FetchError('Fetch failed', 'tests.fetch')));

        expect(apiError).toBeInstanceOf(APIError);
        expect(fetchError).toBeInstanceOf(FetchError);
        expect((fetchError as FetchError).locator).toBe('tests.fetch');
    });

    it('leaves a message that already ends in punctuation alone', () => {
        const [withStop] = serialiseError(new AppError('Ends in a stop.', 'tests.app'));
        const [withEllipsis] = serialiseError(new AppError('Still going...', 'tests.app'));

        expect(withStop?.message).toBe('Ends in a stop.');
        expect(withEllipsis?.message).toBe('Still going...');
    });

    it('returns a placeholder error when there is nothing to unserialize', () => {
        const rebuilt = unserialiseError([]);

        expect(rebuilt).toBeInstanceOf(Error);
        expect(rebuilt.message).toBe('No error to unserialise.');
    });
});

describe('serialiseError redaction', () => {
    it('masks the whole value of a data field whose name looks secret', () => {
        const [serialised] = serialiseError(new AppError('Failed.', 'test', { accessToken: 'abc', nested: { clientSecret: 'def' }, status: 401 }));

        expect(serialised?.data).toEqual({ accessToken: '[REDACTED]', nested: { clientSecret: '[REDACTED]' }, status: 401 });
    });

    it('masks secrets and email addresses in messages, stacks and text data', () => {
        const body = '{"access_token":"sl.abcdefghijklmnopqrstu","token_type":"bearer","uid":"42"}';
        const error = new FetchError('Call for jo@example.com failed with Authorization: Bearer abc.def.', 'test', { body });
        error.stack = 'Error: at https://api.example.com/token?client_secret=xyz&code=1';
        const [serialised] = serialiseError(error);

        expect(serialised?.message).toBe('Call for [REDACTED] failed with Authorization: Bearer [REDACTED]');
        expect(serialised?.data).toEqual({ body: '{"access_token":"[REDACTED]","token_type":"bearer","uid":"42"}' });
        expect(serialised?.stack).toBe('Error: at https://api.example.com/token?client_secret=[REDACTED]&code=1');
    });

    it('leaves ordinary text untouched', () => {
        const [serialised] = serialiseError(new AppError('File report.csv not found: status=404.', 'test'));

        expect(serialised?.message).toBe('File report.csv not found: status=404.');
    });

    it('stops at circular data rather than looping', () => {
        const data: Record<string, unknown> = { name: 'loop' };
        data['self'] = data;
        const [serialised] = serialiseError(new AppError('Failed.', 'test', data));

        expect(serialised?.data).toEqual({ name: 'loop', self: '[Circular]' });
    });

    // The patterns are applied to response bodies of up to 2KB and to full stacks, so they must not slow down on long
    // text that nearly matches.
    it('redacts long near-matching text quickly', () => {
        const nearMatches = `${'a.'.repeat(50_000)}@`;
        const startedAt = performance.now();
        serialiseError(new AppError(nearMatches, 'test'));

        expect(performance.now() - startedAt).toBeLessThan(500);
    });
});

describe('small error helpers', () => {
    it('concatenates serialised error messages in order', () => {
        expect(
            concatenateSerialisedErrorMessages([
                { data: undefined, locator: 'a', message: 'First.', name: 'AppError', stack: undefined },
                { data: undefined, locator: 'b', message: 'Second.', name: 'ConnectorError', stack: undefined }
            ])
        ).toBe('First. Second.');
    });

    it('swallows best-effort cleanup errors', () => {
        expect(() => {
            ignoreErrors(() => {
                throw new Error('cleanup failed');
            });
        }).not.toThrow();
    });
});
