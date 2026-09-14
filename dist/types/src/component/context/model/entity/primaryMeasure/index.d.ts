import { LocaleDescription, LocaleLabel } from '../../../../../locale';
export interface ContextModelEntityPrimaryMeasureConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
    formula?: string;
    events?: unknown[];
}
export type ContextModelEntityPrimaryMeasuresConfig = ContextModelEntityPrimaryMeasureConfig[];
