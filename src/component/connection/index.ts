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

// What a column of an object is: its name, its type and how its values are read. What an audit finds in its values is
// kept apart, in 'ColumnAuditConfig'.
export interface ObjectColumnConfig {
    // ── Identity
    label: LocaleLabel;
    derivedFromColumnIndex?: number | undefined; // The column a derived column is worked out from, by position.

    // ── Type
    dataTypeId: DataTypeId;
    dataSubtypeId: DataSubtypeId | undefined;
    storageTypeId: StorageTypeId | undefined; // The narrowest type that holds every value that fits the column.

    // ── Reading ─ How values that could be taken more than one way are read.
    decimalSeparatorId: DecimalSeparatorId | undefined; // How a number such as 1,234 is read in this column. Undefined when it holds no separator.
    dateOrderId: DateOrderId | undefined; // How a date such as 03/04/2024 is read in this column. Undefined when no date in it could be read either way.
    nullWordsAreEmpty?: boolean | undefined; // For a text column: whether null words such as 'NA' or 'NULL' load as no value. They are text unless the user chooses otherwise, because 'NA' can be data.
}

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
