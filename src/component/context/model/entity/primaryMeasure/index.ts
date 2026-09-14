// ── DPUse Framework
import type { LocaleDescription, LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': no icon, status, or timestamps — a primary measure is a fixed calculation
// on its entity, not an independently managed component. 'id' is the measure name; the set varies per entity — some
// add their own alongside common ones (e.g. 'personLanguage' has 'personAverageLanguageCount') — so, unlike
// 'ContextModelEntityEventId', it is not a fixed union.
export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
    formula?: string;
    // TODO: The open/close (or first/last) event references a count-type measure is built from — not modelled
    // precisely yet, since nothing reads it. Kept loose rather than guessed at.
    events?: unknown[];
}

// Only the measures that apply to this entity — an entity that doesn't define a given measure has no entry for it.
export type ContextModelEntityPrimaryMeasuresConfig = ContextModelEntityPrimaryMeasureConfig[];
