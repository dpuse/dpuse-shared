// ── External Dependencies & Registrations
import type { InferOutput, strictObject } from 'valibot';

// ── DPUse Framework
import { baseConfigSchema } from '@/baseConfig.schema';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type BaseConfig = InferOutput<ReturnType<typeof strictObject<typeof baseConfigSchema>>>;
