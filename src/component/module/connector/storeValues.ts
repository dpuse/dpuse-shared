// ── DPUse Framework
import type { ParsedRecord } from '@/component/dataView';
import type { StoreRecord, StoreValue } from '@/component/module/connector';

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// A typed record as text, for the steps that read text: a preview's sample, the column auditor and a load's conversion
// to a type the user chose. A date and time is written in ISO 8601, in UTC. No value was quoted, because none came from
// delimited text.
export function convertStoreRecordToParsedRecord(storeRecord: StoreRecord): ParsedRecord {
    return storeRecord.map((storeValue) => ({ value: convertStoreValueToText(storeValue), valueWasQuoted: false }));
}

export function convertStoreValueToText(storeValue: StoreValue): string | null {
    if (storeValue == null) return null;
    return storeValue instanceof Date ? storeValue.toISOString() : String(storeValue);
}
