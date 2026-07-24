import { ComponentConfig } from '../../..';
export interface ContextModelDimensionConfig extends ComponentConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export interface ContextModelDimensionHierarchyConfig extends ComponentConfig {
    typeId: 'contextModelDimensionHierarchy';
}
