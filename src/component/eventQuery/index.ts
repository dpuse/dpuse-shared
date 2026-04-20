// External Dependencies
import type { ComponentConfig } from '@/component';
import type { Localised } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = Localised<EventQueryConfig>;
