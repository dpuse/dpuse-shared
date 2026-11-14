// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { AppError, EngineError, serialiseError, unserialiseError } from '@/errors';
import { constructStoreError, findStoreErrorId } from '@/component/module/connector';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// A connector is built with its own copy of the shared code, so its 'ConnectorError' is a different class from this one.
class ConnectorCopyError extends Error {
    readonly data: Record<string, unknown>;
    readonly locator: string;
    constructor(message: string, locator: string, data: Record<string, unknown>) {
        super(message);
        this.name = 'ConnectorError';
        this.data = data;
        this.locator = locator;
    }
}

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('store errors', () => {
    it('finds the id on a store error', () => {
        expect(findStoreErrorId(constructStoreError('heldElsewhere', 'The store is open in another tab or window.', 'test'))).toBe('heldElsewhere');
    });

    it('finds the id through the errors the engine and the app wrap it in, after the trip from the worker', () => {
        const engineError = new EngineError('Engine failed to complete query records request.', 'test.engine', undefined, {
            cause: constructStoreError('notLoaded', "'sales' has not been loaded.", 'test.connector')
        });
        const appError = new AppError("Failed to read the data view's records.", 'test.app', undefined, { cause: unserialiseError(serialiseError(engineError)) });

        expect(findStoreErrorId(appError)).toBe('notLoaded');
    });

    it("finds the id on an error from a connector's own copy of the shared code, after the trip through the engine", () => {
        const engineError = new EngineError('Engine failed to complete list nodes request.', 'test.engine', undefined, {
            cause: new ConnectorCopyError('The store is open in another tab or window.', 'test.connector', { storeErrorId: 'heldElsewhere' })
        });

        const errorInApp = unserialiseError(serialiseError(engineError));

        expect(findStoreErrorId(errorInApp)).toBe('heldElsewhere');
    });

    it('finds no id on any other error, or on a value that is not an error', () => {
        expect(findStoreErrorId(new AppError('Failed.', 'test', { storeErrorId: 'other' }))).toBeUndefined();
        expect(findStoreErrorId(new Error('Failed.'))).toBeUndefined();
        expect(findStoreErrorId('Failed.')).toBeUndefined();
    });
});
