// ── DPUse Framework
import type { LocaleDescription, LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': the measure's own identity is the key it is stored under in
// 'ContextModelEntityPrimaryMeasuresConfig', not a field of its own.
export interface ContextModelEntityPrimaryMeasureConfig {
    label: LocaleLabel;
    description: LocaleDescription;
    formula?: string;
    // TODO: The open/close (or first/last) event references a count-type measure is built from — not modelled
    // precisely yet, since nothing reads it. Kept loose rather than guessed at.
    events?: unknown[];
}

// Keyed by measure name. The set of keys varies per entity — some add their own alongside the common ones (e.g.
// 'personLanguage' has 'personAverageLanguageCount') — so, unlike 'ContextModelEntityEventId', this is not a fixed
// union.
export type ContextModelEntityPrimaryMeasuresConfig = Record<string, ContextModelEntityPrimaryMeasureConfig | null>;
