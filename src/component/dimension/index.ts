// External Dependencies
import type { ComponentConfig } from '@/component';
import type { Localised } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
export type DimensionLocalisedConfig = Localised<DimensionConfig>;
