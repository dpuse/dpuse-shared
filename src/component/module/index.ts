/**
 * Module.
 */

/** Vendor dependencies. */
import type { InferOutput } from 'valibot';

// Framework dependencies.
import type { moduleConfigSchema, moduleTypeIdSchema } from '@/component/module/moduleConfig.schema';

/** Module configuration. */
type ModuleConfig = InferOutput<typeof moduleConfigSchema>;

/** Module type identifier. */
type ModuleTypeId = InferOutput<typeof moduleTypeIdSchema>;

// Exposures.
export type { ModuleConfig, ModuleTypeId };
