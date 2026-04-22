import { ComponentConfig, ComponentReference } from '../../..';
import { LocaleLabel, LocalisedConfig } from '../../../../locale';
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = LocalisedConfig<ContextModelConfig>;
export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = LocalisedConfig<ContextModelDimensionGroupConfig>;
export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = LocalisedConfig<ContextModelEntityGroupConfig>;
export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = LocalisedConfig<ContextModelSecondaryMeasureGroupConfig>;
