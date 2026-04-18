export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;
export declare const DEFAULT_LOCALE_ID: LocaleId;
export declare const SUPPORTED_LANGUAGES: {
    id: LocaleId;
    flag: FlagId;
    label: string;
}[];
export declare function createLabelMap(labels: Record<string, string>): LocaleLabelMap;
export declare function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId): string | undefined;
