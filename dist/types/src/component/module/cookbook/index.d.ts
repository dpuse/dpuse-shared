import { InferOutput } from 'valibot';
import { Component, ComponentReferenceConfig } from '../..';
import { cookbookActionNameSchema, cookbookConfigSchema } from './cookbookConfig.schema';
export { cookbookConfigSchema } from './cookbookConfig.schema';
export interface CookbookInterface extends Component {
    readonly config: CookbookConfig;
    list(): ComponentReferenceConfig[];
}
export type CookbookActionName = InferOutput<typeof cookbookActionNameSchema>;
export type CookbookConfig = InferOutput<typeof cookbookConfigSchema>;
