export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;
export type Localised<T> = Omit<T, 'label' | 'description'> & {
    label: string;
    description: string;
};
interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
}
export declare const DEFAULT_LOCALE_ID: LocaleId;
export declare const SUPPORTED_LANGUAGES: {
    id: LocaleId;
    flag: FlagId;
    label: string;
}[];
export declare function createLabelMap(labels: Record<string, string>): LocaleLabelMap;
export declare function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): Localised<T>;
export declare function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId): Localised<T>[];
export declare function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId): string | undefined;
export {};
