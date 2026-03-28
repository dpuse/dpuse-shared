/**
 * Locale constants and type declarations.
 */
declare const DEFAULT_LOCALE_CODE: LocaleCode;
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
declare const createLabelMap: (labels: Record<string, string>) => LocaleLabelMap;
/**
 *
 */
declare const resolveLabel: (labels: LocaleLabelMap, localeId: string, fallbackLocaleId?: "en") => string | undefined;
export { createLabelMap, DEFAULT_LOCALE_CODE, resolveLabel };
export type { LocaleCode, LocaleLabelMap, LocalisedString };
