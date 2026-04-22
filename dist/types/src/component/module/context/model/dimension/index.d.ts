import { LocaleLabel, LocalisedConfig } from '../../../../../locale';
export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = LocalisedConfig<ContextModelDimensionConfig>;
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = LocalisedConfig<ContextModelDimensionHierarchyConfig>;
