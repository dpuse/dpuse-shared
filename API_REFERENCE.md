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

- **`ConnectionConfig`** (extends `ComponentInstanceConfig`)
- **`ConnectionDescriptionConfig`**
- **`ConnectionNodeConfig`**
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

#### Constants

- **`ORDERED_VALUE_DELIMITER_IDS`**`: ValueDelimiterId[]`

#### Types

- **`BooleanInferenceResult`**
- **`ContentAuditConfig`**
- **`DataFormatId`**
- **`DataSubtypeId`**
- **`DataTypeId`**
- **`DataViewConfig`** (extends `ComponentInstanceConfig`)
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

### Component › Event Query

#### Types

- **`EventQueryConfig`** (extends `ComponentInstanceConfig`)

### Component › Module

#### Types

- **`ModuleConfig`** (inferred from `moduleConfigSchema`, extends `ComponentInstanceConfig`)

### Component › Module › Connector

#### Functions

- **`constructConnectorCategoryConfig`**`(id: string, localeId?: LocaleId)`
- **`constructConnectorUsageConfig`**`(id: string, localeId?: LocaleId)`
- **`determineConnectorUsageId`**`(actionNames: ConnectorActionName[])`
- **`getConnectorActionsTable`**`(supported: ConnectorActionName[])`

#### Schemas

- **`connectorConfigSchema`**

#### Types

- **`AuditObjectContentOptions`** (extends `EngineConnectorActionOptions`)
- **`AuditObjectContentResult`**
- **`ConnectorActionName`** (inferred from `connectorActionNameSchema`)
- **`ConnectorConfig`** (inferred from `connectorConfigSchema`, extends `ModuleConfig`)
- **`ConnectorConstructor`**
- **`ConnectorInterface`** (extends `Component`)
- **`ConnectorUsageId`** (inferred from `connectorUsageIdSchema`)
- **`ConnectorUtilities`**
- **`CreateObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`DescribeConnectionOptions`**
- **`DropObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`FindObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`FindObjectResult`**
- **`GetInfoOptions`** (extends `EngineConnectorActionOptions`)
- **`GetInfoResult`**
- **`GetReadableStreamOptions`** (extends `EngineConnectorActionOptions`)
- **`GetRecordOptions`** (extends `EngineConnectorActionOptions`)
- **`GetRecordResult`**
- **`ListNodesOptions`** (extends `EngineConnectorActionOptions`)
- **`ListNodesResult`**
- **`PreviewObjectOptions`** (extends `EngineConnectorActionOptions`)
- **`RecordRetrievalTypeId`**
- **`RemoveRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveChunksOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveRecordsOptions`** (extends `EngineConnectorActionOptions`)
- **`RetrieveRecordsSummary`**
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

#### Schemas

- **`presenterConfigSchema`**

#### Types

- **`PresenterActionName`** (inferred from `presenterActionNameSchema`)
- **`PresenterConfig`** (inferred from `presenterConfigSchema`, extends `ModuleConfig`)
- **`PresenterInterface`** (extends `Component`)

### Component › Module › Tool

#### Functions

- **`loadTool`**`(toolConfigs: ToolConfig[], toolId: string)`

#### Types

- **`ToolConfig`** (extends `ModuleConfig`)

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
- **`extractNameFromPath`**`(itemPath: string)`
- **`formatNumberAsDecimalNumber`**`(number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string)`
- **`formatNumberAsDuration`**`(number?: number, stopAt?: DurationLevel)`
- **`formatNumberAsSize`**`(number?: number, decimalPlaces?: number)`
- **`formatNumberAsStorageSize`**`(number?: number, decimalPlaces?: number)`
- **`formatNumberAsWholeNumber`**`(number?: number, locale?: string)`
- **`lookupMimeTypeForExtension`**`(extension?: string)`
