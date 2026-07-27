import { object, InferOutput } from 'valibot';
import { componentBaseSchema, componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusConfigSchema } from './componentConfig.schema';
import { LocaleId } from '../locale';
export { componentConfigSchema } from './componentConfig.schema';
export interface Component {
    readonly config: ComponentConfig;
}
export type ComponentBase = InferOutput<ReturnType<typeof object<typeof componentBaseSchema>>>;
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export type ComponentReference = InferOutput<typeof componentReferenceSchema>;
export type ComponentStatus = InferOutput<typeof componentStatusConfigSchema>;
export type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
export declare function getComponentStatus(id: string, localeId?: LocaleId): ComponentStatus;
