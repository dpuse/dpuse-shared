// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { Component, ComponentInstanceConfig } from '@/component';
import type { ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connection';
import { createLabelMap, DEFAULT_LOCALE_ID, type LocaleLabelMap, resolveLabel } from '@/locale';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type DataViewInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface DataViewConfig extends ComponentInstanceConfig {
    typeId: 'dataView';
    connectionId: string | undefined;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    previewConfig: PreviewConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined;
    relationshipsAuditConfig: RelationshipsAuditConfig | undefined;
}

// ── Types - Preview Configuration ────────────────────────────────────────────────────────────────────────────────────

export interface PreviewConfig {
    asAt: number;
    commentMarkId?: string | undefined; // TODO: under review.
    commentMarkOtherCharSeq?: string | undefined; // TODO: under review.
    columnConfigs: ObjectColumnConfig[];
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string | undefined; // TODO: under review.
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    inferenceRecords: InferenceRecord[];
    linesToSkipAtStart?: number | undefined; // TODO: under review.
    parsedRecords: ParsingRecord[];
    quoteEscapeChar?: string | undefined; // TODO: under review.
    quoteMarkId?: string | undefined; // TODO: under review.
    quoteMarkOtherCharSeq?: string | undefined; // TODO: under review.
    recordDelimiterId: RecordDelimiterId | undefined;
    recordDelimiterOtherCharSeq?: string | undefined; // TODO: under review.
    size: number | undefined;
    skipEmptyLines?: boolean | undefined; // TODO: under review.
    skipLinesWithEmptyValues?: boolean | undefined; // TODO: under review.
    skipLinesWithErrors?: boolean | undefined; // TODO: under review.
    text: string | undefined;
    valueDelimiterId: ValueDelimiterId | undefined;
    valueDelimiterOtherCharSeq?: string | undefined; // TODO: under review.
    valueTrimMethodId?: ValueTrimMethodId | undefined; // TODO: under review.
}

export type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml' | 'unknown';

export type ParsingRecord = ParsingResult[];

export interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}

export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

export type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

export type ValueTrimMethodId = 'both' | 'left' | 'right' | 'none';

// ── Types - Content Audit Configuration ──────────────────────────────────────────────────────────────────────────────

export interface ContentAuditConfig {
    asAt: number;
    columns: ObjectColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}

// ── Types - Relationships Audit Configuration ────────────────────────────────────────────────────────────────────────

export interface RelationshipsAuditConfig {
    placeholder: string; // TODO
}

// ── Types - Data Type Identifiers ────────────────────────────────────────────────────────────────────────────────────

export type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';

export type DataSubtypeId = NumericSubtypeId | StringSubtypeId | TemporalSubtypeId;

export type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';

export type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';

export type TemporalSubtypeId = 'date' | 'dateTime' | 'time';

// ── Types - Data Type Inference ──────────────────────────────────────────────────────────────────────────────────────

export interface InferenceSummary {
    columnConfigs: ObjectColumnConfig[];
    hasHeaderRow: boolean;
    typedRecords: InferenceRecord[];
}

export type InferenceRecord = InferenceResult[];

export type InferenceResult = BooleanInferenceResult | NumericInferenceResult | StringInferenceResult | TemporalInferenceResult | UnknownInferenceResult;

export interface BooleanInferenceResult {
    dataTypeId: 'boolean';
    dataSubtypeId: undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: boolean;
}

export type NumericInferenceResult = BigIntInferenceResult | NumberInferenceResult;

export interface BigIntInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'bigint';
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: bigint;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}

export interface NumberInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'integer' | 'decimal';
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: number;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}

export type NumericSignId = 'negative' | 'zero' | 'positive';

export type NumericUnitsId = 'currency' | 'percentage' | 'plain';

export interface StringInferenceResult {
    dataTypeId: 'string';
    dataSubtypeId: StringSubtypeId;
    format: string | undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: string;
}

export interface TemporalInferenceResult {
    dataTypeId: 'temporal';
    dataSubtypeId: TemporalSubtypeId;
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: Date;
}

export interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    dataSubtypeId: undefined;
    inputValue: string | null;
    inputValueWasQuoted: boolean;
    inferredValue: null;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const DATA_FORMATS_CONFIG: { id: DataFormatId; labels: LocaleLabelMap }[] = [
    { id: 'dpe', labels: createLabelMap({ en: 'Data Positioning Events' }) },
    { id: 'dtv', labels: createLabelMap({ en: 'Delimited Text' }) },
    { id: 'json', labels: createLabelMap({ en: 'JSON' }) },
    { id: 'spss', labels: createLabelMap({ en: 'SPSS' }) },
    { id: 'xlsx', labels: createLabelMap({ en: 'XLSX' }) },
    { id: 'xml', labels: createLabelMap({ en: 'XML' }) }
];

export const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[] = [',', ';', '\t', '|', ' ', ':', '_', '!', '0x1F', '0x1E']; // Ordered from estimated most common to least common.

const RECORD_DELIMITERS_CONFIG: { id: RecordDelimiterId; labels: LocaleLabelMap }[] = [
    { id: '\n', labels: createLabelMap({ en: 'Newline' }) },
    { id: '\r', labels: createLabelMap({ en: 'Carriage Return' }) },
    { id: '\r\n', labels: createLabelMap({ en: 'Carriage Return/Newline' }) }
];

const VALUE_DELIMITERS_CONFIG: { id: ValueDelimiterId; labels: LocaleLabelMap }[] = [
    { id: ':', labels: createLabelMap({ en: 'Colon' }) },
    { id: ',', labels: createLabelMap({ en: 'Comma' }) },
    { id: '!', labels: createLabelMap({ en: 'Exclamation Mark' }) },
    // { id: '', label: { 'en': 'Other' } }, // TODO: Maybe set this to a 'not printing' or special ascii character when there is a user supplied delimited, rather than ''?
    { id: '0x1E', labels: createLabelMap({ en: 'Record Separator' }) },
    { id: ';', labels: createLabelMap({ en: 'Semicolon' }) },
    { id: ' ', labels: createLabelMap({ en: 'Space' }) },
    { id: '\t', labels: createLabelMap({ en: 'Tab' }) },
    { id: '_', labels: createLabelMap({ en: 'Underscore' }) },
    { id: '0x1F', labels: createLabelMap({ en: 'Unit Separator' }) },
    { id: '|', labels: createLabelMap({ en: 'Vertical Bar' }) }
];

// ── Actions - Data Format(s) ─────────────────────────────────────────────────────────────────────────────────────────

interface ObjectDataFormat {
    id: DataFormatId;
    label: string;
}

function getDataFormat(id: DataFormatId, localeId = DEFAULT_LOCALE_ID): ObjectDataFormat {
    const dataFormat = DATA_FORMATS_CONFIG.find((dataFormat) => dataFormat.id === id);
    if (dataFormat) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        return { id: dataFormat.id, label: localizedLabel ?? dataFormat.id };
    }
    return { id, label: id };
}

function getDataFormats(localeId = DEFAULT_LOCALE_ID): ObjectDataFormat[] {
    const items: ObjectDataFormat[] = [];
    for (const dataFormat of DATA_FORMATS_CONFIG) {
        const localizedLabel = resolveLabel(dataFormat.labels, localeId);
        items.push({ id: dataFormat.id, label: localizedLabel ?? dataFormat.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
}

// ── Actions - Record Delimiter(s) ────────────────────────────────────────────────────────────────────────────────────

interface ObjectRecordDelimiter {
    id: RecordDelimiterId;
    label: string;
}

const getRecordDelimiter = (id: RecordDelimiterId, localeId = DEFAULT_LOCALE_ID): ObjectRecordDelimiter => {
    const recordDelimiter = RECORD_DELIMITERS_CONFIG.find((recordDelimiter) => recordDelimiter.id === id);
    if (recordDelimiter) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        return { id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id };
    }
    return { id, label: id };
};

const getRecordDelimiters = (localeId = DEFAULT_LOCALE_ID): ObjectRecordDelimiter[] => {
    const items: ObjectRecordDelimiter[] = [];
    for (const recordDelimiter of RECORD_DELIMITERS_CONFIG) {
        const localizedLabel = resolveLabel(recordDelimiter.labels, localeId);
        items.push({ id: recordDelimiter.id, label: localizedLabel ?? recordDelimiter.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
};

// ── Actions - Value Delimiter(s) ─────────────────────────────────────────────────────────────────────────────────────

interface ValueDelimiter {
    id: ValueDelimiterId;
    label: string;
}
const getValueDelimiter = (id: ValueDelimiterId, localeId = DEFAULT_LOCALE_ID): ValueDelimiter => {
    const valueDelimiter = VALUE_DELIMITERS_CONFIG.find((valueDelimiter) => valueDelimiter.id === id);
    if (valueDelimiter) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        return { id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id };
    }
    return { id, label: id };
};

const getValueDelimiters = (localeId = DEFAULT_LOCALE_ID): ValueDelimiter[] => {
    const items: ValueDelimiter[] = [];
    for (const valueDelimiter of VALUE_DELIMITERS_CONFIG) {
        const localizedLabel = resolveLabel(valueDelimiter.labels, localeId);
        items.push({ id: valueDelimiter.id, label: localizedLabel ?? valueDelimiter.id });
    }
    return items.toSorted((first, second) => first.label.localeCompare(second.label));
};
