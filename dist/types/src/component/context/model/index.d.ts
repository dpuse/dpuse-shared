import { ComponentConfig } from '../..';
import { ContextModelEntityConfig } from './entity';
import { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';
export interface ContextModelConfig extends ComponentConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
