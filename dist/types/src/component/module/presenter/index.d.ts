import { ModuleConfig } from '..';
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
    operations: PresenterOperation[];
    typeId: 'presenter';
}
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type PresenterOperation = 'list' | 'render' | 'setColorMode';
