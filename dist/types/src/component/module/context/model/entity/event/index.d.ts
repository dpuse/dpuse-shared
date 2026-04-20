import { Localised } from '../../../../../../locale';
export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: Record<string, string>;
    labelState: Record<string, string>;
}
export type ContextModelEntityEventLocalisedConfig = Localised<ContextModelEntityEventConfig>;
