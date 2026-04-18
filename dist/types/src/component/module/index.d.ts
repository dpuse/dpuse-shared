import { InferOutput } from 'valibot';
import { moduleConfigSchema, moduleTypeIdSchema } from './moduleConfig.schema';
/** Module configuration. */
type ModuleConfig = InferOutput<typeof moduleConfigSchema>;
/** Module type identifier. */
type ModuleTypeId = InferOutput<typeof moduleTypeIdSchema>;
export type { ModuleConfig, ModuleTypeId };
