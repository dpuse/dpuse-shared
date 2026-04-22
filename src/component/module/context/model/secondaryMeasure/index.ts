// Local Framework
import type { LocaleLabel, LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelSecondaryMeasureLocalisedConfig = LocalisedConfig<ContextModelSecondaryMeasureConfig>;
