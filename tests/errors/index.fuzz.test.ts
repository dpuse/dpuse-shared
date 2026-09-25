import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { AppError, normalizeToError, type SerialisedError, serialiseError, unserialiseError } from '@/errors';

const DATA_ARBITRARY = fc.option(fc.dictionary(fc.string(), fc.jsonValue()), { nil: undefined });
const ERROR_PARTS_ARBITRARY = fc.record({ message: fc.string(), locator: fc.string(), data: DATA_ARBITRARY });

// Property-based tests: fast-check generates many random inputs per property, including the awkward ones (empty
// strings, unusual Unicode, circular or deeply nested objects) that hand-written cases tend to miss.

describe('normalizeToError (property-based)', () => {
    it('turns any thrown value into an error without throwing', () => {
        fc.assert(
            fc.property(fc.anything({ withBigInt: true, withMap: true, withSet: true, withNullPrototype: true }), (value) => {
                expect(normalizeToError(value)).toBeInstanceOf(Error);
            })
        );
    });
});

describe('serialiseError (property-based)', () => {
    it('serialises any thrown value, with every message ending in punctuation', () => {
        fc.assert(
            fc.property(fc.anything({ withBigInt: true, withMap: true, withSet: true }), (value) => {
                const serialisedErrors = serialiseError(value);

                expect(serialisedErrors.length).toBeGreaterThan(0);
                for (const serialisedError of serialisedErrors) expect(serialisedError.message).toMatch(/(?:\.{3}|[.!?])$/);
            })
        );
    });

    it('gives the same result when an unserialised error is serialised again', () => {
        fc.assert(
            fc.property(fc.array(ERROR_PARTS_ARBITRARY, { minLength: 1, maxLength: 4 }), (errorParts) => {
                // Build the cause chain from the root cause outwards.
                let error: Error | undefined;
                for (const { message, locator, data } of errorParts.toReversed()) error = new AppError(message, locator, data, { cause: error });
                const serialisedErrors: SerialisedError[] = serialiseError(error);

                expect(serialiseError(unserialiseError(serialisedErrors))).toEqual(serialisedErrors);
            })
        );
    });

    it('never lets a bearer token through', () => {
        fc.assert(
            fc.property(fc.string(), fc.stringMatching(/^[\w.~+/=-]{8,40}$/), fc.string(), (before, token, after) => {
                const [serialisedError] = serialiseError(new Error(`${before} Bearer ${token} ${after}`));

                expect(serialisedError?.message).not.toContain(`Bearer ${token}`);
            })
        );
    });
});
