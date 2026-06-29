# API Reference

### `@dpuse/dpuse-shared/component`

| Category | Exports                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------- |
| Schema   | `componentConfigSchema`                                                                           |
| Types    | `Component`, `ComponentConfig`, `ComponentReference`, `ComponentStatus`, `ComponentStatusColorId` |
| Actions  | `getComponentStatus(id, localeId?)`                                                               |

### `@dpuse/dpuse-shared/component/connection`

| Category | Exports                                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Types    | `ConnectionAuthorisationConfig`, `ConnectionConfig`, `ConnectionDescriptionConfig`, `ConnectionNodeConfig`, `DPAFileSystemFileHandle`, `NodeTypeId`, `ObjectColumnConfig`, `StorageTypeId` |

### `@dpuse/dpuse-shared/component/dataView`

| Category  | Exports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constants | `ORDERED_VALUE_DELIMITER_IDS`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Types     | `BigIntInferenceResult`, `BooleanInferenceResult`, `ContentAuditConfig`, `DataFormatId`, `DataSubtypeId`, `DataTypeId`, `DataViewConfig`, `InferenceRecord`, `InferenceResult`, `InferenceSummary`, `NumberInferenceResult`, `NumericInferenceResult`, `NumericSignId`, `NumericSubtypeId`, `NumericUnitsId`, `ParsingRecord`, `ParsingResult`, `PreviewConfig`, `RecordDelimiterId`, `RelationshipsAuditConfig`, `StringInferenceResult`, `StringSubtypeId`, `TemporalInferenceResult`, `TemporalSubtypeId`, `UnknownInferenceResult`, `ValueDelimiterId`, `ValueTrimMethodId` |

### `@dpuse/dpuse-shared/component/dimension`

| Category | Exports           |
| -------- | ----------------- |
| Types    | `DimensionConfig` |

### `@dpuse/dpuse-shared/component/eventQuery`

| Category | Exports            |
| -------- | ------------------ |
| Types    | `EventQueryConfig` |

### `@dpuse/dpuse-shared/component/model`

| Category | Exports              |
| -------- | -------------------- |
| Types    | `ContextModelConfig` |

### `@dpuse/dpuse-shared/component/model/dimension`

| Category | Exports                                                               |
| -------- | --------------------------------------------------------------------- |
| Types    | `ContextModelDimensionConfig`, `ContextModelDimensionHierarchyConfig` |

### `@dpuse/dpuse-shared/component/model/entity`

| Category | Exports                    |
| -------- | -------------------------- |
| Types    | `ContextModelEntityConfig` |

### `@dpuse/dpuse-shared/component/model/entity/dataItem`

| Category | Exports                            |
| -------- | ---------------------------------- |
| Types    | `ContextModelEntityDataItemConfig` |

### `@dpuse/dpuse-shared/component/model/entity/event`

| Category | Exports                         |
| -------- | ------------------------------- |
| Types    | `ContextModelEntityEventConfig` |

### `@dpuse/dpuse-shared/component/model/entity/primaryMeasure`

| Category | Exports                                  |
| -------- | ---------------------------------------- |
| Types    | `ContextModelEntityPrimaryMeasureConfig` |

### `@dpuse/dpuse-shared/component/model/secondaryMeasure`

| Category | Exports                              |
| -------- | ------------------------------------ |
| Types    | `ContextModelSecondaryMeasureConfig` |

### `@dpuse/dpuse-shared/component/module`

| Category | Exports                        |
| -------- | ------------------------------ |
| Types    | `ModuleConfig`, `ModuleTypeId` |

### `@dpuse/dpuse-shared/component/module/connector`

| Category  | Exports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Schema    | `connectorConfigSchema`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Constants | `CONNECTOR_ACTION_NAME_MAP`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Types     | `AuditObjectContentOptions`, `AuditObjectContentOptions1`, `AuditObjectContentResult`, `AuditObjectContentResult1`, `ConnectorActionName`, `ConnectorConfig`, `ConnectorConstructor`, `ConnectorInterface`, `ConnectorUtilities`, `CreateObjectOptions`, `DescribeConnectionOptions`, `DropObjectOptions`, `FindObjectOptions`, `FindObjectResult`, `GetReadableStreamOptions`, `GetRecordOptions`, `GetRecordResult`, `ListNodesOptions`, `ListNodesResult`, `PreviewObjectOptions`, `RecordRetrievalTypeId`, `RemoveRecordsOptions`, `RetrieveChunksOptions`, `RetrieveRecordsOptions`, `RetrieveRecordsSummary`, `UpsertRecordsOptions` |
| Actions   | `constructConnectorCategoryConfig(id, localeId?)`, `getConnectorActionsTable(supported)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### `@dpuse/dpuse-shared/component/module/context`

| Category | Exports                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Schema   | `contextConfigSchema`                                                                                                    |
| Types    | `ContextActionName`, `ContextAreaConfig`, `ContextConfig`, `ContextInterface`, `ListContextOptions`, `ListContextResult` |

### `@dpuse/dpuse-shared/component/module/engine`

| Category | Exports                                                                                                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Types    | `EngineAuthActionOptions`, `EngineCallbackData`, `EngineConfig`, `EngineConnectorActionOptions`, `EngineContextActionOptions`, `EngineInitialiseOptions`, `EngineRuntime`, `EngineWorker` |

### `@dpuse/dpuse-shared/component/module/presenter`

| Category | Exports                                                        |
| -------- | -------------------------------------------------------------- |
| Schema   | `presenterConfigSchema`                                        |
| Types    | `PresenterActionName`, `PresenterConfig`, `PresenterInterface` |

### `@dpuse/dpuse-shared/component/module/tool`

| Category | Exports                            |
| -------- | ---------------------------------- |
| Types    | `ToolConfig`                       |
| Actions  | `loadTool<T>(toolConfigs, toolId)` |

### `@dpuse/dpuse-shared/component/presentation`

| Category | Exports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Types    | `PresentationCartesianTypeId`, `PresentationCategoryId`, `PresentationConfig`, `PresentationPolarTypeId`, `PresentationRangeTypeId`, `PresentationView`, `PresentationVisualCartesianChartViewConfig`, `PresentationVisualChordDiagramViewConfig`, `PresentationVisualConfig`, `PresentationVisualContentConfig`, `PresentationVisualPeriodFlowBoundariesChartViewConfig`, `PresentationVisualPolarChartViewConfig`, `PresentationVisualRangeChartViewConfig`, `PresentationVisualSankeyDiagramViewConfig`, `PresentationVisualStreamGraphViewConfig`, `PresentationVisualValueTableViewConfig`, `PresentationVisualViewConfig` |

### `@dpuse/dpuse-shared/encoding`

| Category  | Exports                                |
| --------- | -------------------------------------- |
| Constants | `encodingConfigMap`                    |
| Types     | `EncodingConfig`, `EncodingTypeConfig` |
| Actions   | `getEncodingTypeConfigs(localeId?)`    |

### `@dpuse/dpuse-shared/errors`

| Category | Exports                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Types    | `SerialisedError`                                                                                                                                                                                                        |
| Classes  | `APIError`, `AppError`, `ConnectorError`, `DPUseError`, `EngineError`, `FetchError`                                                                                                                                      |
| Actions  | `buildFetchError(response, message, locator)`, `concatenateSerialisedErrorMessages(serialisedErrors)`, `ignoreErrors(action)`, `normalizeToError(value)`, `serialiseError(error?)`, `unserialiseError(serialisedErrors)` |

### `@dpuse/dpuse-shared/locale`

| Category  | Exports                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Constants | `DEFAULT_LOCALE_ID`, `SUPPORTED_LANGUAGES`                                                                                                                               |
| Types     | `FlagId`, `LocaleDescription`, `LocaleId`, `LocaleLabel`, `LocaleLabelMap`, `LocalisedConfig<T>`                                                                         |
| Actions   | `createLabelMap(labels)`, `localiseConfig(config, localeId)`, `localiseConfigs(configs, localeId, isResultSorted?)`, `resolveLabel(labels, localeId, fallbackLocaleId?)` |

### `@dpuse/dpuse-shared/utilities`

| Category | Exports                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions  | `convertODataTypeIdToUsageTypeId(oDataTypeId)`, `extractExtensionFromPath(itemPath)`, `extractNameFromPath(itemPath)`, `formatNumberAsDecimalNumber(number?, decimalPlaces?, minimumFractionDigits?, locale?)`, `formatNumberAsDuration(number?, stopAt?)`, `formatNumberAsSize(number?, decimalPlaces?)`, `formatNumberAsStorageSize(number?, decimalPlaces?)`, `formatNumberAsWholeNumber(number?, locale?)`, `lookupMimeTypeForExtension(extension?)` |
