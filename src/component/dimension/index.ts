// ── DPUse Framework
import type { Component, ComponentInstanceConfig } from '@/component';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type DimensionInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface DimensionConfig extends ComponentInstanceConfig {
    typeId: 'dimension';
}
