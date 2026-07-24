import { ComponentConfig } from '../../..';
import { ContextModelEntityDataItemConfig } from './dataItem';
import { ContextModelEntityEventConfig } from './event';
import { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import { LocaleLabel } from '../../../../locale';
export interface ContextModelEntityConfig extends ComponentConfig {
    typeId: 'contextModelEntity';
    labelPlural: LocaleLabel;
    groupId: string;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
