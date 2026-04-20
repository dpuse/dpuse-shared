import { InferOutput } from 'valibot';
import { contextConfigSchema } from './contextConfig.schema';
import { EngineContextActionOptions } from '../../../engine';
import { Localised } from '../../../locale';
import { ModuleConfig } from '..';
import { Component, ComponentConfig, ComponentReference } from '../..';
export { contextConfigSchema } from './contextConfig.schema';
export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}
export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextLocalisedConfig = Localised<ContextConfig>;
export type ContextOperation = 'list';
export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Localised<ContextModelGroupConfig>;
export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
}
export interface ListContextResult {
    models: ContextModelGroupConfig[];
}
