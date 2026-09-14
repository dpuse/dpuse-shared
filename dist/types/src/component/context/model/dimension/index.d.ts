import { ComponentInstanceConfig } from '../../..';
import { ContextModelDimensionHierarchyConfig } from './hierarchy';
export interface ContextModelDimensionConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
