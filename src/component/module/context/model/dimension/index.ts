// Local Framework
import type { LocaleLabel } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Omit<ContextModelDimensionConfig, 'label' | 'description'> & { label: string; description: string };

// Hierarchy Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Omit<ContextModelDimensionHierarchyConfig, 'label' | 'description'> & { label: string; description: string };
