/**
 * Defines the configuration metadata for a connector. Used for validation
 * of connector manifests and capability discovery at runtime.
 */

// ── External Dependencies & Registrations
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

// ── DPUse (Local) Framework
import { literalUnion } from '@/schema';
import { localeLabelSchema } from '@/locale/locale.schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// ── Schemas - Action Name ────────────────────────────────────────────────────────────────────────────────────────────

// Names of the operations a connector may implement.
export const connectorActionNameSchema = literalUnion([
    'abortOperation',
    'auditObjectContent',
    'createObject',
    'describeConnection',
    'dropObject',
    'findObject',
    'getInfo',
    'getReadableStream',
    'getRecord',
    'listNodes',
    'previewObject',
    'removeRecords',
    'retrieveChunks',
    'retrieveRecords',
    'upsertRecords'
]);

// ── Schemas - Category Configuration ─────────────────────────────────────────────────────────────────────────────────

const connectorCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore']); // Category identifiers used for grouping and filtering connectors.

export const connectorCategoryConfigSchema = object({
    label: localeLabelSchema
});

// ── Schemas - Usage ──────────────────────────────────────────────────────────────────────────────────────────────────

export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown']); // Connector data pipeline usage identifiers.

export const connectorUsageConfigSchema = object({
    label: localeLabelSchema
});

// ── Schemas - Implementation ─────────────────────────────────────────────────────────────────────────────────────────

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

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const connectorConfigSchema = object({
    typeId: literal('connector'),
    ...moduleConfigCoreFields,
    actionNames: array(connectorActionNameSchema),
    category: nullable(connectorCategoryConfigSchema),
    categoryId: connectorCategoryIdSchema,
    implementations: record(string(), connectorImplementationSchema),
    usage: nullable(connectorUsageConfigSchema),
    usageId: connectorUsageIdSchema,
    vendorAccountURL: nullable(string()),
    vendorDocumentationURL: nullable(string()),
    vendorHomeURL: nullable(string())
});
