// External Dependencies
import type { ComponentConfig } from '@/component';
import type { LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = LocalisedConfig<EventQueryConfig>;
