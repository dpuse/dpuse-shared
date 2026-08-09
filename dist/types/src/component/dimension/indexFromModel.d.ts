import { ComponentInstanceConfig } from '..';
export interface ContextModelDimensionConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export interface ContextModelDimensionHierarchyConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimensionHierarchy';
}
