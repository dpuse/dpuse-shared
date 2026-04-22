// Local Framework
import type { LocalisedConfig } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = LocalisedConfig<ContextModelEntityEventConfig>;
