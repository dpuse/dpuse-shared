import { InferOutput } from 'valibot';
import { Component } from '../..';
import { ToolConfig } from '../tool';
import { ConnectionDescriptionConfig, ConnectionNodeConfig } from '../../connection';
import { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { ContentAuditConfig, ParsingRecord, PreviewConfig, ValueDelimiterId } from '../../dataView';
import { EngineConnectorActionOptions, EngineUtilities } from '../../../engine';
export { connectorConfigSchema } from './connectorConfig.schema';
export interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(): void;
    auditObjectContent?(options: AuditObjectContentOptions, chunk: (rowCount: number) => void): Promise<AuditObjectContentResult>;
    createObject?(options: CreateObjectOptions): Promise<void>;
    describeConnection?(options: DescribeConnectionOptions): Promise<DescribeConnectionResult>;
    dropObject?(options: DropObjectOptions): Promise<void>;
    findObject?(options: FindObjectOptions): Promise<FindObjectResult>;
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>;
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>;
    previewObject?(options: PreviewObjectOptions): Promise<PreviewConfig>;
    removeRecords?(options: RemoveRecordsOptions): Promise<void>;
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (data: Uint8Array) => void, complete: () => void): Promise<void>;
    retrieveRecords?(options: RetrieveRecordsOptions, chunk: (typeId: RetrievalTypeId, records: Record<string, unknown>[] | ParsingRecord[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>;
}
export type ConnectorConstructor = new (engineUtilities: EngineUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & {
    label: string;
};
export declare const constructConnectorCategoryConfig: (id: string, localeId?: import('../../../locale').LocaleId) => ConnectorCategoryLocalisedConfig;
export type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;
export interface AuditObjectContentOptions1 extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface AuditObjectContentResult1 {
    contentAuditConfig: ContentAuditConfig;
}
export interface AuditObjectContentOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    parsingToolName: string | undefined;
    path: string;
    supportsTransferableStreams: boolean;
    valueDelimiterId: ValueDelimiterId;
}
export interface AuditObjectContentResult {
    processedRowCount: number;
    durationMs: number;
}
export interface CreateObjectOptions extends EngineConnectorActionOptions {
    path: string;
    structure: string;
}
export type DescribeConnectionOptions = EngineConnectorActionOptions;
interface DescribeConnectionResult {
    descriptionConfig: ConnectionDescriptionConfig;
}
export interface DropObjectOptions extends EngineConnectorActionOptions {
    path: string;
}
export interface FindObjectOptions extends EngineConnectorActionOptions {
    storeId: string | undefined;
    nodeId: string;
}
export interface FindObjectResult {
    path: string | undefined;
}
export interface GetReadableStreamOptions extends EngineConnectorActionOptions {
    id: string;
    path: string;
}
export interface GetRecordOptions extends EngineConnectorActionOptions {
    id: string;
    path: string;
}
export interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
export interface ListNodesOptions extends EngineConnectorActionOptions {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
export interface ListNodesResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
export interface PreviewObjectOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    extension: string | undefined;
    path: string;
}
export interface RemoveRecordsOptions extends EngineConnectorActionOptions {
    keys: string[];
    path: string;
}
export interface RetrieveChunksOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
export interface RetrieveRecordsSummary {
    byteCount: number;
    commentLineCount: number;
    emptyLineCount: number;
    lineCount: number;
    nonUniformRecordCount: number;
    recordCount: number;
}
export interface UpsertRecordsOptions extends EngineConnectorActionOptions {
    records: Record<string, unknown>[];
    path: string;
}
export type RetrievalTypeId = 'jsonRecordArray' | 'parsingRecordArray';
export type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
