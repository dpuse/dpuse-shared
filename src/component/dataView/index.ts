// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { ComponentInstanceConfig } from '@/component';
import type { ConnectionNodeConfig, DateOrderId, DecimalSeparatorId, ObjectColumnConfig } from '@/component/connection';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Data View
export interface DataViewConfig extends ComponentInstanceConfig {
    typeId: 'dataView';
    connectionId: string;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    readingConfig: ReadingConfig | undefined;
    sampleConfig: SampleConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined; // What the latest audit found, its columns included. Each audit replaces it whole.
    columnChoiceConfigs: ColumnChoiceConfigs | undefined; // What the user chose for the columns. An audit leaves it as it is.
    storeConnectorId: string | undefined;
}

// ── Reading ─ How an item is read. Found when it is first opened, and followed by every audit and load.
export interface ReadingConfig {
    dataFormatId: DataFormatId;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    parserId: string | undefined; // The config id of the tool that parsed the item. Absent where no tool did, e.g. an empty file or a format no tool reads yet.
    recordDelimiterId: RecordDelimiterId | undefined;
    valueDelimiterId: ValueDelimiterId | undefined;

    // TODO: following are under review.
    // commentMarkId: string | undefined;
    // commentMarkOtherCharSeq: string | undefined;
    // linesToSkipAtStart: number | undefined;
    // quoteEscapeChar: string | undefined;
    // quoteMarkId: string | undefined;
    // quoteMarkOtherCharSeq: string | undefined;
    // recordDelimiterOtherCharSeq: string | undefined;
    // skipEmptyLines: boolean | undefined;
    // skipLinesWithEmptyValues: boolean | undefined;
    // skipLinesWithErrors: boolean | undefined;
    // valueDelimiterOtherCharSeq: string | undefined;
    // valueTrimMethodId: 'both' | 'left' | 'right' | 'none' | undefined;
}

export type DataFormatId = (typeof DATA_FORMAT_CONFIGS)[number]['id'];

export type DataFormatSupportId = 'planned' | 'supported' | 'unsupported';

export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

export type ValueDelimiterId = (typeof VALUE_DELIMITER_CONFIGS)[number]['id'] | ''; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

// ── Sample Configuration ─ The start of an item, as text and records. Small enough to hold in memory and save with a
// data view, unlike what an audit reads.
export interface SampleConfig {
    issues: SampleIssue[]; // What stops or limits reading the item as data, e.g. an empty file or parsing errors.
    parsedRecords: ParsedRecord[];
    size: number | undefined; // How many bytes of the item the text and records came from. Undefined where the item is not read as bytes.
    text: string | undefined;
}

// One thing found while sampling an item. Not a failure: the sample still holds whatever was read, so the item can be
// shown and read another way.
export interface SampleIssue {
    endLineNumber: number | undefined; // The last line it covers, when it runs over several, e.g. a quote never closed runs to where the parser gave up.
    fieldNumber: number | undefined; // The value within the record, counting from 1.
    id: string; // The parser's own code, e.g. 'CSV_QUOTE_NOT_CLOSED', or 'empty' for an item with no content.
    lineNumber: number | undefined; // The line of the text where it starts, counting from 1, when the parser says.
    message: string; // In English, as the parser gives it. The app shows its own wording for the ids it knows.
    recordNumber: number | undefined; // The record it is in, counting from 1, a header record included.
    severityId: SampleIssueSeverityId;
    value: string | undefined; // The value or character at fault, cut short when long.
}

export type SampleIssueSeverityId = 'error' | 'info' | 'warning'; // Only an error stops the item being read as data.

export type ParsedRecord = { value: string | null; valueWasQuoted: boolean }[];

// ── Content Audit ─ How much of an item has been audited and what was found. Opening an item audits its first few
// kilobytes, and later audits read further from its start. A parser that only counts records, such as the Rust CSV
// parser, leaves the columns empty and the other counts undefined.
export interface ContentAuditConfig {
    asAt: number;
    byteCount: number; // How many bytes of the item were audited. 0 where the item is not read as bytes.
    columns: ObjectColumnConfig[];
    commentLineCount: number | undefined;
    emptyLineCount: number | undefined;
    invalidFieldLengthCount: number | undefined; // Records whose number of values differs from the first record's.
    duration: number;
    isComplete: boolean; // Whether the audit reached the end of the item.
    lineCount: number | undefined;
    recordCount: number; // Data records only. A header record is not counted.
    sourceWaitDuration: number | undefined; // The part of 'duration' spent waiting for the item's bytes, e.g. while it downloads. Undefined where the bytes were fetched before the audit started.
}

// ── Column Choices ─ What the user chose for each column, keyed by the column's position as a string. A column takes
// each choice in place of what the audit detected, and keeps what was detected for anything not chosen.
export type ColumnChoiceConfigs = Partial<Record<string, ColumnChoiceConfig>>;

// A type chosen without a subtype keeps the detected subtype when it is the detected type.
export interface ColumnChoiceConfig {
    dataTypeId: DataTypeId | undefined;
    dataSubtypeId: DataSubtypeId | undefined;
    dateOrderId: DateOrderId | undefined; // For a column of dates whose values do not settle it.
    decimalSeparatorId: DecimalSeparatorId | undefined; // For a column whose values do not settle it.
    nullWordsAreEmpty: boolean | undefined; // For a text column: read null words such as 'NA' as no value.
}

// ── Data Types

type DataTypeConfig = (typeof DATA_TYPE_CONFIGS)[number];
export type DataTypeId = DataTypeConfig['id'];
export type DataSubtypeId = DataTypeConfig['subtypeIds'][number];
export type NumericSubtypeId = Extract<DataTypeConfig, { id: 'numeric' }>['subtypeIds'][number];
export type StringSubtypeId = Extract<DataTypeConfig, { id: 'string' }>['subtypeIds'][number];
export type TemporalSubtypeId = Extract<DataTypeConfig, { id: 'temporal' }>['subtypeIds'][number];

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Data Formats ─ What DPUse can do with each format. 'supportId' says whether a format is read as data today, is
// planned but has no reader yet, or is not data. A format with 'isText' can be shown as text, and one with 'isTable' as
// a table of records.
export const DATA_FORMAT_CONFIGS = [
    { id: 'arrow', isTable: false, isText: false, supportId: 'planned' },
    { id: 'avro', isTable: false, isText: false, supportId: 'planned' },
    { id: 'dtv', isTable: true, isText: true, supportId: 'supported' },
    { id: 'json', isTable: false, isText: false, supportId: 'planned' },
    { id: 'jsonl', isTable: false, isText: false, supportId: 'planned' },
    { id: 'markdown', isTable: false, isText: true, supportId: 'unsupported' }, // A document, so it is shown but not read as data.
    { id: 'ods', isTable: false, isText: false, supportId: 'planned' },
    { id: 'parquet', isTable: false, isText: false, supportId: 'planned' },
    { id: 'sav', isTable: false, isText: false, supportId: 'planned' },
    { id: 'sqlite', isTable: false, isText: false, supportId: 'planned' },
    { id: 'xlsx', isTable: false, isText: false, supportId: 'planned' },
    { id: 'xml', isTable: false, isText: false, supportId: 'planned' },
    { id: 'unknown', isTable: false, isText: false, supportId: 'unsupported' }
] as const satisfies readonly { id: string; isTable: boolean; isText: boolean; supportId: DataFormatSupportId }[];

// ── Value Delimiters ─ In the order detection tries them, most common first. The record and unit separators are
// invisible characters, so their ids name them and 'character' holds the character itself.
export const VALUE_DELIMITER_CONFIGS = [
    { id: ',', character: ',' },
    { id: ';', character: ';' },
    { id: '\t', character: '\t' },
    { id: '|', character: '|' },
    { id: ' ', character: ' ' },
    { id: ':', character: ':' },
    { id: '_', character: '_' },
    { id: '!', character: '!' },
    { id: '0x1F', character: '\u{1F}' },
    { id: '0x1E', character: '\u{1E}' }
] as const satisfies readonly { character: string; id: string }[];

// ── Data Types ─ In the order a list of types shows them, each with its subtypes. A type stored with no subtype is
// read as its 'defaultSubtypeId'. 'unknown' is only ever detected, so it cannot be chosen.
export const DATA_TYPE_CONFIGS = [
    {
        id: 'string',
        defaultSubtypeId: 'plain',
        isChoosable: true,
        subtypeIds: [
            'plain',
            'email',
            'url',
            'uuid',
            'ulid',
            'ipv4',
            'ipv6',
            'ipRange',
            'macAddress',
            'iban',
            'isbn',
            'paymentCard',
            'hexColor',
            'json',
            'countryCode',
            'currencyCode',
            'languageCode'
        ]
    },
    { id: 'numeric', defaultSubtypeId: 'integer', isChoosable: true, subtypeIds: ['integer', 'decimal', 'bigint'] },
    { id: 'temporal', defaultSubtypeId: 'dateTime', isChoosable: true, subtypeIds: ['date', 'dateTime', 'time'] },
    { id: 'boolean', defaultSubtypeId: undefined, isChoosable: true, subtypeIds: [] },
    { id: 'unknown', defaultSubtypeId: undefined, isChoosable: false, subtypeIds: [] }
] as const satisfies readonly { defaultSubtypeId: string | undefined; id: string; isChoosable: boolean; subtypeIds: readonly string[] }[];

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The character a value delimiter splits values with. The '' placeholder has none, so it comes back as itself.
export function getValueDelimiterCharacter(valueDelimiterId: ValueDelimiterId): string {
    return VALUE_DELIMITER_CONFIGS.find(({ id }) => id === valueDelimiterId)?.character ?? valueDelimiterId;
}
