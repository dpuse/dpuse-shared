/**
 * Component schema.
 */

// Vendor dependencies.
import { literal, nullable, number, object, optional, string, union } from 'valibot';
import type { LiteralSchema, UnionSchema } from 'valibot';

/**
 *
 */
type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{ [K in keyof T]: LiteralSchema<T[K], undefined> }, undefined>;

/**
 *
 */
const literalUnion = <const T extends readonly string[]>(values: T): LiteralUnionSchema<T> => union(values.map((value) => literal(value))) as LiteralUnionSchema<T>;

/**
 *
 */
const localisedStringSchema = object({
    en: string(),
    es: string()
});

/**
 *
 */
const partialLocalisedStringSchema = object({
    en: optional(string()),
    es: optional(string())
});

/**
 *
 */
const componentStatusColorIdSchema = literalUnion(['amber', 'green', 'red', 'other'] as const);

/**
 *
 */
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

/**
 *
 */
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

/**
 *
 */
const componentStatusSchema = object({
    id: string(),
    color: componentStatusColorIdSchema,
    label: string()
});

/**
 *
 */
const componentConfigCoreFields = {
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

/**
 *
 */
const componentConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: componentTypeIdSchema
});

/**
 *
 */
const componentReferenceSchema = object({
    id: string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    icon: nullable(string()),
    iconDark: nullable(string()),
    order: number(),
    path: string()
});

// Exposures.
export {
    componentConfigCoreFields,
    componentConfigSchema,
    componentReferenceSchema,
    componentStatusColorIdSchema,
    componentStatusIdSchema,
    componentStatusSchema,
    componentTypeIdSchema,
    literalUnion,
    localisedStringSchema,
    partialLocalisedStringSchema
};
