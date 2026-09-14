// ── DPUse Framework
import { ComponentInstanceConfig } from '@/component';
import type { ContextModelDimensionHierarchyConfig } from './hierarchy';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
