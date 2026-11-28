// External Dependencies
import type { ComponentInstanceConfig } from '@/component';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Configuration
export interface EventQueryConfig extends ComponentInstanceConfig {
    typeId: 'eventQuery';
    contextEventReference: ContextEventReference; // The context event the query is for.
}

// ── Context Event Reference ─ Where an event sits in the context: an area holds models, a model holds entities and an
// entity has events.
export interface ContextEventReference {
    areaId: string;
    modelId: string;
    entityId: string;
    eventId: string;
}
