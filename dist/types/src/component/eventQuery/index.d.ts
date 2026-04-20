import { ComponentConfig } from '..';
import { Localised } from '../../locale';
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = Localised<EventQueryConfig>;
