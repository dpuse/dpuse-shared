import { InferOutput } from 'valibot';
import { contextConfigSchema } from './contextConfig.schema';
import { EngineContextActionOptions } from '../../../engine';
import { LocaleLabel } from '../../../locale';
import { ModuleConfig } from '..';
import { Component, ComponentConfig, ComponentReference } from '../..';
export interface Context extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: Context, options?: ListContextOptions): Promise<ContextListResult>;
}
export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
}
export interface ContextListResult {
    models: ContextModelGroupConfig[];
}
export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextOperation = 'list';
export type ContextLocalisedConfig = Omit<ContextConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Omit<ContextModelGroupConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimension: ContextModelDimensionGroupConfig[];
    entities: ContextModelEntityGroupConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureGroupConfig[];
}
export type ContextModelLocalisedConfig = Omit<ContextModelConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelDimensionGroupConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    dimensionRefs: ComponentReference[];
}
export type ContextModelDimensionGroupLocalisedConfig = Omit<ContextModelDimensionGroupConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelDimensionConfig {
    id: string;
    label: LocaleLabel;
    hierarchies: ContextModelDimensionHierarchyConfig[];
}
export type ContextModelDimensionLocalisedConfig = Omit<ContextModelDimensionConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelDimensionHierarchyConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelDimensionHierarchyLocalisedConfig = Omit<ContextModelDimensionHierarchyConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelEntityGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    entityRefs: ComponentReference[];
}
export type ContextModelEntityGroupLocalisedConfig = Omit<ContextModelEntityGroupConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Omit<ContextModelEntityConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = Omit<ContextModelEntityDataItemConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Omit<ContextModelEntityEventConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = Omit<ContextModelEntityPrimaryMeasureConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelSecondaryMeasureGroupConfig {
    id: string;
    label: LocaleLabel;
    description?: Record<string, unknown>;
    secondaryMeasureRefs: ComponentReference[];
}
export type ContextModelSecondaryMeasureGroupLocalisedConfig = Omit<ContextModelSecondaryMeasureGroupConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelSecondaryMeasureLocalisedConfig = Omit<ContextModelSecondaryMeasureConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export { contextConfigSchema } from './contextConfig.schema';
