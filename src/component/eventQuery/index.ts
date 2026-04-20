// External Dependencies
import type { ComponentConfig } from '@/component';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = Omit<EventQueryConfig, 'label' | 'description'> & { label: string; description: string };
