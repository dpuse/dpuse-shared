import { ComponentInstanceConfig } from '../../../..';
import { LocaleDescription, LocaleLabel } from '../../../../../locale';
export interface ContextModelDimensionHierarchyConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimensionHierarchy';
    type: string | null;
    levels: ContextModelDimensionHierarchyLevelConfig[];
    children: ContextModelDimensionHierarchyNodeConfig[];
}
export interface ContextModelDimensionHierarchyLevelConfig {
    label: LocaleLabel;
}
export interface ContextModelDimensionHierarchyNodeConfig {
    id: string | number;
    label?: LocaleLabel;
    description?: LocaleDescription;
    children?: ContextModelDimensionHierarchyNodeConfig[];
}
