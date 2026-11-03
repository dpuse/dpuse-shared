// ── DPUse Framework
import type { ConnectorConfig } from '@/component/module/connector';
import type { LocaleLabel } from '@/locale/label';
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

export interface ConnectionNodeConfig {
    id: string;
    label: string;
    description: string;
    icon: string | null;
    iconDark: string | null;
    childCount: number | undefined;
    childNodes: ConnectionNodeConfig[];
    // columnsConfigs?: ObjectColumnConfig[];
    extension: string | undefined;
    folderPath: string;
    handle: DPAFileSystemFileHandle | undefined;
    //nodeDisplayHeight?: number;
    lastModifiedAt: number | undefined;
    mimeType: string | undefined;
    name: string;
    size: number | undefined;
    typeId: NodeTypeId;
}

interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

type NodeTypeId = 'folder' | 'object';

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
    frequentValues: Record<string, number> | undefined; // The values seen more than once, most frequent first, with how often. Empty when there are too many to count.
    inferenceCounts: Record<string, number>;
    invalidValueCount: number | undefined; // Values that do not fit the column's type, and so are stored as null.
    invalidValues: Record<string, string>; // A sample of the values that do not fit, each with the type it was read as.
    isFormatAmbiguous: boolean | undefined; // The column's values do not settle 'dateOrderId' or 'decimalSeparatorId', or mix formats that may not belong together, such as two currencies.
    isIgnored: boolean | undefined;
    isRequired: boolean | undefined;
    isUnique: boolean | undefined; // Undefined when there are too many values to tell.
    label: LocaleLabel;
    leadingInferenceCounts: Record<string, number>;
    maxDecimals: number | undefined;
    maxSize: number | undefined;
    maxValue: string | undefined;
    maxWholeDigits: number | undefined;
    minDecimals: number | undefined;
    minSize: number | undefined;
    minValue: string | undefined;
    minWholeDigits: number | undefined;
    missingValueCount: number | undefined; // Nothing between the delimiters, a record too short to reach the column, or a null word such as 'NULL'.
    formats: Record<string, number>; // How many values have each format, e.g. 'yyyy-MM-dd', '9,999.9' or 'Yes/No'.
    paddedValueCount: number | undefined; // Values with spaces before or after them.
    quotedValueCount: number | undefined;
    storageTypeId: StorageTypeId | undefined; // The narrowest type that holds every value that fits the column.
    validValueCount: number | undefined;
    validValues: Record<string, string>; // A sample of the values that fit, each with the type it was read as.
    voidValueCount: number | undefined; // Blank and missing values together.
}

// 'currency' ─ The currency of each number in a column that holds several, such as 'USD' or '€'.
export type ColumnDerivationId = 'currency';

export type DateOrderId = 'dayFirst' | 'monthFirst';

export type DecimalSeparatorId = ',' | '.';

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
