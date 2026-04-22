import { ContextModelEntityDataItemConfig } from './dataItem';
import { ContextModelEntityEventConfig } from './event';
import { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import { LocaleLabel, LocalisedConfig } from '../../../../../locale';
export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
export type ContextModelEntityLocalisedConfig = LocalisedConfig<ContextModelEntityConfig>;
