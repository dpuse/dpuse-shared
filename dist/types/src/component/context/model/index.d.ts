import { ComponentInstanceConfig } from '../..';
import { ContextModelDimensionConfig } from './dimension';
import { ContextModelEntityConfig } from './entity';
import { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';
export interface ContextModelConfig extends ComponentInstanceConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    dimensions: ContextModelDimensionConfig[];
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
