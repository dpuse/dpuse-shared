/**
 * Defines the configuration metadata for a connector. Used for validation
 * of connector manifests and capability discovery at runtime.
 */

// External Dependencies
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

// DPUse (Local) Framework
import { literalUnion } from '@/schema';
import { localeLabelSchema } from '@/locale/locale.schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// Category ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const connectorCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore']); // Category identifiers used for grouping and filtering connectors.

export const connectorCategoryConfigSchema = object({
    label: localeLabelSchema
});

// Implementation ──────────────────────────────────────────────────────────────────────────────────────────────────────

const connectorAuthMethodIdSchema = literalUnion(['apiKey', 'disabled', 'oAuth2', 'none']); // Authentication method identifiers supported by a connector implementation.

// A connector implementation variant. A single connector may expose multiple implementations differing by auth method, limits, or vendor-specific behavior.
const connectorImplementationSchema = object({
    authMethodId: connectorAuthMethodIdSchema,
    activeConnectionCount: optional(number()),
    canDescribe: optional(boolean()),
    id: optional(string()),
    label: optional(localeLabelSchema),
    maxConnectionCount: nullable(number()),
    params: optional(array(record(string(), string())))
});

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Names of the operations a connector may implement.
export const connectorOperationNameSchema = literalUnion([
    'abortOperation',
    'auditObjectContent',
    'createObject',
    'describeConnection',
    'dropObject',
    'findObject',
    'getReadableStream',
    'getRecord',
    'listNodes',
    'previewObject',
    'removeRecords',
    'retrieveChunks',
    'retrieveRecords',
    'upsertRecords'
]);

// Usage ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown']); // Connector data pipeline usage identifiers.

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export const connectorConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('connector'),
    category: nullable(connectorCategoryConfigSchema),
    categoryId: connectorCategoryIdSchema,
    implementations: record(string(), connectorImplementationSchema),
    operations: array(connectorOperationNameSchema),
    usageId: connectorUsageIdSchema,
    vendorAccountURL: nullable(string()),
    vendorDocumentationURL: nullable(string()),
    vendorHomeURL: nullable(string())
});
