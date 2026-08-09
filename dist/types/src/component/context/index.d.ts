import { ComponentInstanceConfig, ComponentReferenceConfig } from '..';
export interface ContextConfig extends ComponentInstanceConfig {
    typeId: 'context';
    areas: ContextAreaConfig[];
}
export interface ContextAreaConfig extends ComponentInstanceConfig {
    typeId: 'contextArea';
    models: ComponentReferenceConfig[];
    order: number;
}
