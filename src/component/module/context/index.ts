// External Dependencies
import type { InferOutput } from 'valibot';

// Local Framework
import type { contextConfigSchema } from '@/component/module/context/contextConfig.schema';
import type { EngineContextActionOptions } from '@/engine';
import type { ModuleConfig } from '@/component/module';
import type { Component, ComponentConfig, ComponentReference } from '@/component';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// Context Interface ───────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ContextListResult>;
}

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextConfig = InferOutput<typeof contextConfigSchema>;
export interface ContextConfig1 extends ModuleConfig {
    models: ContextModelGroupConfig[];
    operations: ContextOperation[];
    typeId: 'context';
}
export type ContextLocalisedConfig = Omit<ContextConfig, 'label' | 'description'> & { label: string; description: string };
export type ContextOperation = 'list';

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}
export type ContextModelGroupLocalisedConfig = Omit<ContextModelGroupConfig, 'label' | 'description'> & { label: string; description: string };

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown;
} // TODO: Naming, structure...
export interface ContextListResult {
    models: ContextModelGroupConfig[];
}

// ??? ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface Event {
    id?: number;
    entityId: string;
    effDate: number;
    typeId: string;
}
