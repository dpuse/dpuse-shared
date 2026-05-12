import { InferOutput } from 'valibot';
import { moduleConfigSchema, moduleTypeIdSchema } from './moduleConfig.schema';
export type ModuleConfig = InferOutput<typeof moduleConfigSchema>;
export type ModuleTypeId = InferOutput<typeof moduleTypeIdSchema>;
