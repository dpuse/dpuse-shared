// Local Framework
import type { LocaleLabel, Localised } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Localised<ContextModelDimensionConfig>;

// Hierarchy Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Localised<ContextModelDimensionHierarchyConfig>;
