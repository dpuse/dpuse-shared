// ── DPUse Framework
import type { LocaleDescription, LocaleLabel } from '@/locale';

// ── Types - Identifier ───────────────────────────────────────────────────────────────────────────────────────────────

// The fixed lifecycle every entity moves through. An entity's 'events' array holds only the stages that apply to it —
// there is no entry, not a 'null' one, for a stage that doesn't.
export type ContextModelEntityEventId = 'creation' | 'activation' | 'recognition' | 'correction' | 'modification' | 'derecognition' | 'deactivation' | 'archival' | 'deletion';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': no icon, status, or timestamps — an event is a fixed point in an entity's
// lifecycle, not an independently managed component.
export interface ContextModelEntityEventConfig {
    id: ContextModelEntityEventId;
    labelAction: LocaleLabel;
    labelState?: LocaleLabel;
    description: LocaleDescription;
}

export type ContextModelEntityEventsConfig = ContextModelEntityEventConfig[];
