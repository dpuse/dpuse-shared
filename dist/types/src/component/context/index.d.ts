import { ComponentConfig, ComponentReference } from '..';
export interface ContextConfig extends ComponentConfig {
    typeId: 'context';
    areas: ContextAreaConfig[];
}
export interface ContextAreaConfig extends ComponentConfig {
    models: ComponentReference[];
    order: number;
}
