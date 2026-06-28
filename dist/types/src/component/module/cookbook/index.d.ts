import { InferOutput } from 'valibot';
import { Component, ComponentReference } from '../..';
import { cookbookActionNameSchema, cookbookConfigSchema } from './cookbookConfig.schema';
export { cookbookConfigSchema } from './cookbookConfig.schema';
export interface CookbookInterface extends Component {
    readonly config: CookbookConfig;
    list(): ComponentReference[];
}
export type CookbookActionName = InferOutput<typeof cookbookActionNameSchema>;
export type CookbookConfig = InferOutput<typeof cookbookConfigSchema>;
