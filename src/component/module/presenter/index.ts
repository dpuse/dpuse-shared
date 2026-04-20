// External Dependencies
import type { InferOutput } from 'valibot';

import type { Localised } from '@/locale';
import type { ModuleConfig } from '@/component/module';
import type { presenterOperationNameSchema } from '@/component/module/presenter/presenterConfig.schema';
import type { Component, ComponentReference } from '@/component';

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
    operations: PresenterOperationName[];
    typeId: 'presenter';
}
export type PresenterLocalisedConfig = Localised<PresenterConfig>;

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export type PresenterOperationName = InferOutput<typeof presenterOperationNameSchema>; // Names of the operations a connector may implement.
