// ── External Dependencies & Registrations
import { nullable, number, object, string } from 'valibot';

// ── DPUse (Local) Framework
import { literalUnion } from '@/schema';
import { partialLocaleDescriptionSchema, partialLocaleLabelSchema } from '@/locale/locale.schema';

// ── Schemas - Type Identifier ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const componentTypeIdSchema = literalUnion([
    'app',
    'connection',
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

export const componentStatusColorIdSchema = literalUnion(['amber', 'green', 'red', 'other']);

export const componentStatusIdSchema = literalUnion([
    'alpha',
    'beta',
    'generalAvailability',
    'notApplicable',
    'preAlpha',
    'proposed',
    'releaseCandidate',
    'unavailable',
    'underReview'
]);

export const componentStatusConfigSchema = object({
    color: componentStatusColorIdSchema,
    label: string()
});

// ── Schemas - Base ───────────────────────────────────────────────────────────────────────────────────────────────────

// Common base structure components and component references.
export const componentBaseSchema = {
    id: string(),
    label: partialLocaleLabelSchema,
    description: partialLocaleDescriptionSchema,
    icon: nullable(string()),
    iconDark: nullable(string())
};

// ── Schemas - Reference ──────────────────────────────────────────────────────────────────────────────────────────────

// Common structure for referencing all components.
export const componentReferenceSchema = object({
    ...componentBaseSchema,
    order: number(),
    path: string()
});

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

// Core fields present in all components.
export const componentConfigCoreFields = {
    ...componentBaseSchema,
    firstCreatedAt: nullable(number()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusConfigSchema),
    statusId: nullable(componentStatusIdSchema)
};

export const componentConfigSchema = object({
    typeId: componentTypeIdSchema,
    ...componentConfigCoreFields
});
