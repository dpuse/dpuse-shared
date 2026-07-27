import { ComponentConfig, ComponentReference } from '..';
export interface ContextConfig extends ComponentConfig {
    typeId: 'context';
    areas: ContextAreaConfig[];
}
export interface ContextAreaConfig extends ComponentConfig {
    typeId: 'contextArea';
    models: ComponentReference[];
    order: number;
}
