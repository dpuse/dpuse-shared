// External Dependencies
import type { ComponentConfig } from '@/component';
import type { LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
export type DimensionLocalisedConfig = LocalisedConfig<DimensionConfig>;
