// ── DPUse Framework
import type { LocaleDescription, LocaleLabel } from '@/locale';

// ── Types - Identifier ───────────────────────────────────────────────────────────────────────────────────────────────

// The fixed lifecycle every entity moves through. An entity's 'events' record always has all nine keys, 'null' where
// that point in the lifecycle does not apply to it.
export type ContextModelEntityEventId = 'creation' | 'activation' | 'recognition' | 'correction' | 'modification' | 'derecognition' | 'deactivation' | 'archival' | 'deletion';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': the event's own identity is the key it is stored under in
// 'ContextModelEntityEventsConfig', not a field of its own.
export interface ContextModelEntityEventConfig {
    labelAction: LocaleLabel;
    labelState?: LocaleLabel;
    description: LocaleDescription;
}

export type ContextModelEntityEventsConfig = Record<ContextModelEntityEventId, ContextModelEntityEventConfig | null>;
