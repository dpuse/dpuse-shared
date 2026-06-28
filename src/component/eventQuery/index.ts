// External Dependencies
import type { Component, ComponentConfig } from '@/component';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type EventQueryInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface EventQueryConfig extends ComponentConfig {
    typeId: 'eventQuery';
}
