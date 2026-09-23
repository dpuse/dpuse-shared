// ── DPUse Framework
import { DEFAULT_LOCALE_ID } from '@/locale/label';
import type { LocaleDescription, LocaleId, LocaleLabel } from '@/locale/label';

// The label vocabulary is re-exported so that the published '@dpuse/dpuse-shared/locale' entry point stays one import
// for consumers, while modules inside this package can depend on '@/locale/label' alone.
export * from '@/locale/label';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type LocalisedConfig<T> = Omit<T, 'label' | 'description' | 'verb'> & { label: string; description: string; verb?: string | undefined };

interface UnlocalisedConfig {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
    verb?: LocaleLabel | undefined;
}

export type LocalisedReference<T> = Omit<T, 'label' | 'description'> & { label: string; description: string };

interface UnlocalisedReference {
    id: string;
    label: LocaleLabel;
    description: LocaleDescription;
}

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export function localiseConfig<T extends UnlocalisedConfig>(config: T, localeId: LocaleId): LocalisedConfig<T> {
    return {
        ...config,
        label: config.label[localeId] ?? config.id,
        description: config.description[localeId] ?? config.description[DEFAULT_LOCALE_ID] ?? '',
        verb: config.verb?.[localeId] ?? undefined
    };
}

export function localiseConfigs<T extends UnlocalisedConfig>(configs: T[], localeId: LocaleId, isResultSorted = false): LocalisedConfig<T>[] {
    const mapped = configs.map((config) => ({
        ...config,
        label: config.label[localeId] ?? config.id,
        description: config.description[localeId] ?? config.description[DEFAULT_LOCALE_ID] ?? '',
        verb: config.verb?.[localeId] ?? undefined
    }));
    return isResultSorted ? mapped.toSorted((a, b) => a.label.localeCompare(b.label) || a.id.localeCompare(b.id)) : mapped;
}

export function localiseReference<T extends UnlocalisedReference>(reference: T, localeId: LocaleId): LocalisedReference<T> {
    return {
        ...reference,
        label: reference.label[localeId] ?? reference.id,
        description: reference.description[localeId] ?? reference.description[DEFAULT_LOCALE_ID] ?? ''
    };
}
