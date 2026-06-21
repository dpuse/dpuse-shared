// External Dependencies
import type { InferOutput } from 'valibot';

// DPUse (Local) Framework
import type { Component } from '@/component';
import type { EngineConnectorActionOptions } from '@/engine';
import type { ToolConfig } from '@/component/module/tool';
import type { ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connection';
import type {
    connectorCategoryConfigSchema,
    connectorConfigSchema,
    connectorOperationNameSchema
} from '@/component/module/connector/connectorConfig.schema';
import type { ContentAuditConfig, InferenceRecord, InferenceSummary, ParsingRecord, PreviewConfig, ValueDelimiterId } from '@/component/dataView';
import { createLabelMap, DEFAULT_LOCALE_ID, type LocaleLabel, type LocalisedConfig, resolveLabel } from '@/locale';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { connectorConfigSchema } from '@/component/module/connector/connectorConfig.schema';

// Interface ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectorInterface extends Component {
    abortController: AbortController | undefined;
    readonly config: ConnectorConfig;
    readonly toolConfigs: ToolConfig[];
    abortOperation?(): void; // Abort the active long running operation.
    auditObjectContent?(options: AuditObjectContentOptions, chunk: (rowCount: number) => void): Promise<AuditObjectContentResult>;
    createObject?(options: CreateObjectOptions): Promise<void>; // Create an object for a specified connection.
    describeConnection?(options: DescribeConnectionOptions): Promise<DescribeConnectionResult>; // Describe a specified connection.
    dropObject?(options: DropObjectOptions): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(options: FindObjectOptions): Promise<FindObjectResult>; // Find an object for a specified connection.
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>; // List nodes in a folder for a specified connection.
    previewObject?(options: PreviewObjectOptions): Promise<PreviewConfig>; // Preview an object for a specified connection.
    removeRecords?(options: RemoveRecordsOptions): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveChunks?(options: RetrieveChunksOptions, chunk: (data: Uint8Array) => void, complete: () => void): Promise<void>; // Retrieve all chunks from an object for a specified connection.
    retrieveRecords?(
        options: RetrieveRecordsOptions,
        chunk: (typeId: RetrievalTypeId, records: Record<string, unknown>[] | ParsingRecord[]) => void,
        complete: (result: RetrieveRecordsSummary) => void
    ): Promise<void>; // Retrieve all records from an object for a specified connection.
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>; // Upsert one or more records into an object for a specified connection.
}
export type ConnectorConstructor = new (connectorUtilities: ConnectorUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;

// Category ────────────────────────────────────────────────────────────────────────────────────────────────────────────

type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;

const CONNECTOR_CATEGORY_CONFIGS: { id: string; label: LocaleLabel }[] = [
    { id: 'application', label: { en: 'Application', es: 'Aplicación' } },
    { id: 'curatedDataset', label: { en: 'Curated Dataset', es: 'Conjunto de Datos Curado' } },
    { id: 'database', label: { en: 'Database', es: 'Base de Datos' } },
    { id: 'fileStore', label: { en: 'File Store', es: 'Almacén de Archivos' } }
];

export const constructConnectorCategoryConfig = (id: string, localeId = DEFAULT_LOCALE_ID): LocalisedConfig<ConnectorCategoryConfig> => {
    const connectorCategory = CONNECTOR_CATEGORY_CONFIGS.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const labelMap = createLabelMap(connectorCategory.label);
        const localizedLabel = resolveLabel(labelMap, localeId);
        return { label: localizedLabel ?? connectorCategory.id, description: [] };
    }
    return { label: id, description: [] };
};

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export type ConnectorOperationName = InferOutput<typeof connectorOperationNameSchema>; // Names of the operations a connector may implement.

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
    byteCount: number; // Number of processed bytes.
    commentLineCount: number; // Count the number of lines being fully commented.
    emptyLineCount: number; // Count the number of processed empty lines; work only with the skip_empty_lines option or an error will be thrown if an empty line is found.
    lineCount: number; // Number of lines encountered in the source dataset, start at 1 for the first line.
    nonUniformRecordCount: number; // Number of non uniform records when relax_column_count is true.
    recordCount: number; // Count the number of processed records.
}

export interface UpsertRecordsOptions extends EngineConnectorActionOptions {
    records: Record<string, unknown>[];
    path: string;
}

// Retrieval Type ──────────────────────────────────────────────────────────────────────────────────────────────────────

export type RetrievalTypeId = 'jsonRecordArray' | 'parsingRecordArray';

// Utilities ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ConnectorUtilities {
    hasReadableStreamTransferSupport(): boolean;
    inferValues: (parsedRecord: ParsingRecord, columnConfigs: ObjectColumnConfig[], leadingRecord: boolean) => InferenceRecord;
    inferDataTypes: (parsedRecords: ParsingRecord[]) => InferenceSummary;
}
