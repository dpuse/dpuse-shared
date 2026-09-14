import { LocaleDescription, LocaleLabel } from '../../../../../locale';
export type ContextModelEntityEventId = 'creation' | 'activation' | 'recognition' | 'correction' | 'modification' | 'derecognition' | 'deactivation' | 'archival' | 'deletion';
export interface ContextModelEntityEventConfig {
    id: ContextModelEntityEventId;
    labelAction: LocaleLabel;
    labelState?: LocaleLabel;
    description: LocaleDescription;
}
export type ContextModelEntityEventsConfig = ContextModelEntityEventConfig[];
