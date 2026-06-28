// ── DPUse (Local) Framework
import type { LocaleLabel } from '@/locale';
import type { ComponentConfig, ComponentReference } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}

// ── Types - Dimension Group Configuration ────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}

// ── Types - Entity Group Configuration ───────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}

// ── Types - Secondary Measure Group Configuration ────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
