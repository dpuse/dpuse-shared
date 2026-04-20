// Local Framework
import type { LocaleLabel } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelSecondaryMeasureConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelSecondaryMeasureLocalisedConfig = Omit<ContextModelSecondaryMeasureConfig, 'label' | 'description'> & { label: string; description: string };
