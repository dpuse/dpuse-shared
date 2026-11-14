// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import type { EncodingDetectionConfig } from '@/encoding';
import type { EngineConnectorActionOptions } from '@/component/module/engine';
import type { LocalisedConfig } from '@/locale';
import type { ToolConfig } from '@/component/module/tool';
import type {
    ColumnAuditConfig,
    ColumnReadingConfig,
    ContentAuditConfig,
    DataFormatId,
    DeclaredColumnConfig,
    ParsedRecord,
    ReadingConfig,
    SampleConfig,
    ValueDelimiterId
} from '@/component/dataView';
import type { ConnectionConfig, ConnectionDescriptionConfig, ConnectionNodeConfig, ObjectColumnConfig } from '@/component/connection';
import type {
    connectorActionNameSchema,
    connectorCategoryConfigSchema,
    connectorConfigSchema,
    connectorItemTypeConfigSchema,
    connectorItemTypeIdSchema,
    connectorUsageConfigSchema,
    connectorUsageIdSchema
} from './connectorConfig.schema';
import { createLabelMap, DEFAULT_LOCALE_ID, type LocaleLabel, resolveLabel } from '@/locale/label';
import type { ListStructureEntriesResult, StructureIndex, StructureLocator, StructurePath } from '@/component/module/tool';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { connectorConfigSchema } from './connectorConfig.schema';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Interface
export interface ConnectorInterface {
    auditObjectContent?(options: AuditObjectContentOptions, chunk: (recordCount: number, byteCount: number) => void): Promise<AuditObjectContentResult>;
    closeStore?(options: CloseStoreOptions): Promise<void>; // Close a store connector's database and release its hold on it, so another tab can open it.
    createObject?(options: CreateObjectOptions): Promise<void>; // Create an object for a specified connection.
    describeConnection?(options: DescribeConnectionOptions): Promise<DescribeConnectionResult>; // Describe a specified connection.
    dropObject?(options: DropObjectOptions): Promise<void>; // Drop (delete) an object for a specified connection.
    findObject?(options: FindObjectOptions): Promise<FindObjectResult>; // Finds an object by its id, wherever it is in the connection.
    getInfo?(options: GetInfoOptions): Promise<GetInfoResult>; // Get metadata/info for a node (at any hierarchy level) for a specified connection.
    getReadableStream?(options: GetReadableStreamOptions): Promise<ReadableStream<Uint8Array>>; // Get a reader that can retrieve all records from an object for a specified connection.
    getRecord?(options: GetRecordOptions): Promise<GetRecordResult>; // Get a record for an object for a specified connection.
    indexObjectStructure?(options: IndexObjectStructureOptions, chunk: (byteCount: number) => void): Promise<StructureIndex>; // Map the structure of a whole nested item, such as JSON, reporting the bytes read as it goes.
    listNodes?(options: ListNodesOptions): Promise<ListNodesResult>; // List nodes in a folder for a specified connection.
    listObjectStructureEntries?(options: ListObjectStructureEntriesOptions): Promise<ListStructureEntriesResult>; // List one page of a part of a nested item, such as JSON.
    loadObjectRecords?(options: LoadObjectRecordsOptions, chunks: AsyncIterable<StoreRecord[]>): Promise<LoadObjectRecordsResult>; // Replace an object in a store connector with the records given.
    openStore?(options: OpenStoreOptions): Promise<OpenStoreResult>; // Open a store connector's database, unless another tab holds it.
    previewObject?(options: PreviewObjectOptions): Promise<PreviewObjectResult>; // Preview an object for a specified connection.
    queryRecords?(options: QueryRecordsOptions): Promise<QueryRecordsResult>; // Query one page of an object in a store connector.
    removeRecords?(options: RemoveRecordsOptions): Promise<void>; // Remove one or more records from an object for a specified connection.
    retrieveRecords?(options: RetrieveRecordsOptions): AsyncGenerator<RetrieveRecordsChunk, RetrieveRecordsSummary, undefined>; // Retrieve all records from an object, a chunk at a time, then return the summary.
    upsertRecords?(options: UpsertRecordsOptions): Promise<void>; // Upsert one or more records into an object for a specified connection.
}

export type ConnectorActionName = InferOutput<typeof connectorActionNameSchema>; // Names of the actions a connector may implement.

export type ConnectorConstructor = new (connectorUtilities: ConnectorUtilities, toolConfigs: ToolConfig[]) => ConnectorInterface;

// 'declaredColumnConfigs' are the columns the item's source states, matched to the item's columns by position. Each
// declared type is taken in place of the one the values suggest.
export interface ConnectorUtilities {
    constructColumnAuditor: (hasHeaders: boolean | undefined, declaredColumnConfigs?: DeclaredColumnConfig[]) => ColumnAuditor;
    hasReadableStreamTransferSupport(): boolean;
    inferDataTypes: (parsedRecords: ParsedRecord[], hasHeaders?: boolean, declaredColumnConfigs?: DeclaredColumnConfig[]) => InferenceSummary;
}

// Audits a whole object's columns one chunk of records at a time, so the object never has to be held in memory.
export interface ColumnAuditor {
    auditRecords: (parsedRecords: ParsedRecord[]) => void;
    completeAudit: () => InferenceSummary;
}

// The columns detected from a set of records, from a sample held in memory or from an audit.
export interface InferenceSummary {
    columnConfigs: ColumnAuditConfig[];
    hasHeaders: boolean; // Whether the first record is a header, detected unless the caller said.
}

// ── Configuration
export type ConnectorConfig = InferOutput<typeof connectorConfigSchema>;

type ConnectorCategoryConfig = InferOutput<typeof connectorCategoryConfigSchema>;

type ConnectorItemTypeConfig = InferOutput<typeof connectorItemTypeConfigSchema>;

export type ConnectorItemTypeId = InferOutput<typeof connectorItemTypeIdSchema>;

type ConnectorUsageConfig = InferOutput<typeof connectorUsageConfigSchema>;

// ── Audit Object Content
export interface AuditObjectContentOptions extends EngineConnectorActionOptions {
    byteLimit: number | undefined; // Stops at the first record to end after this many bytes. Reads the whole item when undefined.
    chunkSize: number | undefined;
    dataFormatId: DataFormatId; // From the preview.
    encodingId: string | undefined; // Only a file has one.
    hasHeaders: boolean | undefined; // From the preview. A header record names the columns and is not audited as data. Undefined when it was detected as absent, so the audit checks again with more records.
    parserId: string | undefined; // From the preview. The tool that read it, so the audit reads the item the same way.
    path: string;
    stopSignal: AbortSignal | undefined; // Stops at the end of the next record and keeps the result, unlike an abort. The engine adds it, because a signal cannot cross into the worker.
    structurePath?: StructurePath | undefined; // From the preview. The part of a nested item read as the table.
    supportsTransferableStreams: boolean;
    valueDelimiterId: ValueDelimiterId | undefined; // Only a file has one.
}
export interface AuditObjectContentResult {
    contentAuditConfig: ContentAuditConfig;
    hasHeaders: boolean; // Whether the first record is a header. An audit can find one the sample missed, because it reads more records. It belongs to the reading configuration, not the audit.
}

// ── Close Store
export type CloseStoreOptions = EngineConnectorActionOptions;

// ── Create Object
// Columns are named by their position, because an audited column has a label but no id.
export interface CreateObjectOptions extends EngineConnectorActionOptions {
    columnConfigs: ObjectColumnConfig[]; // The object's columns, in order.
    indexedColumnIndexes: number[]; // Columns to index, so finding and sorting records by them is quick.
    keyColumnIndex: number | undefined; // The column whose value identifies each record. When undefined, records are numbered as they are added.
    path: string;
}

// ── Describe Connection
export type DescribeConnectionOptions = EngineConnectorActionOptions;

interface DescribeConnectionResult {
    descriptionConfig: ConnectionDescriptionConfig;
}

// ── Drop Object
export interface DropObjectOptions extends EngineConnectorActionOptions {
    path: string;
}

// ── Find Object
export interface FindObjectOptions extends EngineConnectorActionOptions {
    id: string; // The object's id, as 'listNodes' gives it.
}
export interface FindObjectResult {
    path: string | undefined; // The object's path, as the other actions take it.
}

// ── Get Info
export interface GetInfoOptions extends EngineConnectorActionOptions {
    path: string;
}
export interface GetInfoResult {
    info: Record<string, unknown>; // Raw, connector-specific metadata — not yet normalized to a common shape.
}

// ── Get Readable Stream
export interface GetReadableStreamOptions extends EngineConnectorActionOptions {
    path: string;
}

// ── Get Record
export interface GetRecordOptions extends EngineConnectorActionOptions {
    id: RecordKey;
    path: string;
}

// Identifies a record within its object. Records numbered as they were added have a number.
export type RecordKey = number | string;
export interface GetRecordResult {
    record: StoreRecord;
}

// ── Index Object Structure
export interface IndexObjectStructureOptions extends EngineConnectorActionOptions {
    dataFormatId: DataFormatId; // From the preview.
    encodingId: string | undefined; // From the preview.
    parserId: string | undefined; // From the preview. The tool that read it, so the structure is read the same way.
    path: string;
}

// ── List Nodes
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

// ── List Object Structure Entries
export interface ListObjectStructureEntriesOptions extends EngineConnectorActionOptions {
    dataFormatId: DataFormatId; // From the preview.
    entryCount: number; // The most entries to list.
    locator: StructureLocator; // From the parser: the node's own, a checkpoint's, or the next page's. The connector reads only the bytes it names.
    maxValueLength: number | undefined; // Longer text values are cut short. The parser's own default when undefined.
    parserId: string | undefined; // From the preview. The tool that read it, so the structure is read the same way.
    path: string;
    structurePath: StructurePath; // The node being listed.
}

// ── Load Object Records
export interface LoadObjectRecordsOptions extends EngineConnectorActionOptions {
    columnConfigs: ObjectColumnConfig[]; // The data view's columns, each with the type to load it as. The store creates the object's columns from these, in this order.
    path: string;
}
export interface LoadObjectRecordsResult {
    recordCount: number;
}

// The engine's load reads the records from the source connection and passes them to the store connection, so they
// never travel through the app.
export interface EngineLoadObjectRecordsOptions extends LoadObjectRecordsOptions {
    columnConfigs: ColumnReadingConfig[]; // As 'LoadObjectRecordsOptions' has them, with how each is read from the item's text. The store gets only the column itself.
    hasHeaders: boolean; // From the preview. A header record names the columns and is not loaded.
    ignoredColumnIndexes: number[]; // The columns the user chose to ignore, by position. The store gets no column for them.
    headerValues: (string | null)[] | undefined; // The preview's header record as it was read. A different header record means the columns have moved, so nothing is loaded.
    sourceConnectionConfig: ConnectionConfig | LocalisedConfig<ConnectionConfig>; // The app passes the localised one it holds.
    sourceOptions: RetrieveRecordsOptions; // Read the item the same way the audit did.
}

export interface EngineLoadObjectRecordsResult extends LoadObjectRecordsResult {
    columnsHaveChanged: boolean; // The item's header record no longer matches 'headerValues'. Nothing was loaded, and any earlier load is kept.
    invalidValueCounts: number[]; // Per column, in the order of 'columnConfigs', the values that did not fit its type and so loaded as null.
}

// A record's values in the order of the data view's columns. A value that is void, or does not fit its column's type, is
// null.
export type StoreRecord = StoreValue[];
export type StoreValue = bigint | boolean | Date | number | string | null;

// ── Open Store
export interface OpenStoreOptions extends EngineConnectorActionOptions {
    takeOver?: boolean; // Opens the store even when another tab holds it. That tab closes its store when it hears.
}
export interface OpenStoreResult {
    storeStateId: StoreStateId;
}

// 'heldElsewhere' means another tab has the store open, as only one tab can open a database saved in the browser. Opening
// with 'takeOver' takes it from that tab.
// 'unavailable' means the browser gives no storage to keep it in, e.g. in some private windows.
export type StoreStateId = 'heldElsewhere' | 'ready' | 'unavailable';

// ── Preview Object
export interface PreviewObjectOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    dataFormatId: DataFormatId | undefined; // A format the user chose, read in place of the one detected.
    encodingId: string | undefined; // An encoding the user chose, decoded in place of the one detected.
    extension: string | undefined;
    mimeType: string | undefined; // The type the connection's listing gave the item, if any.
    parserId: string | undefined; // A tool the user chose to read the item, used in place of the first that reads its format.
    path: string;
    structurePath?: StructurePath | undefined; // The part of a nested item the user chose to read as the table, used in place of the one suggested.
    valueDelimiterId: ValueDelimiterId | undefined; // A value delimiter the user chose, used in place of the one detected.
}
export interface PreviewObjectResult {
    contentAuditConfig: ContentAuditConfig;
    sampleConfig: SampleConfig;
    readingConfig: ReadingConfig;
    encodingCandidates?: EncodingDetectionConfig[] | undefined; // For choosing another encoding. Not part of the reading, so not saved with the data view.
    structureIndex?: StructureIndex | undefined; // The structure of a nested item, as far as the preview read, for choosing the part read as the table. Not saved with the data view.
}

// ── Query Records
// Columns are named by their position in the audit's columns, because an audited column has a label but no id. With
// 'groupColumnIndexes', each result record holds the group's values, then one value for each aggregate.
export interface QueryRecordsOptions extends EngineConnectorActionOptions {
    aggregates: QueryAggregate[]; // Only read with 'groupColumnIndexes'.
    columnConfigs: ObjectColumnConfig[]; // The columns the object was loaded with, in its order, so the store reads each value back as its type.
    filters: QueryFilter[]; // A record must pass them all.
    groupColumnIndexes: number[]; // No grouping when empty.
    limit: number;
    offset: number;
    path: string;
    sorts: QuerySort[]; // Applied in order.
}
export interface QueryAggregate {
    columnIndex: number | undefined; // Not given for 'count', which counts records.
    functionId: QueryAggregateFunctionId;
}
export type QueryAggregateFunctionId = 'average' | 'count' | 'countDistinct' | 'maximum' | 'minimum' | 'sum';
export interface QueryFilter {
    columnIndex: number;
    operatorId: QueryFilterOperatorId;
    value: StoreValue; // Not read by 'isEmpty' and 'isNotEmpty'.
}
export type QueryFilterOperatorId =
    'contains' | 'endsWith' | 'equals' | 'greaterThan' | 'greaterThanOrEquals' | 'isEmpty' | 'isNotEmpty' | 'lessThan' | 'lessThanOrEquals' | 'notEquals' | 'startsWith';
export interface QuerySort {
    columnIndex: number; // A position in the result record, which differs from the audit's columns when grouped.
    directionId: 'ascending' | 'descending';
}
export interface QueryRecordsResult {
    records: StoreRecord[];
    totalCount: number; // How many records, or groups, pass the filters in all, so a table can size itself.
}

// ── Recount Preview Columns
// Counts a preview's columns again when the user says whether its first record is a header, so the item is not read again.
export interface RecountPreviewColumnsOptions extends EngineConnectorActionOptions {
    hasHeaders: boolean;
    parsedRecords: ParsedRecord[];
}

// Says what each value of the records shown is, so the table can mark the ones that do not fit their column.
export interface ClassifyPreviewValuesOptions extends EngineConnectorActionOptions {
    columnConfigs: ColumnReadingConfig[]; // Each column as the user wants it read.
    parsedRecords: ParsedRecord[]; // Data records only, with no header record.
}

export type PreviewValueStateId = 'blank' | 'empty' | 'invalid' | 'null' | 'valid';

// ── Remove Records
export interface RemoveRecordsOptions extends EngineConnectorActionOptions {
    keys: RecordKey[]; // Every record is removed when empty.
    path: string;
}

// ── Retrieve Records
export interface RetrieveRecordsOptions extends EngineConnectorActionOptions {
    chunkSize: number | undefined;
    dataFormatId: DataFormatId; // From the preview.
    encodingId: string | undefined; // Only a file has one.
    parserId: string | undefined; // From the preview. The tool that read it, so the records are read the same way.
    path: string;
    structurePath?: StructurePath | undefined; // From the preview. The part of a nested item read as the table.
    valueDelimiterId: ValueDelimiterId | undefined; // Only a file has one.
}
// What every connector can say about a retrieval. A parser's counts of lines and bytes are in 'ParseStreamSummary'.
export interface RetrieveRecordsSummary {
    recordCount: number; // Records retrieved.
}

export type RecordRetrievalTypeId = 'parsingRecordArray' | 'storeRecordArray';

// One chunk of retrieved records. Nothing more is read until the next chunk is asked for, so a slow receiver, such as a
// store being written to, holds the read back. A connector that reads text hands over its records still as text, to be
// typed by the columns the user chooses. A connector that holds typed values hands them over typed.
export type RetrieveRecordsChunk = ParsedRecordsChunk | { records: StoreRecord[]; typeId: 'storeRecordArray' };
export interface ParsedRecordsChunk {
    records: ParsedRecord[];
    typeId: 'parsingRecordArray';
}

// ── Upsert Records
export interface UpsertRecordsOptions extends EngineConnectorActionOptions {
    records: StoreRecord[];
    path: string;
}

// ── Usage
export type ConnectorUsageId = InferOutput<typeof connectorUsageIdSchema>;

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const CONNECTOR_CATEGORY_CONFIGS: { id: string; label: LocaleLabel }[] = [
    { id: 'application', label: { en: 'Application', es: 'Aplicación' } },
    { id: 'curatedDataset', label: { en: 'Curated Dataset', es: 'Conjunto de Datos Curado' } },
    { id: 'database', label: { en: 'Database', es: 'Base de Datos' } },
    { id: 'fileStore', label: { en: 'File Store', es: 'Almacén de Archivos' } }
];

const CONNECTOR_ITEM_TYPE_CONFIGS: { id: string; label: LocaleLabel }[] = [
    { id: 'apiEndpoint', label: { en: 'API Endpoint', es: 'Endpoint de API' } },
    { id: 'file', label: { en: 'File', es: 'Archivo' } },
    { id: 'table', label: { en: 'Table', es: 'Tabla' } }
];

const CONNECTOR_ACTION_NAME_MAP: Record<ConnectorActionName, string> = {
    auditObjectContent: 'Audit Object Content',
    closeStore: 'Close Store',
    createObject: 'Create Object',
    describeConnection: 'Describe Connection',
    dropObject: 'Drop Object',
    findObject: 'Find Object',
    getInfo: 'Get Info',
    getReadableStream: 'Get Readable Stream',
    getRecord: 'Get Record',
    indexObjectStructure: 'Index Object Structure',
    listNodes: 'List Nodes',
    listObjectStructureEntries: 'List Object Structure Entries',
    loadObjectRecords: 'Load Object Records',
    openStore: 'Open Store',
    previewObject: 'Preview Object',
    queryRecords: 'Query Records',
    removeRecords: 'Remove Records',
    retrieveRecords: 'Retrieve Records',
    upsertRecords: 'Upsert Records'
};

const CONNECTOR_USAGE_CONFIGS: { id: string; label: LocaleLabel }[] = [
    { id: 'bidirectional', label: { en: 'Bidirectional', es: 'Bidireccional' } },
    { id: 'destination', label: { en: 'Destination', es: 'Destino' } },
    { id: 'source', label: { en: 'Source', es: 'Origen' } },
    { id: 'unknown', label: { en: 'Unknown', es: 'Desconocido' } }
];

const CONNECTOR_DESTINATION_OPERATIONS = new Set<ConnectorActionName>(['createObject', 'dropObject', 'loadObjectRecords', 'removeRecords', 'upsertRecords']);
const CONNECTOR_SOURCE_OPERATIONS = new Set<ConnectorActionName>([
    'auditObjectContent',
    'findObject',
    'getInfo',
    'getReadableStream',
    'getRecord',
    'indexObjectStructure',
    'listNodes',
    'listObjectStructureEntries',
    'previewObject',
    'queryRecords',
    'retrieveRecords'
]);

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Object Parsing
export { auditObjectContentWithParser, buildPreviewObjectResult, indexObjectStructureWithParser } from './objectParsing';
export { listObjectStructureEntriesWithParser, retrieveRecordsWithParser } from './objectParsing';

// ── Store Errors
export { constructStoreError, findStoreErrorId, type StoreErrorId } from './storeErrors';

// ── Store Paths
export { resolveStorePath } from './storePath';

// ── Store Values
export { convertStoreRecordToParsedRecord, convertStoreValueToText } from './storeValues';

// ── Web Locks
export { type AcquireWebLockOptions, acquireWebLock } from './webLock';

// ── Table Schema
export { readTableSchema } from './tableSchema';

// Determines whether a connector is a source, destination, or bidirectional connector, based on the actions it implements.
export function determineConnectorUsageId(actionNames: ConnectorActionName[]): ConnectorUsageId {
    let isSourceOperation = false;
    let isDestinationOperation = false;
    for (const actionName of actionNames) {
        if (CONNECTOR_SOURCE_OPERATIONS.has(actionName)) isSourceOperation = true;
        if (CONNECTOR_DESTINATION_OPERATIONS.has(actionName)) isDestinationOperation = true;
    }
    if (isSourceOperation && isDestinationOperation) return 'bidirectional';
    if (isSourceOperation) return 'source';
    return isDestinationOperation ? 'destination' : 'unknown'; // Neither reads nor writes data, e.g. only 'describeConnection'.
}

export const constructConnectorCategoryConfig = (id: string, localeId = DEFAULT_LOCALE_ID): LocalisedConfig<ConnectorCategoryConfig> => {
    const connectorCategory = CONNECTOR_CATEGORY_CONFIGS.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const labelMap = createLabelMap(connectorCategory.label);
        const localizedLabel = resolveLabel(labelMap, localeId);
        return { label: localizedLabel ?? connectorCategory.id, description: '' };
    }
    return { label: id, description: '' };
};

export const constructConnectorItemTypeConfig = (id: string, localeId = DEFAULT_LOCALE_ID): LocalisedConfig<ConnectorItemTypeConfig> => {
    const connectorItemType = CONNECTOR_ITEM_TYPE_CONFIGS.find((connectorItemType) => connectorItemType.id === id);
    if (connectorItemType) {
        const labelMap = createLabelMap(connectorItemType.label);
        const localizedLabel = resolveLabel(labelMap, localeId);
        return { label: localizedLabel ?? connectorItemType.id, description: '' };
    }
    return { label: id, description: '' };
};

export const constructConnectorUsageConfig = (id: string, localeId = DEFAULT_LOCALE_ID): LocalisedConfig<ConnectorUsageConfig> => {
    const connectorUsage = CONNECTOR_USAGE_CONFIGS.find((connectorUsage) => connectorUsage.id === id);
    if (connectorUsage) {
        const labelMap = createLabelMap(connectorUsage.label);
        const localizedLabel = resolveLabel(labelMap, localeId);
        return { label: localizedLabel ?? connectorUsage.id, description: '' };
    }
    return { label: id, description: '' };
};

export function getConnectorActionsTable(supported: ConnectorActionName[]): string {
    const supportedSet = new Set(supported);
    let md = '|Action|Supported|\n';
    md += '|:----|:-------:|\n';
    for (const id of Object.keys(CONNECTOR_ACTION_NAME_MAP) as ConnectorActionName[]) {
        md += `| ${CONNECTOR_ACTION_NAME_MAP[id]} | ${supportedSet.has(id) ? '✓' : ''} |\n`;
    }
    return md;
}
