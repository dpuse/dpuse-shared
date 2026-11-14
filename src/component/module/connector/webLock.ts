// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface AcquireWebLockOptions {
    onLost?: () => void; // Called when another tab takes the lock over while this one holds it.
    takeOver?: boolean; // Takes the lock even when another tab holds it, which that tab's 'onLost' then hears of.
}

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Takes a Web Lock without waiting, so a tab that cannot have it is told at once. Returns the function that releases it,
// or undefined when another tab holds it. A request that fails, e.g. where Web Locks are blocked, rejects. The browser
// frees a released lock a moment later, so the release resolves only once the lock is free. Otherwise a request made
// straight after a release would find the lock still held.
//
// A takeover is the way out when a tab holds the lock but cannot be reached, such as one left open in another window.
// The browser ends the holder's request with an 'AbortError', so the holder can close what the lock protects.
export async function acquireWebLock(name: string, options: AcquireWebLockOptions = {}): Promise<(() => Promise<void>) | undefined> {
    const acquisition = Promise.withResolvers<(() => void) | undefined>();
    const grant = { isGranted: false }; // An object, because the lock callback sets it where type narrowing cannot see.
    const lockRequest = navigator.locks.request(name, options.takeOver === true ? { steal: true } : { ifAvailable: true }, (lock) => {
        if (lock == null) {
            acquisition.resolve(undefined);
            return;
        }
        grant.isGranted = true;
        return new Promise<void>((release) => {
            acquisition.resolve(release);
        });
    });
    const endedRequest = (async (): Promise<void> => {
        try {
            await lockRequest;
        } catch (error) {
            if (!grant.isGranted) acquisition.reject(error instanceof Error ? error : new Error(String(error)));
            else if (error instanceof DOMException && error.name === 'AbortError') options.onLost?.();
        }
    })();
    const release = await acquisition.promise;
    if (release == null) return;
    return async (): Promise<void> => {
        release();
        await endedRequest; // Settles once the browser has freed the lock, or at once when it was taken over.
    };
}
