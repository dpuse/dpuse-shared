/**
 * Defines the configuration metadata for a connector. Used for validation
 * of connector manifests and capability discovery at runtime.
 */
export declare const connectorCategoryConfigSchema: import('valibot').ObjectSchema<{
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').StringSchema<undefined>;
        readonly es: import('valibot').StringSchema<undefined>;
    }, undefined>;
}, undefined>;
export declare const connectorOperationNameSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"abortOperation", undefined>, import('valibot').LiteralSchema<"auditObjectContent", undefined>, import('valibot').LiteralSchema<"createObject", undefined>, import('valibot').LiteralSchema<"describeConnection", undefined>, import('valibot').LiteralSchema<"dropObject", undefined>, import('valibot').LiteralSchema<"findObject", undefined>, import('valibot').LiteralSchema<"getReadableStream", undefined>, import('valibot').LiteralSchema<"getRecord", undefined>, import('valibot').LiteralSchema<"listNodes", undefined>, import('valibot').LiteralSchema<"previewObject", undefined>, import('valibot').LiteralSchema<"removeRecords", undefined>, import('valibot').LiteralSchema<"retrieveChunks", undefined>, import('valibot').LiteralSchema<"retrieveRecords", undefined>, import('valibot').LiteralSchema<"upsertRecords", undefined>], undefined>;
export declare const connectorUsageIdSchema: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"bidirectional", undefined>, import('valibot').LiteralSchema<"destination", undefined>, import('valibot').LiteralSchema<"source", undefined>, import('valibot').LiteralSchema<"unknown", undefined>], undefined>;
export declare const connectorConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: import('valibot').LiteralSchema<"connector", undefined>;
    readonly category: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly label: import('valibot').ObjectSchema<{
            readonly en: import('valibot').StringSchema<undefined>;
            readonly es: import('valibot').StringSchema<undefined>;
        }, undefined>;
    }, undefined>, undefined>;
    readonly categoryId: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"application", undefined>, import('valibot').LiteralSchema<"curatedDataset", undefined>, import('valibot').LiteralSchema<"database", undefined>, import('valibot').LiteralSchema<"fileStore", undefined>], undefined>;
    readonly implementations: import('valibot').RecordSchema<import('valibot').StringSchema<undefined>, import('valibot').ObjectSchema<{
        readonly authMethodId: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"apiKey", undefined>, import('valibot').LiteralSchema<"disabled", undefined>, import('valibot').LiteralSchema<"oAuth2", undefined>, import('valibot').LiteralSchema<"none", undefined>], undefined>;
        readonly activeConnectionCount: import('valibot').OptionalSchema<import('valibot').NumberSchema<undefined>, undefined>;
        readonly canDescribe: import('valibot').OptionalSchema<import('valibot').BooleanSchema<undefined>, undefined>;
        readonly id: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly label: import('valibot').OptionalSchema<import('valibot').ObjectSchema<{
            readonly en: import('valibot').StringSchema<undefined>;
            readonly es: import('valibot').StringSchema<undefined>;
        }, undefined>, undefined>;
        readonly maxConnectionCount: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
        readonly params: import('valibot').OptionalSchema<import('valibot').ArraySchema<import('valibot').RecordSchema<import('valibot').StringSchema<undefined>, import('valibot').StringSchema<undefined>, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly operations: import('valibot').ArraySchema<import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"abortOperation", undefined>, import('valibot').LiteralSchema<"auditObjectContent", undefined>, import('valibot').LiteralSchema<"createObject", undefined>, import('valibot').LiteralSchema<"describeConnection", undefined>, import('valibot').LiteralSchema<"dropObject", undefined>, import('valibot').LiteralSchema<"findObject", undefined>, import('valibot').LiteralSchema<"getReadableStream", undefined>, import('valibot').LiteralSchema<"getRecord", undefined>, import('valibot').LiteralSchema<"listNodes", undefined>, import('valibot').LiteralSchema<"previewObject", undefined>, import('valibot').LiteralSchema<"removeRecords", undefined>, import('valibot').LiteralSchema<"retrieveChunks", undefined>, import('valibot').LiteralSchema<"retrieveRecords", undefined>, import('valibot').LiteralSchema<"upsertRecords", undefined>], undefined>, undefined>;
    readonly usageId: import('valibot').UnionSchema<readonly [import('valibot').LiteralSchema<"bidirectional", undefined>, import('valibot').LiteralSchema<"destination", undefined>, import('valibot').LiteralSchema<"source", undefined>, import('valibot').LiteralSchema<"unknown", undefined>], undefined>;
    readonly vendorAccountURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly vendorDocumentationURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly vendorHomeURL: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly version: import('valibot').StringSchema<undefined>;
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
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
}, undefined>;
