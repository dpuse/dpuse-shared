/**
 * Shared composables, constants, errors, interfaces, schemas, types and utilities.
 */
/** Interfaces/Types - Context. */
export { contextConfigSchema } from './component/module/context';
export type { Context, ContextConfig, ContextLocalisedConfig, ListContextOptions, ContextListResult, ContextOperation } from './component/module/context';
/** Interfaces/Types - Context model. */
export type { ContextModelGroupConfig, ContextModelGroupLocalisedConfig, ContextModelConfig, ContextModelLocalisedConfig } from './component/module/context';
/** Interfaces/Types - Context model dimension. */
export type { ContextModelDimensionGroupConfig, ContextModelDimensionGroupLocalisedConfig, ContextModelDimensionConfig, ContextModelDimensionLocalisedConfig, ContextModelDimensionHierarchyConfig, ContextModelDimensionHierarchyLocalisedConfig } from './component/module/context';
/** Interfaces/Types - Context model entity. */
export type { ContextModelEntityGroupConfig, ContextModelEntityGroupLocalisedConfig, ContextModelEntityConfig, ContextModelEntityLocalisedConfig, ContextModelEntityDataItemConfig, // Data items.
ContextModelEntityDataItemLocalisedConfig, ContextModelEntityEventConfig, // Events.
ContextModelEntityEventLocalisedConfig, ContextModelEntityPrimaryMeasureConfig, // Primary measures.
ContextModelEntityPrimaryMeasureLocalisedConfig } from './component/module/context';
/** Interfaces/Types - Context model secondary measure. */
export type { ContextModelSecondaryMeasureGroupConfig, ContextModelSecondaryMeasureGroupLocalisedConfig, ContextModelSecondaryMeasureConfig, ContextModelSecondaryMeasureLocalisedConfig } from './component/module/context';
/** Interfaces/Types - Dimension. */
export type { DimensionConfig, DimensionLocalisedConfig } from './component/dimension';
/** Interfaces/Types - Event query. */
export type { EventQueryConfig, EventQueryLocalisedConfig } from './component/eventQuery';
/** Interfaces/Types - Presenter presentation. */
export type { PresentationConfig, PresentationView } from './component/module/presenter/presentation';
export type { PresentationCategoryId, PresentationCartesianTypeId, PresentationPolarTypeId, PresentationRangeTypeId, PresentationVisualConfig, PresentationVisualContentConfig, PresentationVisualViewConfig, PresentationVisualCartesianChartViewConfig, PresentationVisualChordDiagramViewConfig, PresentationVisualPeriodFlowBoundariesChartViewConfig, PresentationVisualPolarChartViewConfig, PresentationVisualRangeChartViewConfig, PresentationVisualSankeyDiagramViewConfig, PresentationVisualStreamGraphViewConfig, PresentationVisualValueTableViewConfig } from './component/module/presenter/presentation';
/** Utilities */
