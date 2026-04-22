import { LocaleLabel } from '../../../../../locale';
export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
