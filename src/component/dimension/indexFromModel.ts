// ── DPUse Framework
import { ComponentInstanceConfig } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}

// ── Types - Hierarchy Configuration ──────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimensionHierarchy';
}
