import { LocaleDescription, LocaleLabel } from '../../../../../locale';
export interface ContextModelEntityPrimaryMeasureConfig {
    label: LocaleLabel;
    description: LocaleDescription;
    formula?: string;
    events?: unknown[];
}
export type ContextModelEntityPrimaryMeasuresConfig = Record<string, ContextModelEntityPrimaryMeasureConfig | null>;
