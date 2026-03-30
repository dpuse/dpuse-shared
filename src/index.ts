/**
 * Shared composables, constants, errors, interfaces, schemas, types and utilities.
 */

/** Interfaces/Types - Context. */
export { contextConfigSchema } from '@/component/context';
export type { Context, ContextConfig, ContextLocalisedConfig, ListContextOptions, ContextListResult, ContextOperation } from '@/component/context';

/** Interfaces/Types - Context model. */
export type { ContextModelGroupConfig, ContextModelGroupLocalisedConfig, ContextModelConfig, ContextModelLocalisedConfig } from '@/component/context';

/** Interfaces/Types - Context model dimension. */
export type {
    ContextModelDimensionGroupConfig,
    ContextModelDimensionGroupLocalisedConfig,
    ContextModelDimensionConfig,
    ContextModelDimensionLocalisedConfig,
    ContextModelDimensionHierarchyConfig,
    ContextModelDimensionHierarchyLocalisedConfig
} from '@/component/context';

/** Interfaces/Types - Context model entity. */
export type {
    ContextModelEntityGroupConfig,
    ContextModelEntityGroupLocalisedConfig,
    ContextModelEntityConfig,
    ContextModelEntityLocalisedConfig,
    ContextModelEntityDataItemConfig, // Data items.
    ContextModelEntityDataItemLocalisedConfig,
    ContextModelEntityEventConfig, // Events.
    ContextModelEntityEventLocalisedConfig,
    ContextModelEntityPrimaryMeasureConfig, // Primary measures.
    ContextModelEntityPrimaryMeasureLocalisedConfig
} from '@/component/context';

/** Interfaces/Types - Context model secondary measure. */
export type {
    ContextModelSecondaryMeasureGroupConfig,
    ContextModelSecondaryMeasureGroupLocalisedConfig,
    ContextModelSecondaryMeasureConfig,
    ContextModelSecondaryMeasureLocalisedConfig
} from '@/component/context';

/** Interfaces/Types - Dimension. */
export type { DimensionConfig, DimensionLocalisedConfig } from '@/component/dimension';

/** Interfaces/Types - Event query. */
export type { EventQueryConfig, EventQueryLocalisedConfig } from '@/component/eventQuery';

/** Interfaces/Types */
export { presenterConfigSchema } from '@/component/presenter';
export type { Presenter, PresenterConfig, PresenterLocalisedConfig, PresenterOperation } from '@/component/presenter';

/** Interfaces/Types - Presenter presentation. */
export type { PresentationConfig, PresentationView } from '@/component/presenter/presentation';
export type {
    PresentationCategoryId,
    PresentationCartesianTypeId,
    PresentationPolarTypeId,
    PresentationRangeTypeId,
    PresentationVisualConfig,
    PresentationVisualContentConfig,
    PresentationVisualViewConfig,
    PresentationVisualCartesianChartViewConfig,
    PresentationVisualChordDiagramViewConfig,
    PresentationVisualPeriodFlowBoundariesChartViewConfig,
    PresentationVisualPolarChartViewConfig,
    PresentationVisualRangeChartViewConfig,
    PresentationVisualSankeyDiagramViewConfig,
    PresentationVisualStreamGraphViewConfig,
    PresentationVisualValueTableViewConfig
} from '@/component/presenter/presentation';

// /** Composables */
// export { type CytoscapeJSView, useCytoscapeJS } from '@/composables/useCytoscapeJS';
// export { useDataTable } from '@/composables/useDataTable';

// /** Interfaces/Types - Data view. */
// export type { DataFormatId, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
// export type {
//     DataViewConfig,
//     DataViewContentAuditConfig,
//     DataViewLocalisedConfig,
//     DataViewPreviewConfig,
//     DataViewRelationshipsAuditConfig,
//     ParsedValue
// } from '@/component/dataView';

/** Utilities */
// export { getDataFormats, getRecordDelimiters, getValueDelimiters, ORDERED_VALUE_DELIMITER_IDS } from '@/component/dataView';
