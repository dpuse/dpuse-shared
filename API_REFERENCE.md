# API Reference

Every export, grouped by import path. This file is updated each time the project is built.

## @dpuse/dpuse-shared

### Types

- **`BaseConfig`** (inferred from baseConfigSchema)

## @dpuse/dpuse-shared/component

### Functions

- **`getComponentStatus`**`(id: string, localeId?: LocaleId)`

### Schemas

- **`componentInstanceConfigSchema`**

### Types

- **`Component`**
- **`ComponentBaseConfig`** (inferred from componentBaseConfigSchema, extends BaseConfig)
- **`ComponentInstanceConfig`** (inferred from componentInstanceConfigSchema, extends ComponentBaseConfig)
- **`ComponentReferenceConfig`** (inferred from componentReferenceConfigSchema, extends ComponentBaseConfig)

## @dpuse/dpuse-shared/component/connection

### Types

- **`ConnectionConfig`** (extends ComponentInstanceConfig)
- **`ConnectionDescriptionConfig`**
- **`ConnectionNodeConfig`**
- **`ObjectColumnConfig`**

## @dpuse/dpuse-shared/component/dataView

### Constants

- **`ORDERED_VALUE_DELIMITER_IDS`**`: ValueDelimiterId[]`

### Types

- **`BooleanInferenceResult`**
- **`ContentAuditConfig`**
- **`DataFormatId`**
- **`DataSubtypeId`**
- **`DataTypeId`**
- **`DataViewConfig`** (extends ComponentInstanceConfig)
- **`InferenceRecord`**
- **`InferenceResult`**
- **`InferenceSummary`**
- **`NumericInferenceResult`**
- **`NumericSignId`**
- **`NumericSubtypeId`**
- **`NumericUnitsId`**
- **`ParsingRecord`**
- **`PreviewConfig`**
- **`RecordDelimiterId`**
- **`StringInferenceResult`**
- **`TemporalInferenceResult`**
- **`TemporalSubtypeId`**
- **`ValueDelimiterId`**

## @dpuse/dpuse-shared/component/eventQuery

### Types

- **`EventQueryConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/context

### Types

- **`ContextConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/context/model

### Types

- **`ContextModelConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/context/model/dimension

### Types

- **`ContextModelDimensionConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/context/model/dimension/hierarchy

### Types

- **`ContextModelDimensionHierarchyConfig`** (extends ComponentInstanceConfig)
- **`ContextModelDimensionHierarchyLevelConfig`**
- **`ContextModelDimensionHierarchyNodeConfig`**

## @dpuse/dpuse-shared/component/context/model/entity

### Types

- **`ContextModelEntityConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/context/model/entity/dataItem

### Types

- **`ContextModelEntityDataItemConfig`** (extends Omit\<BaseConfig, 'description'>)

## @dpuse/dpuse-shared/component/context/model/entity/event

### Types

- **`ContextModelEntityEventConfig`**
- **`ContextModelEntityEventsConfig`**

## @dpuse/dpuse-shared/component/context/model/entity/primaryMeasure

### Types

- **`ContextModelEntityPrimaryMeasureConfig`** (extends Omit\<BaseConfig, 'description'>)
- **`ContextModelEntityPrimaryMeasuresConfig`**

## @dpuse/dpuse-shared/component/context/model/secondaryMeasure

### Types

- **`ContextModelSecondaryMeasureConfig`** (extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/module

### Types

- **`ModuleConfig`** (inferred from moduleConfigSchema, extends ComponentInstanceConfig)

## @dpuse/dpuse-shared/component/module/connector

### Functions

- **`constructConnectorCategoryConfig`**`(id: string, localeId?: LocaleId)`
- **`constructConnectorUsageConfig`**`(id: string, localeId?: LocaleId)`
- **`determineConnectorUsageId`**`(actionNames: ConnectorActionName[])`
- **`getConnectorActionsTable`**`(supported: ConnectorActionName[])`

### Schemas

- **`connectorConfigSchema`**

### Types

- **`AuditObjectContentOptions`** (extends EngineConnectorActionOptions)
- **`AuditObjectContentResult`**
- **`ConnectorActionName`** (inferred from connectorActionNameSchema)
- **`ConnectorConfig`** (inferred from connectorConfigSchema, extends ModuleConfig)
- **`ConnectorConstructor`**
- **`ConnectorInterface`** (extends Component)
- **`ConnectorUsageId`** (inferred from connectorUsageIdSchema)
- **`ConnectorUtilities`**
- **`CreateObjectOptions`** (extends EngineConnectorActionOptions)
- **`DescribeConnectionOptions`**
- **`DropObjectOptions`** (extends EngineConnectorActionOptions)
- **`FindObjectOptions`** (extends EngineConnectorActionOptions)
- **`FindObjectResult`**
- **`GetInfoOptions`** (extends EngineConnectorActionOptions)
- **`GetInfoResult`**
- **`GetReadableStreamOptions`** (extends EngineConnectorActionOptions)
- **`GetRecordOptions`** (extends EngineConnectorActionOptions)
- **`GetRecordResult`**
- **`ListNodesOptions`** (extends EngineConnectorActionOptions)
- **`ListNodesResult`**
- **`PreviewObjectOptions`** (extends EngineConnectorActionOptions)
- **`RecordRetrievalTypeId`**
- **`RemoveRecordsOptions`** (extends EngineConnectorActionOptions)
- **`RetrieveChunksOptions`** (extends EngineConnectorActionOptions)
- **`RetrieveRecordsOptions`** (extends EngineConnectorActionOptions)
- **`RetrieveRecordsSummary`**
- **`UpsertRecordsOptions`** (extends EngineConnectorActionOptions)

## @dpuse/dpuse-shared/component/module/engine

### Types

- **`EngineAuthActionOptions`**
- **`EngineCallbackData`**
- **`EngineConfig`** (extends ModuleConfig)
- **`EngineConnectorActionOptions`**
- **`EngineContextActionOptions`**
- **`EngineInitialiseOptions`**
- **`EngineRuntime`**
- **`EngineWorker`**

## @dpuse/dpuse-shared/component/module/presenter

### Schemas

- **`presenterConfigSchema`**

### Types

- **`PresenterActionName`** (inferred from presenterActionNameSchema)
- **`PresenterConfig`** (inferred from presenterConfigSchema, extends ModuleConfig)
- **`PresenterInterface`** (extends Component)

## @dpuse/dpuse-shared/component/module/cookbook

### Schemas

- **`cookbookConfigSchema`**

### Types

- **`CookbookConfig`** (inferred from cookbookConfigSchema, extends ModuleConfig)
- **`CookbookInterface`** (extends Component)

## @dpuse/dpuse-shared/component/module/tool

### Functions

- **`loadTool`**`(toolConfigs: ToolConfig[], toolId: string)`

### Types

- **`ToolConfig`** (extends ModuleConfig)

## @dpuse/dpuse-shared/component/presentation

### Types

- **`PresentationCartesianTypeId`**
- **`PresentationCategoryId`**
- **`PresentationConfig`** (extends ComponentInstanceConfig)
- **`PresentationPolarTypeId`**
- **`PresentationRangeTypeId`**
- **`PresentationView`**
- **`PresentationVisualCartesianChartViewConfig`** (extends PresentationVisualViewConfig)
- **`PresentationVisualConfig`**
- **`PresentationVisualContentConfig`**
- **`PresentationVisualPeriodFlowBoundariesChartViewConfig`** (extends PresentationVisualViewConfig)
- **`PresentationVisualPolarChartViewConfig`** (extends PresentationVisualViewConfig)
- **`PresentationVisualRangeChartViewConfig`** (extends PresentationVisualViewConfig)
- **`PresentationVisualViewConfig`**

## @dpuse/dpuse-shared/component/recipe

## @dpuse/dpuse-shared/encoding

### Functions

- **`getEncodingTypeConfigs`**`(localeId?: LocaleId)`
- **`isEncodingTypeId`**`(value: string)`

### Constants

- **`ENCODING_GROUP_CONFIG_MAP`**`: Record<EncodingGroupId, EncodingGroupConfig>`
- **`ENCODING_TYPE_CONFIG_MAP`**`: Record<EncodingTypeId, EncodingTypeConfig>`

### Types

- **`EncodingDetectionConfig`**
- **`EncodingTypeConfigLocalised`**

## @dpuse/dpuse-shared/errors

### Functions

- **`buildFetchError`**`(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string)`
- **`concatenateSerialisedErrorMessages`**`(serialisedErrors: SerialisedError[])`
- **`ignoreErrors`**`(action: () => void)`
- **`normalizeToError`**`(value: unknown)`
- **`serialiseError`**`(error?: unknown)`
- **`unserialiseError`**`(serialisedErrors: SerialisedError[])`

### Classes

- **`APIError`** (extends DPUseError)
- **`AppError`** (extends DPUseError)
- **`ConnectorError`** (extends DPUseError)
- **`EngineError`** (extends DPUseError)
- **`FetchError`** (extends DPUseError)

### Types

- **`SerialisedError`**

## @dpuse/dpuse-shared/locale

### Functions

- **`createLabelMap`**`(labels: Record<string, string>)`
- **`localiseConfig`**`(config: T, localeId: LocaleId)`
- **`localiseConfigs`**`(configs: T[], localeId: LocaleId, isResultSorted?: boolean)`
- **`localiseReference`**`(reference: T, localeId: LocaleId)`
- **`resolveLabel`**`(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId)`

### Constants

- **`DEFAULT_LOCALE_ID`**`: LocaleId`
- **`SUPPORTED_LANGUAGES`**`: { id: LocaleId; flag: FlagId; label: string }[]`

### Types

- **`LocaleDescription`**
- **`LocaleId`**
- **`LocaleLabel`**
- **`LocaleLabelMap`**
- **`LocalisedConfig`**
- **`LocalisedReference`**

## @dpuse/dpuse-shared/utilities

### Functions

- **`convertODataTypeIdToUsageTypeId`**`(oDataTypeId: string)`
- **`extractExtensionFromPath`**`(itemPath: string)`
- **`extractNameFromPath`**`(itemPath: string)`
- **`formatNumberAsDecimalNumber`**`(number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string)`
- **`formatNumberAsDuration`**`(number?: number, stopAt?: DurationLevel)`
- **`formatNumberAsSize`**`(number?: number, decimalPlaces?: number)`
- **`formatNumberAsStorageSize`**`(number?: number, decimalPlaces?: number)`
- **`formatNumberAsWholeNumber`**`(number?: number, locale?: string)`
- **`lookupMimeTypeForExtension`**`(extension?: string)`
