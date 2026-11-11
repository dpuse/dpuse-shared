// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { resolveRequestSignal } from '@/component/module/engine';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('resolveRequestSignal', () => {
    it("returns the request's own signal", () => {
        const { signal } = new AbortController();

        expect(resolveRequestSignal({ signal })).toBe(signal);
    });

    it('returns a signal that has not fired for a request with none', () => {
        expect(resolveRequestSignal({}).aborted).toBe(false);
    });
});
