// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { resolveStorePath } from '@/component/module/connector';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('resolveStorePath', () => {
    it('names the database and the table in a path that starts with a slash', () => {
        expect(resolveStorePath('/sales_2026/orders')).toEqual({ databaseName: 'sales_2026', tableName: 'orders' });
    });

    it('uses the default database for a path that is only a table name', () => {
        expect(resolveStorePath('dataView1-draft')).toEqual({ databaseName: undefined, tableName: 'dataView1-draft' });
    });

    it.each(['/sales', '/sales/', '//orders', '/sales/orders/2026', '/sales.db/orders', '/../orders'])('rejects the invalid path %s', (path) => {
        expect(() => resolveStorePath(path)).toThrow(`Encountered invalid store path '${path}'.`);
    });
});
