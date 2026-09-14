import { BaseConfig } from '../../../../../index';
import { LocaleDescription } from '../../../../../locale';
export interface ContextModelEntityDataItemConfig extends Omit<BaseConfig, 'description'> {
    description?: LocaleDescription;
    type?: string;
    entityTypeId?: string;
    content?: string;
    lookup?: string;
}
