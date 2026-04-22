// Local Framework
import type { LocaleLabel, LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = LocalisedConfig<ContextModelEntityPrimaryMeasureConfig>;
