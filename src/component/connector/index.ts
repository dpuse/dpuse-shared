// External dependencies
import type { InferOutput } from 'valibot';

// DPU framework
import type { Component } from '@/component';
import type { ToolConfig } from '@/component/tool';
import type { ConnectionDescriptionConfig, ConnectionNodeConfig } from '@/component/connector/connection';
import type { connectorCategoryConfigSchema, connectorConfigSchema, connectorOperationNameSchema, connectorUsageIdSchema } from '@/component/connector/connectorConfig.schema';
import type { ContentAuditConfig, ParsingRecord, PreviewConfig, ValueDelimiterId } from '@/component/dataView';
import { createLabelMap, DEFAULT_LOCALE_CODE, resolveLabel } from '@/locale';
import type { EngineConnectorActionOptions, EngineUtilities } from '@/engine';

// Connector interface
export interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly toolConfigs: ToolConfig[];
    // Abort the active long running operation
    abortOperation?(): void;
    //
    auditObjectContent?(options: AuditObjectContentOptions, chunk: (rowCount: number) => void): Promise<AuditObjectContentResult>;
    // Create an object for a specified connection
    createObject?(options: CreateObjectOptions): Promise<void>;
    // Describe a specified connection
    describeConnection?(options: DescribeConnectionOptions): Promise<DescribeConnectionResult>;
    // Drop (delete) an object for a specified connection
    dropObject?(options: DropObjectOptions): Promise<void>;
    // Find an object for a specified connection
    findObject?(options: FindObjectOptions): Promise<FindObjectResult>;
    // Get a reader that can retrieve all records from an object for a specified connection
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>;
    // Get a record for an object for a specified connection
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>;
    // List nodes in a folder for a specified connection
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>;
    // Preview an object for a specified connection
    previewObject?(options: PreviewObjectOptions): Promise<PreviewConfig>;
    // Remove one or more records from an object for a specified connection
    removeRecords?(options: RemoveRecordsOptions): Promise<void>;
    // Retrieve all chunks from an object for a specified connection
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (data: Uint8Array) => void, complete: () => void): Promise<void>;
    // Retrieve all records from an object for a specified connection
    retrieveRecords?(
        options: RetrieveRecordsOptions,
        chunk: (typeId: RetrievalTypeId, records: Record<string, unknown>[] | ParsingRecord[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>;
    // Upsert one or more records into an object for a specified connection
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>;
}

export type ConnectorConstructor = new (engineUtilities: EngineUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;

export type RetrievalTypeId = 'jsonRecordArray' | 'parsingRecordArray';

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connector operation type declarations.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Operation names a connector may support
export type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>;

/**
 * Connector data pipeline usage identifiers.
 */
type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

/**
 * Connector configuration.
 */
type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;
type ConnectorLocalisedConfig = Omit<ConnectorConfig, 'label' | 'description'> & { label: string; description: string };

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

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//#region Connector category constants, type declarations and runtime utilities.
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Connector category configuration.
 */
type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;
type ConnectorCategoryLocalisedConfig = Omit<ConnectorCategoryConfig, 'label'> & { label: string };

/**
 * Connector categories configuration.
 */
const CONNECTOR_CATEGORY_CONFIGS: ConnectorCategoryConfig[] = [
    { id: 'application', label: { en: 'Application' } },
    { id: 'curatedDataset', label: { en: 'Curated Dataset' } },
    { id: 'database', label: { en: 'Database' } },
    { id: 'fileStore', label: { en: 'File Store' } }
];

/**
 * Construct connector category configuration.
 */
const constructConnectorCategoryConfig = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategoryLocalisedConfig => {
    const connectorCategory = CONNECTOR_CATEGORY_CONFIGS.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const labelMap = createLabelMap(connectorCategory.label as Record<string, string>);
        const localizedLabel = resolveLabel(labelMap, localeId);
        return { id: connectorCategory.id, label: localizedLabel ?? connectorCategory.id };
    }
    return { id, label: id };
};

//#endregion ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Exposures.
export { connectorConfigSchema } from '@/component/connector/connectorConfig.schema';
export { constructConnectorCategoryConfig };
export type { ConnectionConfig, ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connector/connection';
export type {
    AuditObjectContentOptions1,
    AuditObjectContentResult1,
    AuditObjectContentOptions,
    AuditObjectContentResult,
    ConnectorConfig,
    ConnectorLocalisedConfig,
    ConnectorUsageId,
    CreateObjectOptions,
    DropObjectOptions,
    FindObjectOptions,
    FindObjectResult,
    GetReadableStreamOptions,
    GetRecordOptions,
    GetRecordResult,
    ListNodesOptions,
    ListNodesResult,
    PreviewObjectOptions,
    RemoveRecordsOptions,
    RetrieveChunksOptions,
    RetrieveRecordsOptions,
    RetrieveRecordsSummary,
    UpsertRecordsOptions
};
