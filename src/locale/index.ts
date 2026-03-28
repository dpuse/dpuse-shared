/**
 * Locale constants and type declarations.
 */

// Constants.
const DEFAULT_LOCALE_CODE: LocaleCode = 'en';

/**
 * Locale codes.
 */
type LocaleCode = 'en' | 'es';

/**
 * Localised string.
 */
type LocalisedString = Record<LocaleCode, string>;

/**
 *
 */
type LocaleLabelMap = ReadonlyMap<string, string>;

/**
 *
 */
const createLabelMap = (labels: Record<string, string>): LocaleLabelMap => new Map(Object.entries(labels));

/**
 *
 */
const resolveLabel = (labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};

// Exposures.
export { createLabelMap, DEFAULT_LOCALE_CODE, resolveLabel };
export type { LocaleCode, LocaleLabelMap, LocalisedString };
