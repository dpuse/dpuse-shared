// External Dependencies
import type { InferOutput } from 'valibot';

// Local Framework
import type { EngineContextActionOptions } from '@/engine';
import type { LocalisedConfig } from '@/locale';
import type { Component, ComponentConfig, ComponentReference } from '@/component';
import type { contextConfigSchema, contextOperationNameSchema } from '@/component/module/context/contextConfig.schema';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// Context Interface ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export type ContextLocalisedConfig = LocalisedConfig<ContextConfig>;

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextOperationName = InferOutput<typeof contextOperationNameSchema>;

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = LocalisedConfig<ContextModelGroupConfig>;

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
} // TODO: Naming, structure...
export interface ListContextResult {
    models: ContextModelGroupConfig[];
}

// ??? ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
