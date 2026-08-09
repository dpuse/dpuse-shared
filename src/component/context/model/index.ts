// ── DPUse Framework
import type { ComponentInstanceConfig } from '@/component';
import type { ContextModelEntityConfig } from './entity';
import type { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentInstanceConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
