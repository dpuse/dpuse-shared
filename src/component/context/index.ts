// ── DPUse Framework
import type { ComponentInstanceConfig, ComponentReferenceConfig } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextConfig extends ComponentInstanceConfig {
    typeId: 'context';
    areas: ContextAreaConfig[];
}

export interface ContextAreaConfig extends ComponentInstanceConfig {
    typeId: 'contextArea';
    models: ComponentReferenceConfig[];
    order: number;
}
