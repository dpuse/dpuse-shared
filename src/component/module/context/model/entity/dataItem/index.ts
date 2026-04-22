// Local Framework
import type { LocaleLabel, LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = LocalisedConfig<ContextModelEntityDataItemConfig>;
