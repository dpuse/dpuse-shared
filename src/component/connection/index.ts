// External Dependencies
import type { ComponentConfig } from '@/component';
import type { ConnectorConfig } from '@/component/module/connector';
import type { Localised, LocaleLabel } from '@/locale';
import type { DataSubtypeId, DataTypeId } from '@/component/dataView';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}
export type ConnectionLocalisedConfig = Localised<ConnectionConfig>;

// Authorisation ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionAuthorisationConfig {
    accessToken: string; // Dropbox.
    accountId: string; // Dropbox.
    expiresAt: number; // Dropbox.
    expiresIn: number; // Dropbox.
    refreshToken: string; // Dropbox.
    scope: string; // Dropbox.
    tokenType: string; // Dropbox.
    uid: string; // Dropbox.
}

// Description ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}

// Node ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectionNodeConfig {
    childCount: number | undefined;
    childNodes: ConnectionNodeConfig[];
    // columnsConfigs?: ObjectColumnConfig[];
    extension: string | undefined;
    folderPath: string;
    handle: DPAFileSystemFileHandle | undefined;
    id: string;
    //nodeDisplayHeight?: number;
    label: string;
    lastModifiedAt: number | undefined;
    mimeType: string | undefined;
    name: string;
    size: number | undefined;
    typeId: NodeTypeId;
}

export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

export type NodeTypeId = 'folder' | 'object';

// Object Column ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ObjectColumnConfig {
    dataTypeId: DataTypeId;
    dataSubtypeId: DataSubtypeId | undefined;
    inferenceCounts: Record<string, number>;
    invalidValueCount: number | undefined;
    invalidValues: Record<string, string>;
    isIgnored: boolean | undefined;
    isRequired: boolean | undefined;
    isUnique: boolean | undefined;
    label: LocaleLabel;
    leadingInferenceCounts: Record<string, number>;
    maxDecimals: number | undefined;
    maxSize: number | undefined;
    maxValue: string | undefined;
    minDecimals: number | undefined;
    minSize: number | undefined;
    minValue: string | undefined;
    formats: Record<string, string>;
    storageTypeId: StorageTypeId | undefined;
    validValueCount: number | undefined;
    validValues: Record<string, string>;
    voidValueCount: number | undefined;
}

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
