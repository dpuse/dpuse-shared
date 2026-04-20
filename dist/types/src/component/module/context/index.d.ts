import { InferOutput } from 'valibot';
import { EngineContextActionOptions } from '../../../engine';
import { Localised } from '../../../locale';
import { Component, ComponentConfig, ComponentReference } from '../..';
import { contextConfigSchema, contextOperationNameSchema } from './contextConfig.schema';
export { contextConfigSchema } from './contextConfig.schema';
export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}
export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export type ContextLocalisedConfig = Localised<ContextConfig>;
export type ContextOperationName = InferOutput<typeof contextOperationNameSchema>;
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
