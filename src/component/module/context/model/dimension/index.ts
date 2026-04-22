// Local Framework
import type { LocaleLabel, LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = LocalisedConfig<ContextModelDimensionConfig>;

// Hierarchy Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = LocalisedConfig<ContextModelDimensionHierarchyConfig>;
