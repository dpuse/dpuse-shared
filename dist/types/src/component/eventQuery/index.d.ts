import { ComponentConfig } from '..';
import { LocalisedConfig } from '../../locale';
export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
export type EventQueryLocalisedConfig = LocalisedConfig<EventQueryConfig>;
