// Types ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;
export type LocalisedConfig<T> = Omit<T, 'label' | 'description'> & { label: string; description: string };
interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
}

// Constants ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export const DEFAULT_LOCALE_ID: LocaleId = 'en';
export const SUPPORTED_LANGUAGES: { id: LocaleId; flag: FlagId; label: string }[] = [
    { id: 'en', flag: 'gb', label: 'English' },
    { id: 'es', flag: 'es', label: 'Español' }
];

// Actions ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

export function createLabelMap(labels: Record<string, string>): LocaleLabelMap {
    return new Map(Object.entries(labels));
}

export function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): T {
    return { ...config, label: config.label[localeId] ?? config.id, description: config.description[localeId] ?? config.id };
}

export function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId): T[] {
    return configs.map<T>((config) => ({ ...config, label: config.label[localeId] ?? config.id, description: config.description[localeId] ?? config.id }));
}

export function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_ID): string | undefined {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
}
