import { ComponentConfig } from '..';
import { ConnectorConfig } from '.';
import { LocaleLabel } from '../../locale';
import { DataSubtypeId, DataTypeId } from '../dataView';
/**
 * Connection configuration.
 */
interface ConnectionConfig extends ComponentConfig {
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}
export type ConnectionLocalisedConfig = Omit<ConnectionConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/**
 * Connection authorisation configuration.
 */
interface ConnectionAuthorisationConfig {
    accessToken: string;
    accountId: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    uid: string;
}
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
/**
 * Connection node configuration.
 */
interface ConnectionNodeConfig {
    childCount: number | undefined;
    childNodes: ConnectionNodeConfig[];
    extension: string | undefined;
    folderPath: string;
    handle: DPAFileSystemFileHandle | undefined;
    id: string;
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
type StorageTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
export type { ConnectionConfig, ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig };
