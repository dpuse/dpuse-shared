export declare const localeLabelSchema: import('valibot').ObjectSchema<{
    readonly en: import('valibot').StringSchema<undefined>;
    readonly es: import('valibot').StringSchema<undefined>;
}, undefined>;
export declare const partialLocalLabelSchema: import('valibot').ObjectSchema<{
    readonly en: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly es: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
}, undefined>;
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
export declare function localiseConfigs<T>(configs: {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
}[], localeId: LocaleId): T[];
export declare function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: LocaleId): string | undefined;
