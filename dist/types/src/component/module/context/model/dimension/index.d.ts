import { LocaleLabel, Localised } from '../../../../../locale';
export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Localised<ContextModelDimensionConfig>;
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Localised<ContextModelDimensionHierarchyConfig>;
