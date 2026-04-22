import { describe, expect, it } from 'vitest';

import {
    APIError,
    AppError,
    buildFetchError,
    concatenateSerialisedErrorMessages,
    ConnectorError,
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
        expect(rebuilt?.cause).toBeInstanceOf(ConnectorError);
        expect((rebuilt?.cause as ConnectorError | undefined)?.locator).toBe('tests.connector');
    });

    it('stops at cycles in the cause chain', () => {
        const error = new APIError('Loop', 'tests.api');
        error.cause = error;

        expect(serialiseError(error)).toHaveLength(1);
    });

    it('returns undefined when there is nothing to unserialize', () => {
        expect(unserialiseError([])).toBeUndefined();
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
