export declare const presenterActionNameSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"list", undefined>, import('valibot').LiteralSchema<"render", undefined>, import('valibot').LiteralSchema<"setColorMode", undefined>], undefined>;
export declare const presenterConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: import('valibot').LiteralSchema<"presenter", undefined>;
    readonly actionNames: import('valibot').ArraySchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"list", undefined>, import('valibot').LiteralSchema<"render", undefined>, import('valibot').LiteralSchema<"setColorMode", undefined>], undefined>, undefined>;
    readonly presentations: import('valibot').ArraySchema<import('valibot').ObjectSchema<{
        readonly order: import('valibot').NumberSchema<undefined>;
        readonly path: import('valibot').StringSchema<undefined>;
        readonly typeId: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"app", undefined>, import('valibot').LiteralSchema<"connector", undefined>, import('valibot').LiteralSchema<"connectorConnection", undefined>, import('valibot').LiteralSchema<"context", undefined>, import('valibot').LiteralSchema<"contextArea", undefined>, import('valibot').LiteralSchema<"contextModel", undefined>, import('valibot').LiteralSchema<"contextModelDimension", undefined>, import('valibot').LiteralSchema<"contextModelDimensionHierarchy", undefined>, import('valibot').LiteralSchema<"contextModelEntity", undefined>, import('valibot').LiteralSchema<"contextModelEntityDataItem", undefined>, import('valibot').LiteralSchema<"contextModelEntityEvent", undefined>, import('valibot').LiteralSchema<"contextModelEntityPrimaryMeasure", undefined>, import('valibot').LiteralSchema<"contextModelSecondaryMeasure", undefined>, import('valibot').LiteralSchema<"cookbook", undefined>, import('valibot').LiteralSchema<"cookbookRecipe", undefined>, import('valibot').LiteralSchema<"dataView", undefined>, import('valibot').LiteralSchema<"dimension", undefined>, import('valibot').LiteralSchema<"engine", undefined>, import('valibot').LiteralSchema<"eventQuery", undefined>, import('valibot').LiteralSchema<"presenter", undefined>, import('valibot').LiteralSchema<"presenterPresentation", undefined>, import('valibot').LiteralSchema<"tool", undefined>], undefined>;
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
    }, undefined>, undefined>;
    readonly vendorAccountURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly vendorDocumentationURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly vendorHomeURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly version: import('valibot').StringSchema<undefined>;
    readonly firstCreatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"danger", undefined>, import('valibot').LiteralSchema<"success", undefined>, import('valibot').LiteralSchema<"warning", undefined>], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').NullableSchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>], undefined>, undefined>;
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
}, undefined>;
