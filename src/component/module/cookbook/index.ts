// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import type { Component, ComponentReferenceConfig } from '@/component';
import type { cookbookActionNameSchema, cookbookConfigSchema } from './cookbookConfig.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { cookbookConfigSchema } from './cookbookConfig.schema';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

export interface CookbookInterface extends Component {
    readonly config: CookbookConfig;

    list(): ComponentReferenceConfig[]; // TODO: Do we need this? Configuration contains list.
}

type CookbookActionName = InferOutput<typeof cookbookActionNameSchema>; // Names of the actions a cookbook may implement.

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type CookbookConfig = InferOutput<typeof cookbookConfigSchema>;
