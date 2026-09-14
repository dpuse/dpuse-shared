// ── DPUse Framework
import { ComponentInstanceConfig } from '@/component';
import type { LocaleDescription, LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig extends ComponentInstanceConfig {
    typeId: 'contextModelDimensionHierarchy';
    type: string | null;
    levels: ContextModelDimensionHierarchyLevelConfig[];
    children: ContextModelDimensionHierarchyNodeConfig[];
}

// ── Types - Level Configuration ──────────────────────────────────────────────────────────────────────────────────────

// Names one rank of the hierarchy's tree (e.g. 'Decade', 'Year'), top to bottom — not itself a node in the tree.
export interface ContextModelDimensionHierarchyLevelConfig {
    label: LocaleLabel;
}

// ── Types - Node Configuration ───────────────────────────────────────────────────────────────────────────────────────

// A single position in the tree. Deliberately lighter than 'ComponentInstanceConfig': a hierarchy nests arbitrarily
// deep — an age hierarchy's leaves are individual years — and most nodes carry nothing beyond an id.
export interface ContextModelDimensionHierarchyNodeConfig {
    id: string | number;
    label?: LocaleLabel;
    description?: LocaleDescription;
    children?: ContextModelDimensionHierarchyNodeConfig[];
}
