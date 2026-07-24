export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleDescription = Partial<Record<LocaleId, string[]>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;
export type LocalisedConfig<T> = Omit<T, 'label' | 'description' | 'verb'> & {
    label: string;
    description: string[];
    verb?: string | undefined;
};
interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
    verb?: LocaleLabel | undefined;
}
export type LocalisedReference<T> = Omit<T, 'label' | 'description'> & {
    label: string;
    description: string[];
};
interface UnlocalisedReference {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
}
export declare const DEFAULT_LOCALE_ID: LocaleId;
export declare const SUPPORTED_LANGUAGES: {
    id: LocaleId;
    flag: FlagId;
    label: string;
}[];
export declare function createLabelMap(labels: Record<string, string>): LocaleLabelMap;
export declare function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): LocalisedConfig<T>;
export declare function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId, isResultSorted?: boolean): LocalisedConfig<T>[];
export declare function localiseReference<T extends UnlocalisedReference>(reference: T, localeId: LocaleId): LocalisedReference<T>;
export declare function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId): string | undefined;
export {};
