// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import { LocalisedReference } from '@/locale';
import type { Component, ComponentReferenceConfig } from '@/component';
import type { presenterActionNameSchema, presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresenterInterface extends Component {
    readonly config: PresenterConfig;

    list(): ComponentReferenceConfig[]; // TODO: Do we need this? Configuration contains list.
    render(presentationReference: LocalisedReference<ComponentReferenceConfig>, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}

export type PresenterActionName = InferOutput<typeof presenterActionNameSchema>; // Names of the actions a presenter may implement.

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type PresenterConfig = InferOutput<typeof presenterConfigSchema>;
