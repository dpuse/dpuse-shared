// Types ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type FlagId = 'es' | 'gb';

export type LocaleId = 'en' | 'es';

export type LocaleLabel = Partial<Record<LocaleId, string>>;

export type LocaleLabelMap = ReadonlyMap<string, string>;

export type LocalisedConfig<T> = Omit<T, 'label' | 'description' | 'verb'> & { label: string; description: string; verb?: string | undefined };

interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleLabel;
    verb?: LocaleLabel | undefined;
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

export function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): LocalisedConfig<T> {
    return {
        ...config,
        label: config.label[localeId] ?? config.id,
        description: config.description[localeId] ?? config.id,
        verb: config.verb?.[localeId] ?? undefined
    };
}

export function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId): LocalisedConfig<T>[] {
    return configs
        .map((config) => ({
            ...config,
            label: config.label[localeId] ?? config.id,
            description: config.description[localeId] ?? config.id,
            verb: config.verb?.[localeId] ?? undefined
        }))
        .toSorted((a, b) => a.label.localeCompare(b.label) || a.id.localeCompare(b.id));
}

export function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_ID): string | undefined {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
}
