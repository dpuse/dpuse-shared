export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;
export type LocalisedConfig<T> = Omit<T, 'label' | 'description' | 'verb'> & {
    label: string;
    description: string;
    verb?: string | undefined;
};
interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    verb?: LocaleLabel | undefined;
}
export declare const DEFAULT_LOCALE_ID: LocaleId;
export declare const SUPPORTED_LANGUAGES: {
    id: LocaleId;
    flag: FlagId;
    label: string;
}[];
export declare function createLabelMap(labels: Record<string, string>): LocaleLabelMap;
export declare function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): LocalisedConfig<T>;
export declare function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId, sortResult?: boolean): LocalisedConfig<T>[];
export declare function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId): string | undefined;
export {};
