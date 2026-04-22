import { InferOutput } from 'valibot';
import { ModuleConfig } from '..';
import { presenterOperationNameSchema } from './presenterConfig.schema';
import { Component, ComponentReference } from '../..';
export { presenterConfigSchema } from './presenterConfig.schema';
export interface PresenterInterface extends Component {
    readonly config: PresenterConfig;
    list(): ComponentReference[];
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentReference[];
    operations: PresenterOperationName[];
    typeId: 'presenter';
}
export type PresenterOperationName = InferOutput<typeof presenterOperationNameSchema>;
