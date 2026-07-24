import { InferOutput } from 'valibot';
import { Component } from '../..';
import { EngineConnectorActionOptions } from '../engine';
import { ToolConfig } from '../tool';
import { ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig } from '../../connection';
import { connectorActionNameSchema, connectorCategoryConfigSchema, connectorConfigSchema, connectorUsageConfigSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { ContentAuditConfig, InferenceRecord, InferenceSummary, ParsingRecord, PreviewConfig, ValueDelimiterId } from '../../dataView';
import { LocalisedConfig } from '../../../locale';
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
    getInfo?(options: GetInfoOptions): Promise<GetInfoResult>;
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>;
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>;
    previewObject?(options: PreviewObjectOptions): Promise<PreviewConfig>;
    removeRecords?(options: RemoveRecordsOptions): Promise<void>;
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (data: Uint8Array) => void, complete: () => void): Promise<void>;
    retrieveRecords?(options: RetrieveRecordsOptions, chunk: (typeId: RecordRetrievalTypeId, records: Record<string, unknown>[] | ParsingRecord[]) => void, complete: (result: RetrieveRecordsSummary) => void): Promise<void>;
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>;
}
export type ConnectorActionName = InferOutput<typeof connectorActionNameSchema>;
export type ConnectorConstructor = new (connectorUtilities: ConnectorUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;
export interface ConnectorUtilities {
    hasReadableStreamTransferSupport(): boolean;
    inferValues: (parsedRecord: ParsingRecord, columnConfigs: ObjectColumnConfig[], hasLeadingRecord: boolean) => InferenceRecord;
    inferDataTypes: (parsedRecords: ParsingRecord[]) => InferenceSummary;
}
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorUsageConfig = InferOutput<typeof connectorUsageConfigSchema>;
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
export interface GetInfoOptions extends EngineConnectorActionOptions {
    path: string;
}
export interface GetInfoResult {
    info: Record<string, unknown>;
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
export type RecordRetrievalTypeId = 'jsonRecordArray' | 'parsingRecordArray';
export interface UpsertRecordsOptions extends EngineConnectorActionOptions {
    records: Record<string, unknown>[];
    path: string;
}
export declare const CONNECTOR_ACTION_NAME_MAP: Record<ConnectorActionName, string>;
export type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
export declare function determineConnectorUsageId(actionNames: ConnectorActionName[]): ConnectorUsageId;
export declare const constructConnectorCategoryConfig: (id: string, localeId?: import('../../../locale').LocaleId) => LocalisedConfig<ConnectorCategoryConfig>;
export declare const constructConnectorUsageConfig: (id: string, localeId?: import('../../../locale').LocaleId) => LocalisedConfig<ConnectorUsageConfig>;
export declare function getConnectorActionsTable(supported: ConnectorActionName[]): string;
