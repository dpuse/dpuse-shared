/**
 * Defines the configuration metadata for a connector. Used for validation
 * of connector manifests and capability discovery at runtime.
 */

// External Dependencies
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

// Local Framework
import { literalUnion } from '@/schema';
import { localeLabelSchema } from '@/locale';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// Category ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Category identifiers used for grouping and filtering connectors.
const connectorCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore']);

export const connectorCategoryConfigSchema = object({
    label: localeLabelSchema
});

// Implementation ──────────────────────────────────────────────────────────────────────────────────────────────────────

// Authentication method identifiers supported by a connector implementation.
const connectorAuthMethodIdSchema = literalUnion(['apiKey', 'disabled', 'oAuth2', 'none']);

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

// Operation names a connector may support.
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

// Connector data pipeline usage identifiers.
export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown']);

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
