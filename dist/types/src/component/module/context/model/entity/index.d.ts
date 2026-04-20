import { ContextModelEntityDataItemConfig } from './dataItem';
import { ContextModelEntityEventConfig } from './event';
import { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import { LocaleLabel, Localised } from '../../../../../locale';
export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = Localised<ContextModelEntityConfig>;
