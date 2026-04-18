/**
 * Presenter composables, constants, errors, types/interfaces and utilities.
 */

export { presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// Dependencies - Framework.
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentReference } from '@/component';

// Types/Interfaces - Presenter.
export interface Presenter extends Component {
    readonly config: PresenterConfig;

    list(): ComponentReference[]; // TODO: Do we need this. Configuration contains list.
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}

// Types/Interfaces - Presenter configuration.
export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentReference[];
    operations: PresenterOperation[];
    typeId: 'presenter';
}
export type PresenterOperation = 'list' | 'render' | 'setColorMode';
export type PresenterLocalisedConfig = Omit<PresenterConfig, 'label' | 'description'> & { label: string; description: string };
