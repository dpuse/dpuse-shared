// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import { LocalisedReference } from '@/locale';
import type { Component, ComponentReferenceConfig } from '@/component';
import type { presenterActionNameSchema, presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { presenterConfigSchema } from '@/component/module/presenter/presenterConfig.schema';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

// Sanitizes an HTML string for insertion into the DOM (e.g. via 'innerHTML'). Presenters are dynamically loaded from a
// remote URL and must not sanitize HTML themselves - the host app hands this function to the presenter's constructor
// (see dpuse-app's loadSanitizeHTML()) so that sanitization stays under the host's control regardless of what any
// given presenter version does.
export type SanitizeHTML = (html: string) => TrustedHTML | string;

export interface PresenterInterface extends Component {
    readonly config: PresenterConfig;

    list(): ComponentReferenceConfig[]; // TODO: Do we need this? Configuration contains list.
    render(presentationReference: LocalisedReference<ComponentReferenceConfig>, renderTo: HTMLElement, data?: unknown): Promise<void>;
    setColorMode(colorModeId: string): void;
}

export type PresenterActionName = InferOutput<typeof presenterActionNameSchema>; // Names of the actions a presenter may implement.

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type PresenterConfig = InferOutput<typeof presenterConfigSchema>;
