export declare const contextActionNameSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"listContextFocuses", undefined>], undefined>;
export declare const contextConfigSchema: import('valibot').ObjectSchema<{
    readonly actionNames: import('valibot').ArraySchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"listContextFocuses", undefined>], undefined>, undefined>;
    readonly models: import('valibot').ArraySchema<import('valibot').ObjectSchema<{
        readonly modelRefs: import('valibot').ArraySchema<import('valibot').ObjectSchema<{
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
            readonly order: import('valibot').NumberSchema<undefined>;
            readonly path: import('valibot').StringSchema<undefined>;
        }, undefined>, undefined>;
        readonly order: import('valibot').NumberSchema<undefined>;
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
        readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
        readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
            readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
            readonly label: import('valibot').StringSchema<undefined>;
        }, undefined>, undefined>;
        readonly statusId: import('valibot').NullableSchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>, import('valibot').LiteralSchema<"notApplicable", undefined>, import('valibot').LiteralSchema<"preAlpha", undefined>, import('valibot').LiteralSchema<"proposed", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"unavailable", undefined>, import('valibot').LiteralSchema<"underReview", undefined>], undefined>, undefined>;
        readonly typeId: import('valibot').LiteralSchema<"contextArea", undefined>;
    }, undefined>, undefined>;
    readonly version: import('valibot').StringSchema<undefined>;
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
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly color: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"amber", undefined>, import('valibot').LiteralSchema<"green", undefined>, import('valibot').LiteralSchema<"red", undefined>, import('valibot').LiteralSchema<"other", undefined>], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').NullableSchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"alpha", undefined>, import('valibot').LiteralSchema<"beta", undefined>, import('valibot').LiteralSchema<"generalAvailability", undefined>, import('valibot').LiteralSchema<"notApplicable", undefined>, import('valibot').LiteralSchema<"preAlpha", undefined>, import('valibot').LiteralSchema<"proposed", undefined>, import('valibot').LiteralSchema<"releaseCandidate", undefined>, import('valibot').LiteralSchema<"unavailable", undefined>, import('valibot').LiteralSchema<"underReview", undefined>], undefined>, undefined>;
    readonly typeId: import('valibot').LiteralSchema<"context", undefined>;
}, undefined>;
