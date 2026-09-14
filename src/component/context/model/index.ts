// ── DPUse Framework
import type { ComponentInstanceConfig } from '@/component';
import type { ContextModelDimensionConfig } from './dimension';
import type { ContextModelEntityConfig } from './entity';
import type { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentInstanceConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    dimensions: ContextModelDimensionConfig[];
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
