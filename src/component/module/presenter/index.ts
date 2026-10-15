// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import { AppError } from '@/errors';
import { LocalisedReference } from '@/locale';
import type { ToolConfig } from '@/component/module/tool';
import type { Component, ComponentReferenceConfig } from '@/component';
import type { presenterActionNameSchema, presenterConfigSchema } from './presenterConfig.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { presenterConfigSchema } from './presenterConfig.schema';

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

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const LOAD_URL_PREFIX = 'https://engine-eu.dpuse.app/presenters';

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The upload folder is the presenter's id without its 'dpuse-presenter-' prefix, as dpuse-development publishes it.
// The app passes its own HTML sanitiser, so a presenter does not bundle a second copy of DOMPurify, which would create a
// second 'dompurify' Trusted Types policy.
export async function loadPresenter(
    presenterConfig: PresenterConfig,
    toolConfigs: ToolConfig[],
    colorModeId: string,
    sanitizeHTML: (html: string) => string
): Promise<PresenterInterface> {
    const presenterName = presenterConfig.id;
    const presenterId = presenterName.split('-').slice(2).join('-');
    const url = `${LOAD_URL_PREFIX}/${presenterId}_v${presenterConfig.version}/${presenterName}.es.js`;
    try {
        const presenterModule = (await import(/* @vite-ignore */ url)) as {
            Presenter: new (toolConfigs: ToolConfig[], colorModeId: string, sanitizeHTML: (html: string) => string) => PresenterInterface;
        };
        return new presenterModule.Presenter(toolConfigs, colorModeId, sanitizeHTML);
    } catch (error) {
        // A bare import rejection names neither the presenter nor the version, so they are attached here.
        const data = { presenterName, url, version: presenterConfig.version };
        throw new AppError(`Failed to load presenter '${presenterName}' v${presenterConfig.version}.`, 'dpuse-shared.component.module.presenter.loadPresenter', data, { cause: error });
    }
}
