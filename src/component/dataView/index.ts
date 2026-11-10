// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { ComponentInstanceConfig } from '@/component';
import type { ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connection';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Data View
export interface DataViewConfig extends ComponentInstanceConfig {
    typeId: 'dataView';
    connectionId: string;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    readingConfig: ReadingConfig | undefined;
    sampleConfig: SampleConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined; // Replaced whole by each audit.
    columnChoiceConfigs: ColumnChoiceConfigs | undefined; // Kept across audits, so the user's choices survive a new one.
    storeConnectorId: string | undefined;
}

// ── Reading ─ How an item is read. Detected when the item is first opened, then reused by every audit and load.
export interface ReadingConfig {
    dataFormatId: DataFormatId;
    encodingConfidenceLevel: number | undefined; // From 0 to 1. Undefined when the encoding was assumed, not detected.
    encodingId: string | undefined;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    isDeclared?: boolean | undefined; // The item's source says how it is read, such as a resource file beside it, so the user has nothing to choose.
    parserId: string | undefined; // The config id of the parser tool. Undefined when no tool parsed the item, such as an empty file or a format no tool reads yet.
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
export type RecordDelimiterId = '\n' | '\r' | '\r\n'; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.
export type ValueDelimiterId = (typeof VALUE_DELIMITER_CONFIGS)[number]['id'] | ''; // TODO: We need a special value here (NOT '') for when a user specified delimiter is implemented.

// ── Sample Configuration ─ The start of an item, as text and parsed records. Small enough to hold in memory and save
// with the data view, unlike the whole item an audit reads.
export interface SampleConfig {
    issues: SampleIssue[]; // Problems found while sampling, such as an empty file or parse errors.
    parsedRecords: ParsedRecord[];
    size: number | undefined; // The bytes the text and records came from. Undefined when the item is not read as bytes.
    text: string | undefined;
}

// A problem found while sampling an item. The sample still holds whatever was read, so the item can be shown and read
// again with other settings.
export interface SampleIssue {
    endLineNumber: number | undefined; // Set when the issue spans several lines, such as an unclosed quote that runs on to where the parser stopped.
    fieldNumber: number | undefined; // The value's position in its record, counting from 1.
    id: string; // The parser's own code, such as 'CSV_QUOTE_NOT_CLOSED', or 'empty' for an item with no content.
    lineNumber: number | undefined; // The first line it covers, counting from 1. Undefined when the parser does not say.
    message: string; // The parser's own English text. The app shows its own wording for the ids it knows.
    recordNumber: number | undefined; // Counting from 1, with any header record included.
    severityId: SampleIssueSeverityId;
    value: string | undefined; // The value or character at fault, shortened when long.
}

export type SampleIssueSeverityId = 'error' | 'info' | 'warning'; // Only an error stops the item being read as data.

export type ParsedRecord = { value: string | null; valueWasQuoted: boolean }[];

// ── Content Audit ─ What an audit found in an item. The first audit covers only the preview read when the item is
// opened, and later audits read further from its start. A count is undefined when the audit did not take it, as in the
// first audit, which does not count lines.
export interface ContentAuditConfig {
    asAt: number; // When the audit started, in milliseconds since the epoch.
    byteCount: number; // 0 when the item is not read as bytes.
    columns: ColumnAuditConfig[];
    commentLineCount: number | undefined;
    emptyLineCount: number | undefined;
    invalidFieldLengthCount: number | undefined; // Records with a different number of values from the first record.
    duration: number; // In milliseconds.
    isComplete: boolean; // Whether the audit reached the end of the item.
    lineCount: number | undefined;
    recordCount: number; // Data records only, without the header record.
    sourceWaitDuration: number | undefined; // The part of 'duration' spent waiting for the item's bytes, such as while it downloads. Undefined when the bytes were fetched before the audit started.
}

// ── Column Reading ─ How a column's values are read from an item's text, which a load needs as well as the column
// itself. A database or an API gives typed values, so it has none of these.
export interface ColumnReadingConfig extends ObjectColumnConfig {
    derivedFromColumnIndex?: number | undefined; // For a column the audit adds, such as a number column's units: the column it is worked out from, by position.
    decimalSeparatorId: DecimalSeparatorId | undefined; // How a number such as 1,234 is read in this column. Undefined when it holds no separator.
    dateOrderId: DateOrderId | undefined; // How a date such as 03/04/2024 is read in this column. Undefined when no date in it could be read either way.
    nullWordsAreEmpty?: boolean | undefined; // For a text column: whether null words such as 'NA' or 'NULL' load as no value. They are text unless the user chooses otherwise, because 'NA' can be data.
}

export type DateOrderId = 'dayFirst' | 'monthFirst';

export type DecimalSeparatorId = (typeof DECIMAL_SEPARATOR_IDS)[number];

// ── Column Audit ─ What an audit found in a column's values, with how the column is read.
export interface ColumnAuditConfig extends ColumnReadingConfig {
    // ── Inference ─ Each value read one by one, before the column settles its type.
    inferenceCounts: Record<string, number>;
    leadingInferenceCounts: Record<string, number>;
    isTypeDeclared?: boolean | undefined; // The item's source states the column's type, so it was taken rather than inferred.

    // ── Reading ─ What the values show about how they are read.
    numericReadings?: Partial<Record<DecimalSeparatorId, NumericReadingConfig>> | undefined; // A column's figures for each decimal separator, for a column whose values could be read with either.
    dateReadings?: Partial<Record<DateOrderId, DateReadingConfig>> | undefined; // A column's figures for each date order, for a column whose dates could be read either way.
    formatIssueIds: FormatIssueId[] | undefined; // Why the column's format is unclear. Empty when a number, date or yes/no column is clear. Undefined when the format was not checked.
    nullWordValueCount?: number | undefined; // For a text column: how many of its values are null words, counted as values.

    // ── Counts
    validValueCount: number | undefined;
    invalidValueCount: number | undefined; // Values that do not fit the column's type, and so are stored as null.
    // ── Missing Values ─ Blank, empty and null values together. Each loads as no value.
    blankValueCount: number | undefined; // Values written as an empty quoted value, or as only spaces.
    emptyValueCount: number | undefined; // Nothing between the delimiters, or a record too short to reach the column.
    nullValueCount: number | undefined; // Null words such as 'NULL', and 'NA' and the like where they are read as no value.
    hasMissingValues: boolean | undefined; // Any blank, empty or null value. Invalid values are counted apart.

    // ── Formats
    validFormats: Record<string, number>; // How many values that fit the column's type have each format, e.g. 'yyyy-MM-dd', '9,999.9' or 'Yes/No'.
    validMinSize: number | undefined;
    validMaxSize: number | undefined;
    validMinWholeDigits: number | undefined;
    validMaxWholeDigits: number | undefined;
    validMinDecimals: number | undefined;
    validMaxDecimals: number | undefined;

    // ── Distinct Values
    validDistinctValueCount: number | undefined; // Distinct values that fit the column's type. Undefined when there are too many to count, because counting them all would hold the whole column in memory.
    validSingleValueCount?: number | undefined; // Distinct values that fit the column's type and are seen only once. Undefined when there are too many values to count.
    invalidDistinctValueCount?: number | undefined; // Distinct values that do not fit the column's type. Undefined when there are too many values to count.
    validIsUnique: boolean | undefined; // Undefined when there are too many values to tell.

    // ── Frequent Values
    validFrequentValues: Record<string, number> | undefined; // The most frequent values that fit the column's type, with how often each is seen. A number or date is counted by its value, however it is written. Empty when there are too many to count.
    validLeastFrequentValues?: Record<string, number> | undefined; // The least frequent values that fit the column's type and are not already in 'validFrequentValues', with how often each is seen. Empty when there are too many to count.
    invalidFrequentValues?: Record<string, number> | undefined; // The most frequent values that do not fit the column's type, with how often each is seen. Empty when there are too many to count.
    invalidValues: Record<string, string>; // A sample of the values that do not fit, each with the type it was read as.

    // ── Range
    validLowestValues?: [string, number][] | undefined; // The lowest values that fit the column's type, lowest first, with how often each is seen. Exact however many values there are.
    validHighestValues?: [string, number][] | undefined; // The highest values that fit the column's type, highest first, with how often each is seen. Exact however many values there are.
    validValueBins?: ValueBinConfig[] | undefined; // For a column of numbers, dates or times: how many of its valid values fall in each of up to 20 ranges with round edges, such as tens or months, lowest first. One range that starts and ends at the value when every value is the same.
    validValueBinScaleId?: ValueBinScaleId | undefined; // How 'validValueBins' divides the values. Absent for ranges of equal width.
    validValueBinOutliers?: ValueBinOutlierConfig | undefined; // When a few values lie far beyond the rest, 'validValueBins' covers only about the middle 98% of them, and this counts the values beyond its first and last ranges. Undefined when the ranges cover every value.
}

// ── Declared Columns ─ The columns an item's source states, as a database or an application does, or a schema file
// beside a data file. An audit then takes each column's type rather than inferring it, and only counts the values.
export interface DeclaredColumnConfig {
    name: string; // As the item's header record writes it.
    label: string | undefined; // Shown in place of the name. Undefined to show the name.
    dataTypeId: Exclude<DataTypeId, 'unknown'> | undefined; // Undefined when the source does not say, so the type is inferred.
    dataSubtypeId: DataSubtypeId | undefined; // Undefined to take the type's 'defaultSubtypeId'.
}

// ── Declared Reading ─ How the source says its items are read, so it is not detected and the user has nothing to
// choose. A value left undefined is detected as usual.
export interface DeclaredReadingConfig {
    dataFormatId: DataFormatId;
    encodingId: string | undefined;
    hasHeaders: boolean | undefined;
    valueDelimiterId: ValueDelimiterId | undefined;
}

// What a column of numbers measures when read with one decimal separator. Choosing the other separator swaps these in.
export type NumericReadingConfig = Pick<ColumnAuditConfig, 'dataSubtypeId' | 'validMaxDecimals' | 'validMaxWholeDigits' | 'validMinDecimals' | 'validMinWholeDigits'> &
    ValueDistributionConfig;

// What a column of dates measures when read in one date order. Choosing the other order swaps these in.
export type DateReadingConfig = Pick<ColumnAuditConfig, 'validFormats'> & ValueDistributionConfig;

// How many of each valid value a column holds, and how they spread from lowest to highest. A number or date can read
// differently with each decimal separator or date order, such as '1,5' as 1.5 or 15, so each reading has its own.
export type ValueDistributionConfig = Pick<
    ColumnAuditConfig,
    | 'validDistinctValueCount'
    | 'validFrequentValues'
    | 'validHighestValues'
    | 'validIsUnique'
    | 'validLeastFrequentValues'
    | 'validLowestValues'
    | 'validSingleValueCount'
    | 'validValueBinOutliers'
    | 'validValueBinScaleId'
    | 'validValueBins'
>;

// Why a column's format is unclear. The decimal separator or date order is unproven when no value shows it, weakly
// proven when the values that show it are outnumbered by the values it decides, and mixed when values show both ways.
export type FormatIssueId =
    | 'booleanPairMixed'
    | 'currencyMixed'
    | 'dateOrderMixed'
    | 'dateOrderUnproven'
    | 'decimalSeparatorMixed'
    | 'decimalSeparatorUnproven'
    | 'decimalSeparatorWeaklyProven'
    | 'percentageMixed'
    | 'scientificNotationMixed';

// One range of a column's values, and how many valid values fall in it.
export interface ValueBinConfig {
    count: number;
    lowerValue: string; // Where the range starts: a number, or an ISO date, date-time or time.
    upperValue: string; // Where the range ends, and the next one starts.
}

// 'linear' ─ Ranges of equal width, such as tens or months.
// 'log' ─ One range for each power of ten, or a few together, mirrored for negative numbers, with zero as a range of its
// own. Used when the values span so many powers of ten that ranges of equal width would put nearly all of them in one.
export type ValueBinScaleId = 'linear' | 'log';

// The values beyond a column's ranges, when its ranges leave out a few far from the rest.
export interface ValueBinOutlierConfig {
    aboveCount: number; // Values at or above the end of the last range.
    belowCount: number; // Values below the start of the first range.
    isEstimated: boolean; // The counts, the ranges' own included, are estimated from a sample, because the column held more values than the sample keeps.
}

// ── Column Choices ─ What the user chose for each column, keyed by the column's position as a string. Anything not
// chosen keeps what the audit detected.
export type ColumnChoiceConfigs = Partial<Record<string, ColumnChoiceConfig>>;

// A type chosen without a subtype keeps the detected subtype when it matches the detected type, and otherwise takes the
// type's 'defaultSubtypeId'.
export interface ColumnChoiceConfig {
    dataTypeId: DataTypeId | undefined;
    dataSubtypeId: DataSubtypeId | undefined;
    dateOrderId: DateOrderId | undefined; // For a date column whose values fit more than one order, such as 03/04/2024.
    decimalSeparatorId: DecimalSeparatorId | undefined; // For a number column whose values fit either separator, such as 1,234.
    isIgnored: boolean | undefined; // Whether the column is left out when the data view loads.
    nullWordsAreEmpty: boolean | undefined; // For a text column: whether words such as 'NA' mean no value.
}

// ── Data Types

type DataTypeConfig = (typeof DATA_TYPE_CONFIGS)[number];
export type DataTypeId = DataTypeConfig['id'];
export type DataSubtypeId = DataTypeConfig['subtypeIds'][number];
export type NumericSubtypeId = Extract<DataTypeConfig, { id: 'numeric' }>['subtypeIds'][number];
export type StringSubtypeId = Extract<DataTypeConfig, { id: 'string' }>['subtypeIds'][number];
export type TemporalSubtypeId = Extract<DataTypeConfig, { id: 'temporal' }>['subtypeIds'][number];

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Data Formats ─ What DPUse can do with each format. 'supportId' says whether the format is read as data now, is
// planned, or is not data. 'isText' means it can be shown as text, and 'isTable' as a table of records.
export const DATA_FORMAT_CONFIGS = [
    { id: 'arrow', isTable: false, isText: false, supportId: 'planned' },
    { id: 'avro', isTable: false, isText: false, supportId: 'planned' },
    { id: 'dtv', isTable: true, isText: true, supportId: 'supported' }, // Delimited text, such as CSV or TSV.
    { id: 'json', isTable: false, isText: false, supportId: 'planned' },
    { id: 'jsonl', isTable: false, isText: false, supportId: 'planned' },
    { id: 'markdown', isTable: false, isText: true, supportId: 'unsupported' }, // A document, so it is shown as text but not read as data.
    { id: 'ods', isTable: false, isText: false, supportId: 'planned' },
    { id: 'parquet', isTable: false, isText: false, supportId: 'planned' },
    { id: 'sav', isTable: false, isText: false, supportId: 'planned' },
    { id: 'sqlite', isTable: false, isText: false, supportId: 'planned' },
    { id: 'xlsx', isTable: false, isText: false, supportId: 'planned' },
    { id: 'xml', isTable: false, isText: false, supportId: 'planned' },
    { id: 'unknown', isTable: false, isText: false, supportId: 'unsupported' }
] as const satisfies readonly { id: string; isTable: boolean; isText: boolean; supportId: 'planned' | 'supported' | 'unsupported' }[];

// ── Value Delimiters ─ In the order detection tries them, most common first. The unit and record separators are
// invisible, so their ids name them and 'character' holds the character itself.
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

// ── Data Types ─ In the order the type list shows them. A type stored without a subtype is read as its
// 'defaultSubtypeId'. 'unknown' is only ever detected, so it cannot be chosen.
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

// ── Decimal Separators
export const DECIMAL_SEPARATOR_IDS = [',', '.'] as const;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The '' placeholder has no character, so it comes back unchanged.
export function getValueDelimiterCharacter(valueDelimiterId: ValueDelimiterId): string {
    return VALUE_DELIMITER_CONFIGS.find(({ id }) => id === valueDelimiterId)?.character ?? valueDelimiterId;
}
