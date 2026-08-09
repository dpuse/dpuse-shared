import { ComponentInstanceConfig } from '../..';
import { ContextModelEntityConfig } from './entity';
import { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';
export interface ContextModelConfig extends ComponentInstanceConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
