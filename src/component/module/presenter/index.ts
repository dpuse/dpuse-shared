// External Dependencies
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentReference } from '@/component';
import type { Localised } from '@/locale';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// Interface ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresenterInterface extends Component {
    readonly config: PresenterConfig;

    list(): ComponentReference[]; // TODO: Do we need this. Configuration contains list.
    render(presentationPath: string, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresenterConfig extends ModuleConfig {
    presentations: ComponentReference[];
    operations: PresenterOperation[];
    typeId: 'presenter';
}
export type PresenterLocalisedConfig = Localised<PresenterConfig>;

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export type PresenterOperation = 'list' | 'render' | 'setColorMode';
