import { InferOutput } from 'valibot';
import { componentConfigSchema, componentReferenceSchema, componentStatusConfigSchema } from './componentConfig.schema';
import { LocaleId } from '../locale';
export { componentConfigSchema } from './componentConfig.schema';
export type { ModuleConfig, ModuleTypeId } from './module';
export interface Component {
    readonly config: ComponentConfig;
}
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export type ComponentLocalisedConfig = Omit<ComponentConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type ComponentReference = InferOutput<typeof componentReferenceSchema>;
export type ComponentStatus = InferOutput<typeof componentStatusConfigSchema>;
export declare function getComponentStatus(id: string, localeId?: LocaleId): ComponentStatus;
