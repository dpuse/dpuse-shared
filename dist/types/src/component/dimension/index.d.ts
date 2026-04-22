import { ComponentConfig } from '..';
import { LocalisedConfig } from '../../locale';
export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
export type DimensionLocalisedConfig = LocalisedConfig<DimensionConfig>;
