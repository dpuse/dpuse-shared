// Local Framework
import type { LocaleLabel } from '@/locale';
import type { ComponentConfig, ComponentReference } from '@/component';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Omit<ContextModelConfig, 'label' | 'description'> & { label: string; description: string };

// Model Dimension Group Configuration ─────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = Omit<ContextModelDimensionGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Group Configuration ────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = Omit<ContextModelEntityGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model Secondary Measure Group Configuration ─────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Omit<ContextModelSecondaryMeasureGroupConfig, 'label' | 'description'> & { label: string; description: string };
