// ── External Dependencies & Registrations
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── DPUse Framework
import { acquireWebLock } from '@/component/module/connector';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('acquireWebLock', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('takes a free lock, refuses it while held, and gives it again once released', async () => {
        const release = await acquireWebLock('dpuse-test-lock');

        expect(release).toBeTypeOf('function');
        await expect(acquireWebLock('dpuse-test-lock')).resolves.toBeUndefined();
        await release?.();
        const nextRelease = await acquireWebLock('dpuse-test-lock'); // Free as soon as the release resolves, with no wait.
        expect(nextRelease).toBeTypeOf('function');
        await nextRelease?.();
    });

    it('takes a held lock over and tells the holder, which can still release without waiting', async () => {
        const onLost = vi.fn();
        const release = await acquireWebLock('dpuse-test-lock', { onLost });

        const takenRelease = await acquireWebLock('dpuse-test-lock', { takeOver: true });

        expect(takenRelease).toBeTypeOf('function');
        await vi.waitFor(() => {
            expect(onLost).toHaveBeenCalledOnce();
        });
        await release?.(); // Resolves at once, because the lock is no longer this holder's to free.
        await expect(acquireWebLock('dpuse-test-lock')).resolves.toBeUndefined(); // Still held by the tab that took it over.
        await takenRelease?.();
    });

    it('does not report a lost lock when the holder releases it itself', async () => {
        const onLost = vi.fn();
        const release = await acquireWebLock('dpuse-test-lock', { onLost });

        await release?.();

        expect(onLost).not.toHaveBeenCalled();
    });

    it('rejects when the lock cannot be requested', async () => {
        vi.spyOn(navigator.locks, 'request').mockRejectedValue(new Error('Web Locks are blocked.'));

        await expect(acquireWebLock('dpuse-test-lock')).rejects.toThrow('Web Locks are blocked.');
    });
});
