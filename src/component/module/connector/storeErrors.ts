// ── DPUse Framework
import { ConnectorError } from '@/errors';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// 'heldElsewhere' means another tab or window has the store open, or has just taken it from this one. 'notLoaded' means
// the store has no table at the path asked for, because it was never loaded or has since been removed.
export type StoreErrorId = 'heldElsewhere' | 'notLoaded';

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The id travels in the error's data, which survives the trip from a connector through the engine to the app, so the
// app can show the right state rather than a failure.
export function constructStoreError(storeErrorId: StoreErrorId, message: string, locator: string, options?: ErrorOptions): ConnectorError {
    return new ConnectorError(message, locator, { storeErrorId }, options);
}

// Looks through the error and its causes, because the engine and the app each wrap a connector's error in their own.
export function findStoreErrorId(error: unknown): StoreErrorId | undefined {
    const seenErrors = new Set<unknown>();
    for (let cause: unknown = error; cause instanceof Error && !seenErrors.has(cause); cause = cause.cause) {
        seenErrors.add(cause);
        const storeErrorId = (cause as { data?: { storeErrorId?: unknown } }).data?.storeErrorId;
        if (storeErrorId === 'heldElsewhere' || storeErrorId === 'notLoaded') return storeErrorId;
    }
    return undefined;
}
