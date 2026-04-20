// External Dependencies
import type { InferOutput } from 'valibot';

// Local Framework
import type { contextConfigSchema } from '@/component/module/context/contextConfig.schema';
import type { EngineContextActionOptions } from '@/engine';
import type { LocaleLabel } from '@/locale';
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentConfig, ComponentReference } from '@/component';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// Context Interface ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ContextListResult>;
}

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextLocalisedConfig = Omit<ContextConfig, 'label' | 'description'> & { label: string; description: string };
export type ContextOperation = 'list';

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Omit<ContextModelGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimension: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Omit<ContextModelConfig, 'label' | 'description'> & { label: string; description: string };

// Model Dimension Group ───────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = Omit<ContextModelDimensionGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model Dimension ─────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Omit<ContextModelDimensionConfig, 'label' | 'description'> & { label: string; description: string };

// Model Dimension Hierarchy ───────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Omit<ContextModelDimensionHierarchyConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Group ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = Omit<ContextModelEntityGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity ────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Omit<ContextModelEntityConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Data Item ──────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = Omit<ContextModelEntityDataItemConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Event ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Omit<ContextModelEntityEventConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Primary Measure ────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = Omit<ContextModelEntityPrimaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Secondary Measure Group ────────────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Omit<ContextModelSecondaryMeasureGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Model Entity Secondary Measure ──────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelSecondaryMeasureLocalisedConfig = Omit<ContextModelSecondaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
} // TODO: Naming, structure...
export interface ContextListResult {
    models: ContextModelGroupConfig[];
}

// ??? ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
