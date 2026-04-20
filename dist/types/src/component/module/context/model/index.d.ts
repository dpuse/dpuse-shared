import { ComponentConfig, ComponentReference } from '../../..';
import { LocaleLabel, Localised } from '../../../../locale';
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Localised<ContextModelConfig>;
export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = Localised<ContextModelDimensionGroupConfig>;
export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = Localised<ContextModelEntityGroupConfig>;
export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Localised<ContextModelSecondaryMeasureGroupConfig>;
