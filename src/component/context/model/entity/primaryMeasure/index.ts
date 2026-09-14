// ── DPUse Framework
import type { BaseConfig } from '@/index';
import type { LocaleDescription } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': no icon, status, or timestamps populated for a primary measure —
// 'description' is also optional here, unlike the base, since a couple of measures skip it. The set of measure ids
// varies per entity — some add their own alongside common ones (e.g. 'personLanguage' has
// 'personAverageLanguageCount') — so, unlike 'ContextModelEntityEventId', it is not a fixed union.
export interface ContextModelEntityPrimaryMeasureConfig extends Omit<BaseConfig, 'description'> {
    description?: LocaleDescription;
    formula?: string;
    // TODO: The open/close (or first/last) event references a count-type measure is built from — not modelled
    // precisely yet, since nothing reads it. Kept loose rather than guessed at.
    events?: unknown[];
}

// Only the measures that apply to this entity — an entity that doesn't define a given measure has no entry for it.
export type ContextModelEntityPrimaryMeasuresConfig = ContextModelEntityPrimaryMeasureConfig[];
