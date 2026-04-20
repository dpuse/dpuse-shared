// External Dependencies
import type { InferOutput } from 'valibot';

// Local Framework
import type { contextConfigSchema } from '@/component/module/context/contextConfig.schema';
import type { EngineContextActionOptions } from '@/engine';
import type { Localised } from '@/locale';
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentConfig, ComponentReference } from '@/component';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// Context Interface ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextLocalisedConfig = Localised<ContextConfig>;
export type ContextOperation = 'list';

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Localised<ContextModelGroupConfig>;

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
