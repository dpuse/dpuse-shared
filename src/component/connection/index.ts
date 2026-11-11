// ── DPUse Framework
import type { BaseConfig } from '@/index';
import type { ComponentInstanceConfig } from '@/component';
import type { ConnectorConfig } from '@/component/module/connector';
import type { LocaleLabel } from '@/locale/label';
import type { LocalisedConfig } from '@/locale';
import type { DataSubtypeId, DataTypeId } from '@/component/dataView';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Configuration
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

// ── Authorisation
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

// ── Description
export interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}

// ── Node
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

// ── Object Column
// What a column of an object is, as any source can describe it: a file, a database or an API. How a file's text is read
// into it, and what an audit finds in its values, are kept in the data view's 'ColumnReadingConfig' and
// 'ColumnAuditConfig'.
export interface ObjectColumnConfig {
    label: LocaleLabel;
    dataTypeId: DataTypeId;
    dataSubtypeId: DataSubtypeId | undefined;
}
