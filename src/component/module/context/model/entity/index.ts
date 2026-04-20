// Local Framework
import type { LocaleLabel } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Omit<ContextModelEntityConfig, 'label' | 'description'> & { label: string; description: string };

// Data Item Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = Omit<ContextModelEntityDataItemConfig, 'label' | 'description'> & { label: string; description: string };

// Event Configuration ─────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Omit<ContextModelEntityEventConfig, 'label' | 'description'> & { label: string; description: string };

// Primary Measure Configuration ───────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityPrimaryMeasureLocalisedConfig = Omit<ContextModelEntityPrimaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };
