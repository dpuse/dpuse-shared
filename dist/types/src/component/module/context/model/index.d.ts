import { ComponentConfig, ComponentReference } from '../../..';
export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    groupId: string;
    dimensions: ComponentReference[];
    entities: ComponentReference[];
    secondaryMeasures: ComponentReference[];
}
