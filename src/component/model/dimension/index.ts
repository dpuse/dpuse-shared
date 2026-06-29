// ── DPUse (Local) Framework
import { ComponentConfig } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig extends ComponentConfig {
    typeId: 'contextModelDimension';
    groupId: string;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}

// ── Types - Hierarchy Configuration ──────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig extends ComponentConfig {
    typeId: 'contextModelDimensionHierarchy';
}
