// ── External Dependencies & Registrations
import type { InferOutput, object } from 'valibot';

// ── DPUse Framework
import { baseConfigSchema } from '@/baseConfig.schema';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type BaseConfig = InferOutput<ReturnType<typeof object<typeof baseConfigSchema>>>;
