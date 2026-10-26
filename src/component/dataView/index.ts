// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { Component, ComponentInstanceConfig } from '@/component';
import type { ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connection';
import { createLabelMap, DEFAULT_LOCALE_ID, type LocaleLabelMap, resolveLabel } from '@/locale/label';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type DataViewInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface DataViewConfig extends ComponentInstanceConfig {
    typeId: 'dataView';
    connectionId: string; // Always set, because a data view is only saved once its connection is chosen.
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
    issues?: PreviewIssue[]; // What stops or limits reading the item as data, e.g. an empty file or parsing errors. Absent from connectors that do not report them.
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

// One thing found while previewing an item. Not a failure: the preview still holds whatever was read, so the item can be
// shown and read another way.
export interface PreviewIssue {
    id: string; // The parser's own code, e.g. 'CSV_QUOTE_NOT_CLOSED', or 'empty' for an item with no content.
    lineNumber: number | undefined; // The line of the text where it was found, counting from 1, when the parser says.
    message: string; // In English, as the parser gives it. The app shows its own wording for the ids it knows.
    severityId: PreviewIssueSeverityId;
}

export type PreviewIssueSeverityId = 'error' | 'info' | 'warning'; // Only an error stops the item being read as data.

export type DataFormatId =
    | 'arrow'
    | 'avro'
    | 'dtv'
    | 'json'
    | 'jsonl'
    | 'markdown'
    | 'ods'
    | 'parquet'
    | 'sav'
    | 'sqlite'
    | 'xlsx'
    | 'xml'
    | 'unknown';

export type ParsingRecord = ParsingResult[];

interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}

export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

export type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

type ValueTrimMethodId = 'both' | 'left' | 'right' | 'none';

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

interface RelationshipsAuditConfig {
    placeholder: string; // TODO
}

// ── Types - Data Type Identifiers ────────────────────────────────────────────────────────────────────────────────────

export type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';

export type DataSubtypeId = NumericSubtypeId | StringSubtypeId | TemporalSubtypeId;

export type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';

type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';

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

interface BigIntInferenceResult {
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

interface NumberInferenceResult {
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

interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    dataSubtypeId: undefined;
    inputValue: string | null;
    inputValueWasQuoted: boolean;
    inferredValue: null;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

export { DATA_FORMAT_ICON_CONFIGS, type DataFormatIconConfig } from './dataFormatIcons';

const DATA_FORMATS_CONFIG: { id: DataFormatId; labels: LocaleLabelMap }[] = [
    { id: 'arrow', labels: createLabelMap({ en: 'Arrow' }) },
    { id: 'avro', labels: createLabelMap({ en: 'Avro' }) },
    { id: 'dtv', labels: createLabelMap({ en: 'Delimited text (CSV, TAB, TSV…)' }) },
    { id: 'json', labels: createLabelMap({ en: 'JSON' }) },
    { id: 'jsonl', labels: createLabelMap({ en: 'JSON Lines (JSONL)' }) },
    { id: 'markdown', labels: createLabelMap({ en: 'Markdown (MD)' }) },
    { id: 'ods', labels: createLabelMap({ en: 'OpenDocument spreadsheet (ODS)' }) },
    { id: 'parquet', labels: createLabelMap({ en: 'Parquet' }) },
    { id: 'sav', labels: createLabelMap({ en: 'SPSS (SAV)' }) },
    { id: 'sqlite', labels: createLabelMap({ en: 'SQLite' }) },
    { id: 'xlsx', labels: createLabelMap({ en: 'Excel (XLSX, XLSM)' }) },
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
