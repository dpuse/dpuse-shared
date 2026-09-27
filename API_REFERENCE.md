# API Reference

Every export, grouped by import path. This file is updated each time the project is built.

## @dpuse/dpuse-shared

### Types

- BaseConfig

## @dpuse/dpuse-shared/component

### Functions

- getComponentStatus(id, localeId?)

### Schemas

- componentInstanceConfigSchema

### Types

- Component
- ComponentBaseConfig
- ComponentInstanceConfig
- ComponentReferenceConfig

## @dpuse/dpuse-shared/component/connection

### Types

- ConnectionConfig
- ConnectionDescriptionConfig
- ConnectionNodeConfig
- ObjectColumnConfig

## @dpuse/dpuse-shared/component/dataView

### Constants

- ORDERED_VALUE_DELIMITER_IDS

### Types

- BooleanInferenceResult
- ContentAuditConfig
- DataFormatId
- DataSubtypeId
- DataTypeId
- DataViewConfig
- InferenceRecord
- InferenceResult
- InferenceSummary
- NumericInferenceResult
- NumericSignId
- NumericSubtypeId
- NumericUnitsId
- ParsingRecord
- PreviewConfig
- RecordDelimiterId
- StringInferenceResult
- TemporalInferenceResult
- TemporalSubtypeId
- ValueDelimiterId

## @dpuse/dpuse-shared/component/eventQuery

### Types

- EventQueryConfig

## @dpuse/dpuse-shared/component/context

### Types

- ContextConfig

## @dpuse/dpuse-shared/component/context/model

### Types

- ContextModelConfig

## @dpuse/dpuse-shared/component/context/model/dimension

### Types

- ContextModelDimensionConfig

## @dpuse/dpuse-shared/component/context/model/dimension/hierarchy

### Types

- ContextModelDimensionHierarchyConfig
- ContextModelDimensionHierarchyLevelConfig
- ContextModelDimensionHierarchyNodeConfig

## @dpuse/dpuse-shared/component/context/model/entity

### Types

- ContextModelEntityConfig

## @dpuse/dpuse-shared/component/context/model/entity/dataItem

### Types

- ContextModelEntityDataItemConfig

## @dpuse/dpuse-shared/component/context/model/entity/event

### Types

- ContextModelEntityEventConfig
- ContextModelEntityEventsConfig

## @dpuse/dpuse-shared/component/context/model/entity/primaryMeasure

### Types

- ContextModelEntityPrimaryMeasureConfig
- ContextModelEntityPrimaryMeasuresConfig

## @dpuse/dpuse-shared/component/context/model/secondaryMeasure

### Types

- ContextModelSecondaryMeasureConfig

## @dpuse/dpuse-shared/component/module

### Types

- ModuleConfig

## @dpuse/dpuse-shared/component/module/connector

### Functions

- constructConnectorCategoryConfig(id, localeId?)
- constructConnectorUsageConfig(id, localeId?)
- determineConnectorUsageId(actionNames)
- getConnectorActionsTable(supported)

### Schemas

- connectorConfigSchema

### Types

- AuditObjectContentOptions
- AuditObjectContentResult
- ConnectorActionName
- ConnectorConfig
- ConnectorConstructor
- ConnectorInterface
- ConnectorUsageId
- ConnectorUtilities
- CreateObjectOptions
- DescribeConnectionOptions
- DropObjectOptions
- FindObjectOptions
- FindObjectResult
- GetInfoOptions
- GetInfoResult
- GetReadableStreamOptions
- GetRecordOptions
- GetRecordResult
- ListNodesOptions
- ListNodesResult
- PreviewObjectOptions
- RecordRetrievalTypeId
- RemoveRecordsOptions
- RetrieveChunksOptions
- RetrieveRecordsOptions
- RetrieveRecordsSummary
- UpsertRecordsOptions

## @dpuse/dpuse-shared/component/module/engine

### Types

- EngineAuthActionOptions
- EngineCallbackData
- EngineConfig
- EngineConnectorActionOptions
- EngineContextActionOptions
- EngineInitialiseOptions
- EngineRuntime
- EngineWorker

## @dpuse/dpuse-shared/component/module/presenter

### Schemas

- presenterConfigSchema

### Types

- PresenterActionName
- PresenterConfig
- PresenterInterface

## @dpuse/dpuse-shared/component/module/cookbook

### Schemas

- cookbookConfigSchema

### Types

- CookbookConfig
- CookbookInterface

## @dpuse/dpuse-shared/component/module/tool

### Functions

- loadTool(toolConfigs, toolId)

### Types

- ToolConfig

## @dpuse/dpuse-shared/component/presentation

### Types

- PresentationCartesianTypeId
- PresentationCategoryId
- PresentationConfig
- PresentationPolarTypeId
- PresentationRangeTypeId
- PresentationView
- PresentationVisualCartesianChartViewConfig
- PresentationVisualConfig
- PresentationVisualContentConfig
- PresentationVisualPeriodFlowBoundariesChartViewConfig
- PresentationVisualPolarChartViewConfig
- PresentationVisualRangeChartViewConfig
- PresentationVisualViewConfig

## @dpuse/dpuse-shared/component/recipe

## @dpuse/dpuse-shared/encoding

### Functions

- getEncodingTypeConfigs(localeId?)
- isEncodingTypeId(value)

### Constants

- ENCODING_GROUP_CONFIG_MAP
- ENCODING_TYPE_CONFIG_MAP

### Types

- EncodingDetectionConfig
- EncodingTypeConfigLocalised

## @dpuse/dpuse-shared/errors

### Functions

- buildFetchError(response, message, locator)
- concatenateSerialisedErrorMessages(serialisedErrors)
- ignoreErrors(action)
- normalizeToError(value)
- serialiseError(error?)
- unserialiseError(serialisedErrors)

### Classes

- APIError
- AppError
- ConnectorError
- EngineError
- FetchError

### Types

- SerialisedError

## @dpuse/dpuse-shared/locale

### Functions

- createLabelMap(labels)
- localiseConfig(config, localeId)
- localiseConfigs(configs, localeId, isResultSorted?)
- localiseReference(reference, localeId)
- resolveLabel(labels, localeId, fallbackLocaleId?)

### Constants

- DEFAULT_LOCALE_ID
- SUPPORTED_LANGUAGES

### Types

- LocaleDescription
- LocaleId
- LocaleLabel
- LocaleLabelMap
- LocalisedConfig
- LocalisedReference

## @dpuse/dpuse-shared/utilities

### Functions

- convertODataTypeIdToUsageTypeId(oDataTypeId)
- extractExtensionFromPath(itemPath)
- extractNameFromPath(itemPath)
- formatNumberAsDecimalNumber(number?, decimalPlaces?, minimumFractionDigits?, locale?)
- formatNumberAsDuration(number?, stopAt?)
- formatNumberAsSize(number?, decimalPlaces?)
- formatNumberAsStorageSize(number?, decimalPlaces?)
- formatNumberAsWholeNumber(number?, locale?)
- lookupMimeTypeForExtension(extension?)
