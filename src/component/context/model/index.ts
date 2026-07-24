// ── DPUse (Local) Framework
import type { ComponentConfig } from '@/component';
import type { ContextModelEntityConfig } from './entity';
import type { ContextModelSecondaryMeasureConfig } from './secondaryMeasure';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    typeId: 'contextModel';
    diagramURL?: string;
    entities: ContextModelEntityConfig[];
    secondaryMeasures: ContextModelSecondaryMeasureConfig[];
}
