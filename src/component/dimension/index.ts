// ── DPUse (Local) Framework
import type { Component, ComponentConfig } from '@/component';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type DimensionInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface DimensionConfig extends ComponentConfig {
    typeId: 'dimension';
}
