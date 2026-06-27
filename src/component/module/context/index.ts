// External Dependencies
import type { InferOutput } from 'valibot';

// DPUse (Local) Framework
import type { EngineContextActionOptions } from '@/component/module/engine';
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

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export type ContextOperationName = InferOutput<typeof contextOperationNameSchema>;

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}

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
