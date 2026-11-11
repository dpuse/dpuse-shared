// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Takes a Web Lock without waiting, so a tab that cannot have it is told at once. Returns the function that releases it,
// or undefined when another tab holds it. A request that fails, e.g. where Web Locks are blocked, ends first and so
// rejects.
export async function acquireWebLock(name: string): Promise<(() => void) | undefined> {
    const acquisition = Promise.withResolvers<(() => void) | undefined>();
    const lockRequest = navigator.locks.request(name, { ifAvailable: true }, (lock) => {
        if (lock == null) {
            acquisition.resolve(undefined);
            return;
        }
        return new Promise<void>((release) => {
            acquisition.resolve(release);
        });
    });
    const endedRequest = (async (): Promise<undefined> => {
        await lockRequest;
        return undefined;
    })();
    return await Promise.race([acquisition.promise, endedRequest]);
}
