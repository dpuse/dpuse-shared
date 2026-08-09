import { InferOutput, object } from 'valibot';
import { baseConfigSchema } from './baseConfig.schema';
export type BaseConfig = InferOutput<ReturnType<typeof object<typeof baseConfigSchema>>>;
