export declare const componentTypeIdSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"app", undefined>, import('valibot').LiteralSchema<"connection", undefined>, import('valibot').LiteralSchema<"connector", undefined>, import('valibot').LiteralSchema<"connectorConnection", undefined>, import('valibot').LiteralSchema<"context", undefined>, import('valibot').LiteralSchema<"contextModelGroup", undefined>, import('valibot').LiteralSchema<"contextModel", undefined>, import('valibot').LiteralSchema<"contextModelDimension", undefined>, import('valibot').LiteralSchema<"contextModelDimensionHierarchy", undefined>, import('valibot').LiteralSchema<"contextModelEntity", undefined>, import('valibot').LiteralSchema<"contextModelEntityDataItem", undefined>, import('valibot').LiteralSchema<"contextModelEntityEvent", undefined>, import('valibot').LiteralSchema<"contextModelEntityPrimaryMeasure", undefined>, import('valibot').LiteralSchema<"contextModelSecondaryMeasure", undefined>, import('valibot').LiteralSchema<"cookbook", undefined>, import('valibot').LiteralSchema<"cookbookRecipe", undefined>, import('valibot').LiteralSchema<"dataView", undefined>, import('valibot').LiteralSchema<"dimension", undefined>, import('valibot').LiteralSchema<"engine", undefined>, import('valibot').LiteralSchema<"eventQuery", undefined>, import('valibot').LiteralSchema<"presenter", undefined>, import('valibot').LiteralSchema<"presenterPresentation", undefined>, import('valibot').LiteralSchema<"tool", undefined>], undefined>;
export declare const componentStatusColorIdSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
export declare const componentStatusIdSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>, import('valibot').LiteralSchema<"notApplicable", undefined>, import('valibot').LiteralSchema<"preAlpha", undefined>, import('valibot').LiteralSchema<"proposed", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"unavailable", undefined>, import('valibot').LiteralSchema<"underReview", undefined>], undefined>;
export declare const componentStatusConfigSchema: import('valibot').ObjectSchema<{
    readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
    readonly label: import('valibot').StringSchema<undefined>;
}, undefined>;
export declare const componentReferenceSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
    }, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconNeutral: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly order: import('valibot').NumberSchema<undefined>;
    readonly path: import('valibot').StringSchema<undefined>;
}, undefined>;
export declare const componentConfigCoreFields: {
    id: import('valibot').StringSchema<undefined>;
    label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
    }, undefined>;
    firstCreatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    iconNeutral: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    statusId: import('valibot').NullableSchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>, import('valibot').LiteralSchema<"notApplicable", undefined>, import('valibot').LiteralSchema<"preAlpha", undefined>, import('valibot').LiteralSchema<"proposed", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"unavailable", undefined>, import('valibot').LiteralSchema<"underReview", undefined>], undefined>, undefined>;
};
export declare const componentConfigSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').StringSchema<undefined>, undefined>, undefined>;
    }, undefined>;
    readonly firstCreatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconNeutral: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').NullableSchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>, import('valibot').LiteralSchema<"notApplicable", undefined>, import('valibot').LiteralSchema<"preAlpha", undefined>, import('valibot').LiteralSchema<"proposed", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"unavailable", undefined>, import('valibot').LiteralSchema<"underReview", undefined>], undefined>, undefined>;
    readonly typeId: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"app", undefined>, import('valibot').LiteralSchema<"connection", undefined>, import('valibot').LiteralSchema<"connector", undefined>, import('valibot').LiteralSchema<"connectorConnection", undefined>, import('valibot').LiteralSchema<"context", undefined>, import('valibot').LiteralSchema<"contextModelGroup", undefined>, import('valibot').LiteralSchema<"contextModel", undefined>, import('valibot').LiteralSchema<"contextModelDimension", undefined>, import('valibot').LiteralSchema<"contextModelDimensionHierarchy", undefined>, import('valibot').LiteralSchema<"contextModelEntity", undefined>, import('valibot').LiteralSchema<"contextModelEntityDataItem", undefined>, import('valibot').LiteralSchema<"contextModelEntityEvent", undefined>, import('valibot').LiteralSchema<"contextModelEntityPrimaryMeasure", undefined>, import('valibot').LiteralSchema<"contextModelSecondaryMeasure", undefined>, import('valibot').LiteralSchema<"cookbook", undefined>, import('valibot').LiteralSchema<"cookbookRecipe", undefined>, import('valibot').LiteralSchema<"dataView", undefined>, import('valibot').LiteralSchema<"dimension", undefined>, import('valibot').LiteralSchema<"engine", undefined>, import('valibot').LiteralSchema<"eventQuery", undefined>, import('valibot').LiteralSchema<"presenter", undefined>, import('valibot').LiteralSchema<"presenterPresentation", undefined>, import('valibot').LiteralSchema<"tool", undefined>], undefined>;
}, undefined>;
