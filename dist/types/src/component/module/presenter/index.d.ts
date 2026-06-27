import { InferOutput } from 'valibot';
import { Component, ComponentReference } from '../..';
import { presenterActionNameSchema, presenterConfigSchema } from './presenterConfig.schema';
export { presenterConfigSchema } from './presenterConfig.schema';
export interface PresenterInterface extends Component {
    readonly config: PresenterConfig;
    list(): ComponentReference[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}
export type PresenterActionName = InferOutput<typeof presenterActionNameSchema>;
export type PresenterConfig = InferOutput<typeof presenterConfigSchema>;
