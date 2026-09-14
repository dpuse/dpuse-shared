import { LocaleDescription, LocaleLabel } from '../../../../../locale';
export type ContextModelEntityEventId = 'creation' | 'activation' | 'recognition' | 'correction' | 'modification' | 'derecognition' | 'deactivation' | 'archival' | 'deletion';
export interface ContextModelEntityEventConfig {
    labelAction: LocaleLabel;
    labelState?: LocaleLabel;
    description: LocaleDescription;
}
export type ContextModelEntityEventsConfig = Record<ContextModelEntityEventId, ContextModelEntityEventConfig | null>;
