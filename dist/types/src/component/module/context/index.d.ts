import { InferOutput } from 'valibot';
import { EngineContextActionOptions } from '../engine';
import { Component, ComponentConfig, ComponentReference } from '../..';
import { contextActionNameSchema, contextConfigSchema } from './contextConfig.schema';
export { contextConfigSchema } from './contextConfig.schema';
export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}
export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export type ContextActionName = InferOutput<typeof contextActionNameSchema>;
export interface ContextAreaConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
}
export interface ListContextResult {
    models: ContextAreaConfig[];
}
