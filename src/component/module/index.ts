// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse (Local) Framework
import type { moduleConfigSchema, moduleTypeIdSchema } from '@/component/module/moduleConfig.schema';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type ModuleConfig = InferOutput<typeof moduleConfigSchema>;

// ── Types - Module Type Identifier ───────────────────────────────────────────────────────────────────────────────────

export type ModuleTypeId = InferOutput<typeof moduleTypeIdSchema>;
