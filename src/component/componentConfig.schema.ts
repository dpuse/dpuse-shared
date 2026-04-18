// External Dependencies
import { nullable, number, object, optional, string } from 'valibot';

// Shared Framework
import { literalUnion } from '@/schema';

const localisedStringSchema = object({ en: string(), es: string() });

const partialLocalisedStringSchema = object({ en: optional(string()), es: optional(string()) });

// Unions

const componentStatusColorIdSchema = literalUnion(['amber', 'green', 'red', 'other'] as const);

const componentStatusIdSchema = literalUnion([
    'alpha',
    'beta',
    'generalAvailability',
    'notApplicable',
    'preAlpha',
    'proposed',
    'releaseCandidate',
    'unavailable',
    'underReview'
] as const);

const componentTypeIdSchema = literalUnion([
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
] as const);

const componentStatusSchema = object({
    id: string(),
    color: componentStatusColorIdSchema,
    label: string()
});

export const componentConfigCoreFields = {
    id: string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    firstCreatedAt: optional(number()),
    icon: nullable(string()),
    iconDark: nullable(string()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusSchema),
    statusId: componentStatusIdSchema
} as const;

export const componentConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: componentTypeIdSchema
});

export const componentReferenceSchema = object({
    id: string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    icon: nullable(string()),
    iconDark: nullable(string()),
    order: number(),
    path: string()
});

// Exposures.
export { componentStatusColorIdSchema, componentStatusIdSchema, componentStatusSchema, componentTypeIdSchema, localisedStringSchema, partialLocalisedStringSchema };
