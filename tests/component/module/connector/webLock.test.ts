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

    it('rejects when the lock cannot be requested', async () => {
        vi.spyOn(navigator.locks, 'request').mockRejectedValue(new Error('Web Locks are blocked.'));

        await expect(acquireWebLock('dpuse-test-lock')).rejects.toThrow('Web Locks are blocked.');
    });
});
