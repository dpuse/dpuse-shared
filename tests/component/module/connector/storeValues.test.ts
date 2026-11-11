// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

// ── DPUse Framework
import { convertStoreRecordToParsedRecord, convertStoreValueToText } from '@/component/module/connector';

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('convertStoreValueToText', () => {
    it('writes each kind of typed value as text, and a date and time in ISO 8601 in UTC', () => {
        const dateTime = new Date(Date.UTC(2026, 10, 11, 9, 30));

        expect(convertStoreValueToText('Ada')).toBe('Ada');
        expect(convertStoreValueToText(2.5)).toBe('2.5');
        expect(convertStoreValueToText(9_007_199_254_740_993n)).toBe('9007199254740993');
        expect(convertStoreValueToText(false)).toBe('false');
        expect(convertStoreValueToText(dateTime)).toBe('2026-11-11T09:30:00.000Z');
    });

    it('leaves an empty value empty', () => {
        expect(convertStoreValueToText(null)).toBeNull();
    });
});

describe('convertStoreRecordToParsedRecord', () => {
    it('writes each value of a record as text, none of them quoted', () => {
        expect(convertStoreRecordToParsedRecord([1, null, 'a'])).toEqual([
            { value: '1', valueWasQuoted: false },
            { value: null, valueWasQuoted: false },
            { value: 'a', valueWasQuoted: false }
        ]);
    });
});
