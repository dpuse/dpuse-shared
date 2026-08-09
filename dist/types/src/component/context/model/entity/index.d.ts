import { ComponentInstanceConfig } from '../../..';
import { ContextModelEntityDataItemConfig } from './dataItem';
import { ContextModelEntityEventConfig } from './event';
import { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import { LocaleLabel } from '../../../../locale';
export interface ContextModelEntityConfig extends ComponentInstanceConfig {
    typeId: 'contextModelEntity';
    labelPlural: LocaleLabel;
    groupId: string;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
