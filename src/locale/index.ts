// External Dependencies
import { object, optional, string } from 'valibot';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = object({ en: string(), es: string() });
export const partialLocalLabelSchema = object({ en: optional(string()), es: optional(string()) });

// Types ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type FlagId = 'es' | 'gb';
export type LocaleId = 'en' | 'es';
export type LocaleLabel = Partial<Record<LocaleId, string>>;
export type LocaleLabelMap = ReadonlyMap<string, string>;

// Constants ───────────────────────────────────────────────────────────────────────────────────────────────────────────

export const DEFAULT_LOCALE_ID: LocaleId = 'en';
export const SUPPORTED_LANGUAGES: { id: LocaleId; flag: FlagId; label: string }[] = [
    { id: 'en', flag: 'gb', label: 'English' },
    { id: 'es', flag: 'es', label: 'Español' }
];

// Helpers ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

export function createLabelMap(labels: Record<string, string>): LocaleLabelMap {
    return new Map(Object.entries(labels));
}

export function localiseConfigs<T>(configs: { id: string; label: LocaleLabel; description: LocaleLabel }[], localeId: LocaleId): T[] {
    return configs.map((config) => ({ ...config, label: config.label[localeId] ?? config.id, description: config.description[localeId] ?? config.id }) as T);
}

export function resolveLabel(labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_ID): string | undefined {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
}
