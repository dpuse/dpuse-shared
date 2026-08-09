// External Dependencies
import type { Component, ComponentInstanceConfig } from '@/component';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type EventQueryInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface EventQueryConfig extends ComponentInstanceConfig {
    typeId: 'eventQuery';
}
