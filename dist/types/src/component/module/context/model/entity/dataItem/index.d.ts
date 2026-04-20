import { LocaleLabel, Localised } from '../../../../../../locale';
export interface ContextModelEntityDataItemConfig {
    id: string;
    label: LocaleLabel;
}
export type ContextModelEntityDataItemLocalisedConfig = Localised<ContextModelEntityDataItemConfig>;
