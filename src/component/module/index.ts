// External Dependencies
import type { InferOutput } from 'valibot';

// DPUse (Local) Framework
import type { moduleConfigSchema, moduleTypeIdSchema } from '@/component/module/moduleConfig.schema';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export type ModuleConfig = InferOutput<typeof moduleConfigSchema>;

// Type ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type ModuleTypeId = InferOutput<typeof moduleTypeIdSchema>;
