// ── DPUse (Local) Framework
import type { ComponentConfig, ComponentReference } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelConfig extends ComponentConfig {
    diagramURL?: string;
    dimensions: ComponentReference[];
    entities: ComponentReference[];
    secondaryMeasures: ComponentReference[];
}
