import { BaseConfig } from '../../../../../index';
import { LocaleDescription } from '../../../../../locale';
export interface ContextModelEntityPrimaryMeasureConfig extends Omit<BaseConfig, 'description'> {
    description?: LocaleDescription;
    formula?: string;
    events?: unknown[];
}
export type ContextModelEntityPrimaryMeasuresConfig = ContextModelEntityPrimaryMeasureConfig[];
