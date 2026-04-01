import { InferOutput } from 'valibot';
import { componentConfigSchema, componentReferenceSchema, componentStatusSchema } from './componentConfig.schema';
import { LocaleCode } from '../locale';
export interface Component {
    readonly config: ComponentConfig;
}
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export type ComponentLocalisedConfig = Omit<ComponentConfig, 'label' | 'description'> & {
    label: string;
    description: string;
};
export type ComponentReference = InferOutput<typeof componentReferenceSchema>;
type ComponentStatus = InferOutput<typeof componentStatusSchema>;
declare function getComponentStatus(id: string, localeId?: LocaleCode): ComponentStatus;
export { getComponentStatus };
export { componentConfigSchema } from './componentConfig.schema';
export type { ModuleConfig, ModuleTypeId } from './module';
