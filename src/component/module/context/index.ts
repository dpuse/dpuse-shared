/**
 * Context composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Vendor.
import type { InferOutput } from 'valibot';

// Dependencies - Framework.
import type { contextConfigSchema } from '@/component/module/context/contextConfig.schema';
import type { EngineContextActionOptions } from '@/engine';
import type { LocaleLabel } from '@/locale';
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentConfig, ComponentReference } from '@/component';

// Types/Interfaces/Operations - Context.
export interface Context extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: Context, options?: ListContextOptions): Promise<ContextListResult>;
}
export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
} // TODO: Naming, structure...
export interface ContextListResult {
    models: ContextModelGroupConfig[];
}

// Types/Interfaces/Operations - Context configuration.
export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextOperation = 'list';
export type ContextLocalisedConfig = Omit<ContextConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces/Operations - Context model configuration
export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Omit<ContextModelGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimension: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Omit<ContextModelConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces/Operations - Context model dimension configuration.
export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = Omit<ContextModelDimensionGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Omit<ContextModelDimensionConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Omit<ContextModelDimensionHierarchyConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces/Operations - Context model entity configuration.
export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = Omit<ContextModelEntityGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Omit<ContextModelEntityConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = Omit<ContextModelEntityDataItemConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Omit<ContextModelEntityEventConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = Omit<ContextModelEntityPrimaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces/Operations - Context model secondary measure configuration.
export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Omit<ContextModelSecondaryMeasureGroupConfig, 'label' | 'description'> & { label: string; description: string };
export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelSecondaryMeasureLocalisedConfig = Omit<ContextModelSecondaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };

// Types/Interfaces/Operations - Event.
interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';
