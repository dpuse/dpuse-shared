// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse (Local) Framework
import type { EngineContextActionOptions } from '@/component/module/engine';
import type { Component, ComponentConfig, ComponentReference } from '@/component';
import type { contextActionNameSchema, contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// ── Schema ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export { contextConfigSchema } from '@/component/module/context/contextConfig.schema';

// ── Types - Context Interface ────────────────────────────────────────────────────────────────────────────────────────

export interface ContextInterface extends Component {
    readonly config: ContextConfig;
    listContextFocuses?(context: ContextInterface, options?: ListContextOptions): Promise<ListContextResult>;
}

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type ContextConfig = InferOutput<typeof contextConfigSchema>;

// ── Types - Action Name ──────────────────────────────────────────────────────────────────────────────────────────────

export type ContextActionName = InferOutput<typeof contextActionNameSchema>;

// ── Types - Model Group Configuration ────────────────────────────────────────────────────────────────────────────────

export interface ContextModelGroupConfig extends ComponentConfig {
    modelRefs: ComponentReference[];
    order: number;
}

// ── Types - Action - List Context ──────────────────────────────────────────────────────────────────────────────────────

export interface ListContextOptions extends EngineContextActionOptions {
    placeholder: unknown; // TODO: Naming, structure...
}

export interface ListContextResult {
    models: ContextModelGroupConfig[];
}
