// External Dependencies
import { nullable, number, object, string } from 'valibot';

// DPUse (Local) Framework
import { literalUnion } from '@/schema';
import { partialLocaleLabelSchema } from '@/locale/locale.schema';

// Type ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const componentTypeIdSchema = literalUnion([
    'app',
    'connector',
    'connectorConnection',
    'context',
    'contextModelGroup',
    'contextModel',
    'contextModelDimensionGroup',
    'contextModelDimension',
    'contextModelDimensionHierarchy',
    'contextModelEntityGroup',
    'contextModelEntity',
    'contextModelEntityDataItem',
    'contextModelEntityEvent',
    'contextModelEntityPrimaryMeasure',
    'contextModelSecondaryMeasureGroup',
    'contextModelSecondaryMeasure',
    'dataView',
    'dimension',
    'engine',
    'eventQuery',
    'presenter',
    'presenterPresentation',
    'tool'
]);

// Status ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

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

// Reference ───────────────────────────────────────────────────────────────────────────────────────────────────────────

// Common structure for referencing all components.
export const componentReferenceSchema = object({
    id: string(),
    label: partialLocaleLabelSchema,
    description: partialLocaleLabelSchema,
    icon: nullable(string()),
    iconDark: nullable(string()),
    order: number(),
    path: string()
});

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

// Core fields present in all components.
export const componentConfigCoreFields = {
    id: string(),
    label: partialLocaleLabelSchema,
    description: partialLocaleLabelSchema,
    firstCreatedAt: nullable(number()),
    icon: nullable(string()),
    iconDark: nullable(string()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusConfigSchema),
    statusId: nullable(componentStatusIdSchema)
};

export const componentConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: componentTypeIdSchema
});
