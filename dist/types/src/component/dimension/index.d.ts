import { ComponentConfig } from '..';
import { Localised } from '../../locale';
export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
export type DimensionLocalisedConfig = Localised<DimensionConfig>;
