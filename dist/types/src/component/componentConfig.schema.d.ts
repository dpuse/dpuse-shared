import { LiteralSchema, UnionSchema } from 'valibot';
/**
 *
 */
type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{
    [K in keyof T]: LiteralSchema<T[K], undefined>;
}, undefined>;
/**
 *
 */
declare const literalUnion: <const T extends readonly string[]>(values: T) => LiteralUnionSchema<T>;
/**
 *
 */
declare const localisedStringSchema: import('valibot').ObjectSchema<{
    readonly en: import('valibot').StringSchema<undefined>;
    readonly es: import('valibot').StringSchema<undefined>;
}, undefined>;
/**
 *
 */
declare const partialLocalisedStringSchema: import('valibot').ObjectSchema<{
    readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
}, undefined>;
/**
 *
 */
declare const componentStatusColorIdSchema: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
/**
 *
 */
declare const componentStatusIdSchema: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
/**
 *
 */
declare const componentTypeIdSchema: LiteralUnionSchema<readonly ["app", "connector", "connectorConnection", "context", "contextModelGroup", "contextModel", "contextModelDimensionGroup", "contextModelDimension", "contextModelDimensionHierarchy", "contextModelEntityGroup", "contextModelEntity", "contextModelEntityDataItem", "contextModelEntityEvent", "contextModelEntityPrimaryMeasure", "contextModelSecondaryMeasureGroup", "contextModelSecondaryMeasure", "dataView", "dimension", "engine", "eventQuery", "presenter", "presenterPresentation", "tool"]>;
/**
 *
 */
declare const componentStatusSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
    readonly label: import('valibot').StringSchema<undefined>;
}, undefined>;
/**
 *
 */
declare const componentConfigCoreFields: {
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly firstCreatedAt: import('valibot').OptionalSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly id: import('valibot').StringSchema<undefined>;
        readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
};
/**
 *
 */
declare const componentConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: LiteralUnionSchema<readonly ["app", "connector", "connectorConnection", "context", "contextModelGroup", "contextModel", "contextModelDimensionGroup", "contextModelDimension", "contextModelDimensionHierarchy", "contextModelEntityGroup", "contextModelEntity", "contextModelEntityDataItem", "contextModelEntityEvent", "contextModelEntityPrimaryMeasure", "contextModelSecondaryMeasureGroup", "contextModelSecondaryMeasure", "dataView", "dimension", "engine", "eventQuery", "presenter", "presenterPresentation", "tool"]>;
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly firstCreatedAt: import('valibot').OptionalSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly id: import('valibot').StringSchema<undefined>;
        readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
}, undefined>;
/**
 *
 */
declare const componentReferenceSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly order: import('valibot').NumberSchema<undefined>;
    readonly path: import('valibot').StringSchema<undefined>;
}, undefined>;
export { componentConfigCoreFields, componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusIdSchema, componentStatusSchema, componentTypeIdSchema, literalUnion, localisedStringSchema, partialLocalisedStringSchema };
