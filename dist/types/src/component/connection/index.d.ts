import { ConnectorConfig } from '../module/connector';
import { LocaleLabel } from '../../locale';
import { ComponentInstanceConfig } from '..';
import { DataSubtypeId, DataTypeId } from '../dataView';
export interface ConnectionConfig extends ComponentInstanceConfig {
    typeId: 'connectorConnection';
    authorisation: Record<string, ConnectionAuthorisationConfig>;
    connectorConfig: ConnectorConfig;
    lastVerifiedAt: number;
    notation: string | undefined;
}
export interface ConnectionAuthorisationConfig {
    accessToken: string;
    accountId: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    uid: string;
}
export interface ConnectionDescriptionConfig {
    objects: {
        id: string;
        label: Record<string, string>;
        columns: ObjectColumnConfig[];
    }[];
}
export interface ConnectionNodeConfig {
    childCount: number | undefined;
    childNodes: ConnectionNodeConfig[];
    extension: string | undefined;
    folderPath: string;
    handle: DPAFileSystemFileHandle | undefined;
    icon?: string | null;
    id: string;
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
export type StorageTypeId = 'binary' | 'boolean' | 'byte' | 'date' | 'dateTime' | 'dateTimeOffset' | 'decimal' | 'double' | 'int8' | 'int16' | 'int32' | 'int64' | 'object' | 'single' | 'string' | 'time' | 'unknown';
