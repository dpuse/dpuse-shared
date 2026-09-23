import { BaseConfig } from '../../../../../index';
import { LocaleDescription } from '../../../../../locale/label';
export interface ContextModelEntityPrimaryMeasureConfig extends Omit<BaseConfig, 'description'> {
    description?: LocaleDescription;
    formula?: string;
    events?: unknown[];
}
export type ContextModelEntityPrimaryMeasuresConfig = ContextModelEntityPrimaryMeasureConfig[];
