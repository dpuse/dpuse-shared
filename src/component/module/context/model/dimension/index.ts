// DPUse (Local) Framework
import type { LocaleLabel } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}

// Hierarchy Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
