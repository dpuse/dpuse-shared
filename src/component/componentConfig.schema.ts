// ── External Dependencies & Registrations
import { nullable, number, object, string } from 'valibot';

// ── DPUse Framework
import { baseConfigSchema } from '@/baseConfig.schema';
import { literalUnion } from '@/schema';

// ── Schemas - Type Identifier ────────────────────────────────────────────────────────────────────────────────────────

export const componentTypeIdSchema = literalUnion([
    'app',
    'connector',
    'connectorConnection',
    'context',
    'contextArea',
    'contextModel',
    'contextModelDimension',
    'contextModelDimensionHierarchy',
    'contextModelEntity',
    'contextModelEntityDataItem',
    'contextModelEntityEvent',
    'contextModelEntityPrimaryMeasure',
    'contextModelSecondaryMeasure',
    'cookbook',
    'cookbookRecipe',
    'dataView',
    'dimension',
    'engine',
    'eventQuery',
    'presenter',
    'presenterPresentation',
    'tool'
]);

// ── Schemas - Status ─────────────────────────────────────────────────────────────────────────────────────────────────

export const componentStatusColorIdSchema = literalUnion(['amber', 'green', 'red']);

export const componentStatusIdSchema = literalUnion(['alpha', 'beta', 'releaseCandidate', 'generalAvailability']);

export const componentStatusConfigSchema = object({
    color: componentStatusColorIdSchema,
    label: string()
});

// ── Schemas - Base ───────────────────────────────────────────────────────────────────────────────────────────────────

// Common base structure components and component references.
export const componentBaseConfigSchema = {
    ...baseConfigSchema,
    typeId: componentTypeIdSchema
};

// ── Schemas - Reference ──────────────────────────────────────────────────────────────────────────────────────────────

// Common structure for referencing all components.
export const componentReferenceConfigSchema = object({
    ...componentBaseConfigSchema,
    order: number(),
    path: string()
});

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

// Core fields present in all components.
export const componentCoreFieldsConfig = {
    ...componentBaseConfigSchema,
    firstCreatedAt: nullable(number()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusConfigSchema),
    statusId: nullable(componentStatusIdSchema)
};

export const componentInstanceConfigSchema = object({
    ...componentCoreFieldsConfig
});
