import { ComponentInstanceConfig } from '../../..';
import { ContextModelEntityDataItemConfig } from './dataItem';
import { ContextModelEntityEventsConfig } from './event';
import { ContextModelEntityPrimaryMeasuresConfig } from './primaryMeasure';
import { LocaleLabel } from '../../../../locale';
export interface ContextModelEntityConfig extends ComponentInstanceConfig {
    typeId: 'contextModelEntity';
    labelPlural: LocaleLabel;
    groupId: string;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventsConfig;
    parents?: string[];
    primaryMeasures: ContextModelEntityPrimaryMeasuresConfig;
}
