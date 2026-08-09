import { InferOutput, object } from 'valibot';
import { componentBaseConfigSchema, componentInstanceConfigSchema, componentReferenceConfigSchema, componentStatusColorIdSchema, componentStatusConfigSchema } from './componentConfig.schema';
import { LocaleId } from '../locale';
export { componentInstanceConfigSchema } from './componentConfig.schema';
export interface Component {
    readonly config: ComponentInstanceConfig;
}
export type ComponentBaseConfig = InferOutput<ReturnType<typeof object<typeof componentBaseConfigSchema>>>;
export type ComponentInstanceConfig = InferOutput<typeof componentInstanceConfigSchema>;
export type ComponentReferenceConfig = InferOutput<typeof componentReferenceConfigSchema>;
export type ComponentStatus = InferOutput<typeof componentStatusConfigSchema>;
export type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
export declare function getComponentStatus(id: string, localeId?: LocaleId): ComponentStatus;
