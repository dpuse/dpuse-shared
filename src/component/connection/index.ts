// ── DPUse Framework
import type { BaseConfig } from '@/index';
import type { ConnectorConfig } from '@/component/module/connector';
import type { LocaleLabel } from '@/locale/label';
import type { LocalisedConfig } from '@/locale';
import type { Component, ComponentInstanceConfig } from '@/component';
import type { DataSubtypeId, DataTypeId } from '@/component/dataView';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type ConnectionInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionConfig extends ComponentInstanceConfig {
    typeId: 'connectorConnection';
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}

// One connection saved in a user's account by signing in to a connector. A connector can have several, one per account
// at the provider, up to its implementation's 'maxConnectionCount'.
export interface AccountConnectionConfig {
    connectorId: string;
    externalAccountId: string | undefined; // The account at the provider, e.g. Dropbox's 'account_id'.
    id: string;
}

// ── Types - Configuration - Authorisation ────────────────────────────────────────────────────────────────────────────

// TODO: Proof of concept for testing, not fully implemented. Tokens must not live in a connection config, which is saved,
// synced and shown in the browser. Keep the refresh token on the server only and never send any token to the browser;
// this should shrink to non-secret details such as the account id and expiry.
interface ConnectionAuthorisationConfig {
    accessToken: string; // Dropbox.
    accountId: string; // Dropbox.
    expiresAt: number; // Dropbox.
    expiresIn: number; // Dropbox.
    refreshToken: string; // Dropbox.
    scope: string; // Dropbox.
    tokenType: string; // Dropbox.
    uid: string; // Dropbox.
}

// ── Types - Configuration - Description ──────────────────────────────────────────────────────────────────────────────

export interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}

// ── Types - Configuration - Node ─────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionNodeConfig extends LocalisedConfig<BaseConfig> {
    childCount: number | undefined; // How many items a folder holds, where the connector can tell. Undefined for an item.
    extension: string | undefined;
    folderPath: string;
    lastModifiedAt: number | undefined;
    mimeType: string | undefined;
    name: string;
    size: number | undefined;
    typeId: 'folder' | 'object';
}

// ── Types - Configuration - Object Column ────────────────────────────────────────────────────────────────────────────

export interface ObjectColumnConfig {
    blankValueCount: number | undefined; // Values written as an empty quoted value, or as only spaces.
    dataTypeId: DataTypeId;
    dataSubtypeId: DataSubtypeId | undefined;
    dateOrderId: DateOrderId | undefined; // How a date such as 03/04/2024 is read in this column. Undefined when no date in it could be read either way.
    decimalSeparatorId: DecimalSeparatorId | undefined; // How a number such as 1,234 is read in this column. Undefined when it holds no separator.
    derivationId?: ColumnDerivationId | undefined; // What a column the item does not hold is worked out from. Undefined for a column of the item.
    derivedFromColumnIndex?: number | undefined; // The column a derived column is worked out from, by position.
    distinctValueCount: number | undefined; // Undefined when there are too many to count, because counting them all would hold the whole column in memory.
    frequentValues: Record<string, number> | undefined; // The most frequent values that fit the column's type, with how often each is seen. A number or date is counted by its value, however it is written. Empty when there are too many to count.
    highestValues?: [string, number][] | undefined; // The highest values that fit the column's type, highest first, with how often each is seen. Exact however many values there are.
    inferenceCounts: Record<string, number>;
    invalidValueCount: number | undefined; // Values that do not fit the column's type, and so are stored as null.
    invalidDistinctValueCount?: number | undefined; // Distinct values that do not fit the column's type. Undefined when there are too many values to count.
    invalidFrequentValues?: Record<string, number> | undefined; // The most frequent values that do not fit the column's type, with how often each is seen. Empty when there are too many to count.
    invalidValues: Record<string, string>; // A sample of the values that do not fit, each with the type it was read as.
    isFormatAmbiguous: boolean | undefined; // The column's values do not settle 'dateOrderId' or 'decimalSeparatorId', or mix formats that may not belong together, such as two currencies.
    isIgnored: boolean | undefined;
    isRequired: boolean | undefined;
    isUnique: boolean | undefined; // Undefined when there are too many values to tell.
    label: LocaleLabel;
    leadingInferenceCounts: Record<string, number>;
    leastFrequentValues?: Record<string, number> | undefined; // The least frequent values that fit the column's type and are not already in 'frequentValues', with how often each is seen. Empty when there are too many to count.
    lowestValues?: [string, number][] | undefined; // The lowest values that fit the column's type, lowest first, with how often each is seen. Exact however many values there are.
    maxDecimals: number | undefined;
    maxSize: number | undefined;
    maxValue: string | undefined;
    maxWholeDigits: number | undefined;
    minDecimals: number | undefined;
    minSize: number | undefined;
    minValue: string | undefined;
    minWholeDigits: number | undefined;
    numericReadings?: Partial<Record<DecimalSeparatorId, NumericReadingConfig>> | undefined; // A column's figures for each decimal separator, for a column whose values could be read with either.
    missingValueCount: number | undefined; // Nothing between the delimiters, a record too short to reach the column, or a null word such as 'NULL'.
    nullWordsAreEmpty?: boolean | undefined; // For a text column: whether null words such as 'NA' or 'NULL' load as no value. They are text unless the user chooses otherwise, because 'NA' can be data.
    nullWordValueCount?: number | undefined; // For a text column: how many of its values are null words, counted as values.
    formats: Record<string, number>; // How many values have each format, e.g. 'yyyy-MM-dd', '9,999.9' or 'Yes/No'.
    paddedValueCount: number | undefined; // Values with spaces before or after them.
    quotedValueCount: number | undefined;
    singleValueCount?: number | undefined; // Distinct values that fit the column's type and are seen only once. Undefined when there are too many values to count.
    storageTypeId: StorageTypeId | undefined; // The narrowest type that holds every value that fits the column.
    validValueCount: number | undefined;
    validValues: Record<string, string>; // A sample of the values that fit, each with the type it was read as.
    valueBins?: ValueBinConfig[] | undefined; // For a column of numbers, dates or times: how many of its valid values fall in each of up to 20 ranges with round edges, such as tens or months, lowest first. One range that starts and ends at the value when every value is the same.
    voidValueCount: number | undefined; // Blank and missing values together.
}

// One range of a column's values, and how many valid values fall in it.
export interface ValueBinConfig {
    count: number;
    lowerValue: string; // Where the range starts: a number, or an ISO date, date-time or time.
    upperValue: string; // Where the range ends, and the next one starts.
}

// 'currency' ─ The currency of each number in a column that holds several, such as 'USD' or '€'. Kept for data views
// saved before 'unit'.
// 'unit' ─ The unit of each number in a column where any has one: its currency, such as 'USD' or '€', or '%'.
export type ColumnDerivationId = 'currency' | 'unit';

// What a column of numbers measures when read with one decimal separator. Choosing the other separator swaps these in.
export type NumericReadingConfig = Pick<
    ObjectColumnConfig,
    'dataSubtypeId' | 'maxDecimals' | 'maxValue' | 'maxWholeDigits' | 'minDecimals' | 'minValue' | 'minWholeDigits' | 'storageTypeId'
>;

export type DateOrderId = 'dayFirst' | 'monthFirst';

export type DecimalSeparatorId = (typeof DECIMAL_SEPARATOR_IDS)[number];

export type StorageTypeId =
    | 'binary'
    | 'boolean'
    | 'byte'
    | 'date'
    | 'dateTime'
    | 'dateTimeOffset'
    | 'decimal'
    | 'double'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'object'
    | 'single'
    | 'string'
    | 'time'
    | 'unknown';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

export const DECIMAL_SEPARATOR_IDS = [',', '.'] as const;
