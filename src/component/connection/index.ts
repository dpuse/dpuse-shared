// External Dependencies
import type { ComponentConfig } from '@/component';
import type { ConnectorConfig } from '@/component/module/connector';
import type { LocaleLabel } from '@/locale';
import type { DataSubtypeId, DataTypeId } from '@/component/dataView';

/**
 * Connection configuration.
 */
export interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}
export type ConnectionLocalisedConfig = Omit<ConnectionConfig, 'label' | 'description'> & { label: string; description: string };

/**
 * Connection authorisation configuration.
 */
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

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connection description...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Connection description configuration.
 */
interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connection node configuration...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Connection node configuration.
 */
interface ConnectionNodeConfig {
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

/**
 *
 */
interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

/**
 * Connection node type identifier.
 */
type NodeTypeId = 'folder' | 'object';

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Object column configuration...
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Object column configuration.
 */
interface ObjectColumnConfig {
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

type StorageTypeId =
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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exposures.
export type { ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig };
