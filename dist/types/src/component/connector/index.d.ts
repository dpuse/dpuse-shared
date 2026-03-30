import { InferOutput } from 'valibot';
import { Component } from '..';
import { ToolConfig } from '../tool';
import { ConnectionDescriptionConfig, ConnectionNodeConfig } from './connection';
import { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from './connectorConfig.schema';
import { ContentAuditConfig, ParsingRecord, PreviewConfig, ValueDelimiterId } from '../dataView';
import { EngineConnectorActionOptions, EngineUtilities } from '../../engine';
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
export type RetrievalTypeId = 'jsonRecordArray' | 'parsingRecordArray';
export type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;
/**
 * Connector data pipeline usage identifiers.
 */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;
/**
 * Connector configuration.
 */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
/**
 * Audit object content options and result.
 */
interface AuditObjectContentOptions1 extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
/**
 *
 */
interface AuditObjectContentResult1 {
    contentAuditConfig: ContentAuditConfig;
}
/**
 * Audit object content options.
 */
interface AuditObjectContentOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    parsingToolName: string | undefined;
    path: string;
    supportsTransferableStreams: boolean;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Audit object content result.
 */
interface AuditObjectContentResult {
    processedRowCount: number;
    durationMs: number;
}
/**
 * Create object options.
 */
interface CreateObjectOptions extends EngineConnectorActionOptions {
    path: string;
    structure: string;
}
/**
 * Describe connection options and result.
 */
type DescribeConnectionOptions = EngineConnectorActionOptions;
interface DescribeConnectionResult {
    descriptionConfig: ConnectionDescriptionConfig;
}
/**
 * Drop object options.
 */
interface DropObjectOptions extends EngineConnectorActionOptions {
    path: string;
}
/**
 * Find object options and result.
 */
interface FindObjectOptions extends EngineConnectorActionOptions {
    storeId: string | undefined;
    nodeId: string;
}
interface FindObjectResult {
    path: string | undefined;
}
/**
 * Get readable stream options.
 */
interface GetReadableStreamOptions extends EngineConnectorActionOptions {
    id: string;
    path: string;
}
/**
 * Get record options and result.
 */
interface GetRecordOptions extends EngineConnectorActionOptions {
    id: string;
    path: string;
}
interface GetRecordResult {
    record?: string[] | Record<string, unknown>;
}
/**
 * List nodes options and result.
 */
interface ListNodesOptions extends EngineConnectorActionOptions {
    folderPath: string;
    limit?: number;
    offset?: number;
    totalCount?: number;
}
interface ListNodesResult {
    cursor: string | number | undefined;
    connectionNodeConfigs: ConnectionNodeConfig[];
    isMore: boolean;
    totalCount: number;
}
/**
 * Preview object options.
 */
interface PreviewObjectOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    extension: string | undefined;
    path: string;
}
/**
 * Remove records options.
 */
interface RemoveRecordsOptions extends EngineConnectorActionOptions {
    keys: string[];
    path: string;
}
/**
 * Retrieve chunks options.
 */
interface RetrieveChunksOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
/**
 * Retrieve records options and summary.
 */
interface RetrieveRecordsOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    encodingId: string;
    path: string;
    valueDelimiterId: ValueDelimiterId;
}
interface RetrieveRecordsSummary {
    /**
     * Number of processed bytes.
     */
    byteCount: number;
    /**
     * Count the number of lines being fully commented.
     */
    commentLineCount: number;
    /**
     * Count the number of processed empty lines; work only with the skip_empty_lines option or an error will be thrown
     * if an empty line is found.
     */
    emptyLineCount: number;
    /**
     * Number of lines encountered in the source dataset, start at 1 for the first line.
     */
    lineCount: number;
    /**
     * Number of non uniform records when relax_column_count is true.
     */
    nonUniformRecordCount: number;
    /**
     * Count the number of processed records.
     */
    recordCount: number;
}
/**
 * Upsert records options.
 */
interface UpsertRecordsOptions extends EngineConnectorActionOptions {
    records: Record<string, unknown>[];
    path: string;
}
/**
 * Connector category configuration.
 */
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & {
    label: string;
};
/**
 * Construct connector category configuration.
 */
declare const constructConnectorCategoryConfig: (id: string, localeId?: import('../../locale').LocaleCode) => ConnectorCategoryLocalisedConfig;
export { connectorConfigSchema } from './connectorConfig.schema';
export { constructConnectorCategoryConfig };
export type { ConnectionConfig, ConnectionNodeConfig, ObjectColumnConfig } from './connection';
export type { AuditObjectContentOptions1, AuditObjectContentResult1, AuditObjectContentOptions, AuditObjectContentResult, ConnectorConfig, ConnectorLocalisedConfig, ConnectorUsageId, CreateObjectOptions, DropObjectOptions, FindObjectOptions, FindObjectResult, GetReadableStreamOptions, GetRecordOptions, GetRecordResult, ListNodesOptions, ListNodesResult, PreviewObjectOptions, RemoveRecordsOptions, RetrieveChunksOptions, RetrieveRecordsOptions, RetrieveRecordsSummary, UpsertRecordsOptions };
