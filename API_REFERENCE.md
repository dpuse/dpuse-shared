# API Reference

Every export, grouped by import path. This file is updated each time `npm run document` is run, and with each release.

## @dpuse/dpuse-shared

### General

#### Types

- **`BaseConfig`** (inferred from `baseConfigSchema`)

### Component

#### Functions

- **`getComponentStatus`**`(id: string, localeId?: LocaleId)`

#### Schemas

- **`componentInstanceConfigSchema`**

#### Types

- **`Component`**
- **`ComponentBaseConfig`** (inferred from `componentBaseConfigSchema`, extends `BaseConfig`)
- **`ComponentInstanceConfig`** (inferred from `componentInstanceConfigSchema`, extends `ComponentBaseConfig`)
- **`ComponentReferenceConfig`** (inferred from `componentReferenceConfigSchema`, extends `ComponentBaseConfig`)

### Component › Connection

#### Types

- **`AccountConnectionConfig`**
- **`ConnectionConfig`** (extends `ComponentInstanceConfig`)
- **`ConnectionDescriptionConfig`**
- **`ConnectionNodeConfig`** (extends `LocalisedConfig<BaseConfig>`)
- **`ObjectColumnConfig`**

### Component › Context

#### Types

- **`ContextConfig`** (extends `ComponentInstanceConfig`)

### Component › Context › Model

#### Types

- **`ContextModelConfig`** (extends `ComponentInstanceConfig`)

### Component › Context › Model › Dimension

#### Types

- **`ContextModelDimensionConfig`** (extends `ComponentInstanceConfig`)

### Component › Context › Model › Dimension › Hierarchy

#### Types

- **`ContextModelDimensionHierarchyConfig`** (extends `ComponentInstanceConfig`)
- **`ContextModelDimensionHierarchyLevelConfig`**
- **`ContextModelDimensionHierarchyNodeConfig`**

### Component › Context › Model › Entity

#### Types

- **`ContextModelEntityConfig`** (extends `ComponentInstanceConfig`)

### Component › Context › Model › Entity › Data Item

#### Types

- **`ContextModelEntityDataItemConfig`** (extends `Omit<BaseConfig, 'description'>`)

### Component › Context › Model › Entity › Event

#### Types

- **`ContextModelEntityEventConfig`**
- **`ContextModelEntityEventsConfig`**

### Component › Context › Model › Entity › Primary Measure

#### Types

- **`ContextModelEntityPrimaryMeasureConfig`** (extends `Omit<BaseConfig, 'description'>`)
- **`ContextModelEntityPrimaryMeasuresConfig`**

### Component › Context › Model › Secondary Measure

#### Types

- **`ContextModelSecondaryMeasureConfig`** (extends `ComponentInstanceConfig`)

### Component › Data View

#### Functions

- **`getValueDelimiterCharacter`**`(valueDelimiterId: ValueDelimiterId)`

#### Constants

- **`DATA_FORMAT_CONFIGS`**`: readonly [{ readonly id: "arrow"; readonly isTable: false; readonly isText: false; readonly supportId: "planned"; }, { readonly id: "avro"; readonly isTable: false; readonly isText: false; readonly supportId: "planned"; }, ... 10 more ..., { ...; }]`
- **`DATA_TYPE_CONFIGS`**`: readonly [{ readonly id: "string"; readonly defaultSubtypeId: "plain"; readonly isChoosable: true; readonly subtypeIds: readonly ["plain", "email", "url", "uuid", "ulid", "ipv4", "ipv6", "ipRange", "macAddress", ... 7 more ..., "languageCode"]; }, { ...; }, { ...; }, { ...; }, { ...; }]`
- **`DECIMAL_SEPARATOR_IDS`**`: readonly [",", "."]`
- **`VALUE_DELIMITER_CONFIGS`**`: readonly [{ readonly id: ","; readonly character: ","; }, { readonly id: ";"; readonly character: ";"; }, { readonly id: "\t"; readonly character: "\t"; }, { readonly id: "|"; readonly character: "|"; }, ... 5 more ..., { ...; }]`

#### Types

- **`ColumnAuditConfig`** (extends `ColumnReadingConfig`)
- **`ColumnChoiceConfig`**
- **`ColumnChoiceConfigs`**
- **`ColumnReadingConfig`** (extends `ObjectColumnConfig`)
- **`ContentAuditConfig`**
- **`DataFormatId`**
- **`DataFormatSourceId`**
- **`DataSubtypeId`**
- **`DataTypeId`**
- **`DataViewConfig`** (extends `ComponentInstanceConfig`)
- **`DateOrderId`**
- **`DateReadingConfig`**
- **`DecimalSeparatorId`**
- **`DeclaredColumnConfig`**
- **`DeclaredReadingConfig`**
- **`EncodingSourceId`**
- **`FormatIssueId`**
- **`NumericReadingConfig`**
- **`NumericSubtypeId`**
- **`ParsedRecord`**
- **`ReadingChoiceConfig`**
- **`ReadingConfig`**
- **`RecordDelimiterId`**
- **`SampleConfig`**
- **`SampleIssue`**
- **`SampleIssueSeverityId`**
- **`StringSubtypeId`**
- **`TemporalSubtypeId`**
- **`ValueBinConfig`**
- **`ValueBinOutlierConfig`**
- **`ValueBinScaleId`**
- **`ValueDelimiterId`**
- **`ValueDistributionConfig`**

### Component › Event Query

#### Types

- **`EventQueryConfig`** (extends `ComponentInstanceConfig`)

### Component › Module

#### Types

- **`ModuleConfig`** (inferred from `moduleConfigSchema`, extends `ComponentInstanceConfig`)

### Component › Module › Connector

#### Functions

- **`auditObjectContentWithParser`**`(input: { constructColumnAuditor: ConnectorUtilities['constructColumnAuditor']; declaredColumnConfigs?: DeclaredColumnConfig[] | undefined; onProgress: (recordCount: number, byteCount: number) => void; options: AuditObjectContentOptions; signal: AbortSignal; stream: ReadableStream<Uint8Array>; toolConfigs: ToolConfig[]; })`
- **`buildPreviewObjectResult`**`(input: { asAt: number; declaredColumnConfigs?: DeclaredColumnConfig[] | undefined; declaredReadingConfig?: DeclaredReadingConfig | undefined; filePreview: FilePreviewResult; inferDataTypes: ConnectorUtilities['inferDataTypes']; readingChoiceConfig: ReadingChoiceConfig | undefined; // The previewer has already decoded the text with the chosen encoding. startedAt: number; // From 'performance.now()', before the item was fetched. toolConfigs: ToolConfig[]; })`
- **`constructConnectorCategoryConfig`**`(id: string, localeId?: LocaleId)`
- **`constructConnectorItemTypeConfig`**`(id: string, localeId?: LocaleId)`
- **`constructConnectorUsageConfig`**`(id: string, localeId?: LocaleId)`
- **`determineConnectorUsageId`**`(actionNames: ConnectorActionName[])`
- **`getConnectorActionsTable`**`(supported: ConnectorActionName[])`
- **`retrieveRecordsWithParser`**`(input: { chunk: (typeId: RecordRetrievalTypeId, records: ParsedRecord[]) => void | Promise<void>; // A returned promise holds the read back until it settles. options: RetrieveRecordsOptions; signal: AbortSignal; stream: ReadableStream<Uint8Array>; toolConfigs: ToolConfig[]; })`

#### Schemas

- **`connectorConfigSchema`**

#### Types

- **`AuditObjectContentOptions`** (extends `EngineConnectorActionOptions`)
- **`AuditObjectContentResult`**
- **`ClassifyPreviewValuesOptions`** (extends `EngineConnectorActionOptions`)
- **`CloseStoreOptions`**
- **`ColumnAuditor`**
- **`ConnectorActionName`** (inferred from `connectorActionNameSchema`)
- **`ConnectorConfig`** (inferred from `connectorConfigSchema`, extends `ModuleConfig`)
- **`ConnectorConstructor`**
- **`ConnectorInterface`**
- **`ConnectorItemTypeId`** (inferred from `connectorItemTypeIdSchema`)
- **`ConnectorUsageId`** (inferred from `connectorUsageIdSchema`)
- **`ConnectorUtilities`**
- **`CreateObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`DescribeConnectionOptions`**
- **`DropObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`EngineLoadObjectRecordsOptions`** (extends `LoadObjectRecordsOptions`)
- **`EngineLoadObjectRecordsResult`** (extends `LoadObjectRecordsResult`)
- **`FindObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`FindObjectResult`**
- **`GetInfoOptions`** (extends `EngineConnectorActionOptions`)
- **`GetInfoResult`**
- **`GetReadableStreamOptions`** (extends `EngineConnectorActionOptions`)
- **`GetRecordOptions`** (extends `EngineConnectorActionOptions`)
- **`GetRecordResult`**
- **`InferenceSummary`**
- **`ListNodesOptions`** (extends `EngineConnectorActionOptions`)
- **`ListNodesResult`**
- **`LoadObjectRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`LoadObjectRecordsResult`**
- **`OpenStoreOptions`**
- **`OpenStoreResult`**
- **`PreviewObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`PreviewObjectResult`**
- **`PreviewValueStateId`**
- **`QueryAggregate`**
- **`QueryAggregateFunctionId`**
- **`QueryFilter`**
- **`QueryFilterOperatorId`**
- **`QueryRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`QueryRecordsResult`**
- **`QuerySort`**
- **`RecordRange`**
- **`RecordRetrievalTypeId`**
- **`RecountPreviewColumnsOptions`** (extends `EngineConnectorActionOptions`)
- **`RemoveRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveChunksOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveRecordsSummary`**
- **`StoreRecord`**
- **`StoreStateId`**
- **`StoreValue`**
- **`UpsertRecordsOptions`** (extends `EngineConnectorActionOptions`)

### Component › Module › Cookbook

#### Schemas

- **`cookbookConfigSchema`**

#### Types

- **`CookbookConfig`** (inferred from `cookbookConfigSchema`, extends `ModuleConfig`)
- **`CookbookInterface`** (extends `Component`)

### Component › Module › Engine

#### Types

- **`EngineAuthActionOptions`**
- **`EngineCallbackData`**
- **`EngineConfig`** (extends `ModuleConfig`)
- **`EngineConnectorActionOptions`**
- **`EngineContextActionOptions`**
- **`EngineInitialiseOptions`**
- **`EngineRuntime`**
- **`EngineWorker`**

### Component › Module › Presenter

#### Functions

- **`loadPresenter`**`(presenterConfig: PresenterConfig, toolConfigs: ToolConfig[], colorModeId: string, sanitizeHTML: (html: string) => string)`

#### Schemas

- **`presenterConfigSchema`**

#### Types

- **`PresenterActionName`** (inferred from `presenterActionNameSchema`)
- **`PresenterConfig`** (inferred from `presenterConfigSchema`, extends `ModuleConfig`)
- **`PresenterInterface`** (extends `Component`)

### Component › Module › Tool

#### Functions

- **`listParserToolConfigs`**`(toolConfigs: ToolConfig[], dataFormatId: DataFormatId)`
- **`loadTool`**`(toolConfigs: ToolConfig[], toolId: string)`
- **`parseDelimitedText`**`(text: string, options: ParseTextOptions, parseTextWithDelimiter: ParseTextWithDelimiter)`
    > Reads delimited text for a preview: detects its record delimiter, and which of the candidate value delimiters splits it best. The value delimiter is undefined when the text is not delimited: the best one found does not split most records into the same number of values, more than one, as a table's rows would be. The records parsed with it are still returned, so the text can be shown as a table if the user chooses. A delimiter whose parse has issues is only used when every delimiter's does, because a wrong delimiter can itself cause a quote error. Then the one with the fewest issues is used, the first on a tie, and its issues are returned, so the user learns why the text cannot be read.
- **`resolveParserToolConfig`**`(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId?: string)`

#### Constants

- **`TOOL_NAME_PREFIX`**`: string`

#### Schemas

- **`toolConfigSchema`**

#### Types

- **`FilePreviewerInterface`**
- **`FilePreviewResult`**
- **`ParserConfig`** (inferred from `parserConfigSchema`)
- **`ParserInterface`**
- **`ParseStreamOptions`**
- **`ParseTextOptions`**
- **`ParseTextResult`**
- **`ParseTextWithDelimiter`**
- **`ToolConfig`** (inferred from `toolConfigSchema`, extends `ModuleConfig`)

### Component › Presentation

#### Types

- **`PresentationCartesianTypeId`**
- **`PresentationCategoryId`**
- **`PresentationConfig`** (extends `ComponentInstanceConfig`)
- **`PresentationPolarTypeId`**
- **`PresentationRangeTypeId`**
- **`PresentationView`**
- **`PresentationVisualCartesianChartViewConfig`** (extends `PresentationVisualViewConfig`)
- **`PresentationVisualConfig`**
- **`PresentationVisualContentConfig`**
- **`PresentationVisualPeriodFlowBoundariesChartViewConfig`** (extends `PresentationVisualViewConfig`)
- **`PresentationVisualPolarChartViewConfig`** (extends `PresentationVisualViewConfig`)
- **`PresentationVisualRangeChartViewConfig`** (extends `PresentationVisualViewConfig`)
- **`PresentationVisualViewConfig`**

### Encoding

#### Functions

- **`getEncodingTypeConfigs`**`(localeId?: LocaleId)`
- **`isEncodingTypeId`**`(value: string)`
- **`resolveDecoderId`**`(encodingId: string)`

#### Constants

- **`ENCODING_GROUP_CONFIG_MAP`**`: Record<EncodingGroupId, EncodingGroupConfig>`
- **`ENCODING_TYPE_CONFIG_MAP`**`: Record<EncodingTypeId, EncodingTypeConfig>`

#### Types

- **`EncodingDetectionConfig`**
- **`EncodingTypeConfigLocalised`**

### Errors

#### Functions

- **`buildFetchError`**`(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string)`
- **`concatenateSerialisedErrorMessages`**`(serialisedErrors: SerialisedError[])`
- **`ignoreErrors`**`(action: () => void)`
- **`normalizeToError`**`(value: unknown)`
- **`serialiseError`**`(error?: unknown)`
- **`unserialiseError`**`(serialisedErrors: SerialisedError[])`

#### Classes

- **`APIError`** (extends `DPUseError`)
- **`AppError`** (extends `DPUseError`)
- **`ConnectorError`** (extends `DPUseError`)
- **`EngineError`** (extends `DPUseError`)
- **`FetchError`** (extends `DPUseError`)

#### Types

- **`SerialisedError`**

### Locale

#### Functions

- **`createLabelMap`**`(labels: Record<string, string>)`
- **`localiseConfig`**`(config: T, localeId: LocaleId)`
- **`localiseConfigs`**`(configs: T[], localeId: LocaleId, isResultSorted?: boolean)`
- **`localiseReference`**`(reference: T, localeId: LocaleId)`
- **`resolveLabel`**`(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId)`

#### Constants

- **`DEFAULT_LOCALE_ID`**`: LocaleId`
- **`SUPPORTED_LANGUAGES`**`: { id: LocaleId; flag: FlagId; label: string }[]`

#### Types

- **`LocaleDescription`**
- **`LocaleId`**
- **`LocaleLabel`**
- **`LocaleLabelMap`**
- **`LocalisedConfig`**
- **`LocalisedReference`**

### Utilities

#### Functions

- **`convertODataTypeIdToUsageTypeId`**`(oDataTypeId: string)`
- **`extractExtensionFromPath`**`(itemPath: string)`
- **`extractPathWithoutExtension`**`(itemPath: string)`
- **`formatNumberAsDecimalNumber`**`(number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string)`
- **`formatNumberAsDuration`**`(number?: number, stopAt?: DurationUnit, locale?: string)`
- **`formatNumberAsSize`**`(number?: number, decimalPlaces?: number, locale?: string)`
- **`formatNumberAsStorageSize`**`(number?: number, decimalPlaces?: number, locale?: string)`
- **`formatNumberAsWholeNumber`**`(number?: number, locale?: string)`
- **`hasMimeTypeForExtension`**`(extension?: string)`
- **`lookupMimeTypeForExtension`**`(extension?: string)`

#### Types

- **`DurationUnit`**
- **`UsageTypeId`**
