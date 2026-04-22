// Local Framework
import type { ComponentConfig, ComponentReference } from '@/component';
import type { LocaleLabel, LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = LocalisedConfig<ContextModelConfig>;

// Dimension Group Configuration ───────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = LocalisedConfig<ContextModelDimensionGroupConfig>;

// Entity Group Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = LocalisedConfig<ContextModelEntityGroupConfig>;

// Secondary Measure Group Configuration ───────────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = LocalisedConfig<ContextModelSecondaryMeasureGroupConfig>;
