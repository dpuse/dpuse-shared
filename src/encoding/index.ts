// ── DPUse Framework
import { DEFAULT_LOCALE_ID, type LocaleId, type LocaleLabel } from '@/locale/label';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type EncodingGroupId = keyof typeof ENCODING_GROUP_CONFIG_DATA;
export type EncodingTypeId = keyof typeof ENCODING_TYPE_CONFIG_DATA;

export interface EncodingGroupConfig {
    id: EncodingGroupId;
    label: LocaleLabel;
}

export interface EncodingTypeConfig {
    id: EncodingTypeId;
    groupId: EncodingGroupId | null; // Null for encodings that belong to no group, e.g. 'ascii' and 'utf-8'.
    isDetectable: boolean;
    isDecodable: boolean;
}
export interface EncodingTypeConfigLocalised {
    id: EncodingTypeId;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

export interface EncodingDetectionConfig {
    id: EncodingTypeId;
    confidenceLevel: number | undefined;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const ENCODING_GROUP_CONFIG_DATA = {
    arabic: { id: 'arabic', label: { en: 'Arabic', es: 'Árabe' } },
    baltic: { id: 'baltic', label: { en: 'Baltic', es: 'Báltico' } },
    celtic: { id: 'celtic', label: { en: 'Celtic', es: 'Celta' } },
    centralEuropean: { id: 'centralEuropean', label: { en: 'Central European', es: 'Centroeuropeo' } },
    chineseSimplified: { id: 'chineseSimplified', label: { en: 'Chinese Simplified', es: 'Chino simplificado' } },
    chineseTraditional: { id: 'chineseTraditional', label: { en: 'Chinese Traditional', es: 'Chino tradicional' } },
    cyrillic: { id: 'cyrillic', label: { en: 'Cyrillic', es: 'Cirílico' } },
    greek: { id: 'greek', label: { en: 'Greek', es: 'Griego' } },
    hebrew: { id: 'hebrew', label: { en: 'Hebrew', es: 'Hebreo' } },
    japanese: { id: 'japanese', label: { en: 'Japanese', es: 'Japonés' } },
    korean: { id: 'korean', label: { en: 'Korean', es: 'Coreano' } },
    nordic: { id: 'nordic', label: { en: 'Nordic', es: 'Nórdico' } },
    other: { id: 'other', label: { en: 'Other', es: 'Otro' } },
    romanian: { id: 'romanian', label: { en: 'Romanian', es: 'Rumano' } },
    southernEuropean: { id: 'southernEuropean', label: { en: 'Southern European', es: 'Europeo meridional' } },
    thai: { id: 'thai', label: { en: 'Thai', es: 'Tailandés' } },
    turkish: { id: 'turkish', label: { en: 'Turkish', es: 'Turco' } },
    unicode16: { id: 'unicode16', label: { en: 'Unicode 16', es: 'Unicode 16' } },
    unicode32: { id: 'unicode32', label: { en: 'Unicode 32', es: 'Unicode 32' } },
    vietnamese: { id: 'vietnamese', label: { en: 'Vietnamese', es: 'Vietnamita' } },
    western: { id: 'western', label: { en: 'Western', es: 'Occidental' } }
} as const satisfies Record<string, { id: string; label: LocaleLabel }>;

const ENCODING_TYPE_CONFIG_DATA = {
    ascii: { id: 'ascii', groupId: null, isDetectable: false, isDecodable: true },
    big5: { id: 'big5', groupId: 'chineseTraditional', isDetectable: true, isDecodable: true },
    'euc-jp': { id: 'euc-jp', groupId: 'japanese', isDetectable: true, isDecodable: true },
    'euc-kr': { id: 'euc-kr', groupId: 'korean', isDetectable: true, isDecodable: true },
    gb18030: { id: 'gb18030', groupId: 'chineseSimplified', isDetectable: true, isDecodable: true },
    gbk: { id: 'gbk', groupId: 'chineseSimplified', isDetectable: false, isDecodable: true },
    ibm866: { id: 'ibm866', groupId: 'cyrillic', isDetectable: false, isDecodable: true },
    'iso-2022-cn': { id: 'iso-2022-cn', groupId: 'chineseSimplified', isDetectable: true, isDecodable: false },
    'iso-2022-jp': { id: 'iso-2022-jp', groupId: 'japanese', isDetectable: true, isDecodable: true },
    'iso-2022-kr': { id: 'iso-2022-kr', groupId: 'korean', isDetectable: true, isDecodable: false },
    'iso-8859-1': { id: 'iso-8859-1', groupId: 'western', isDetectable: true, isDecodable: true },
    'iso-8859-2': { id: 'iso-8859-2', groupId: 'centralEuropean', isDetectable: true, isDecodable: true },
    'iso-8859-3': { id: 'iso-8859-3', groupId: 'southernEuropean', isDetectable: false, isDecodable: true },
    'iso-8859-4': { id: 'iso-8859-4', groupId: 'baltic', isDetectable: false, isDecodable: true },
    'iso-8859-5': { id: 'iso-8859-5', groupId: 'cyrillic', isDetectable: true, isDecodable: true },
    'iso-8859-6': { id: 'iso-8859-6', groupId: 'arabic', isDetectable: true, isDecodable: true },
    'iso-8859-7': { id: 'iso-8859-7', groupId: 'greek', isDetectable: true, isDecodable: true },
    'iso-8859-8': { id: 'iso-8859-8', groupId: 'hebrew', isDetectable: true, isDecodable: true },
    'iso-8859-9': { id: 'iso-8859-9', groupId: 'turkish', isDetectable: true, isDecodable: true },
    'iso-8859-10': { id: 'iso-8859-10', groupId: 'nordic', isDetectable: false, isDecodable: true },
    'iso-8859-11': { id: 'iso-8859-11', groupId: 'thai', isDetectable: false, isDecodable: true },
    'iso-8859-13': { id: 'iso-8859-13', groupId: 'baltic', isDetectable: false, isDecodable: true },
    'iso-8859-14': { id: 'iso-8859-14', groupId: 'celtic', isDetectable: false, isDecodable: true },
    'iso-8859-15': { id: 'iso-8859-15', groupId: 'western', isDetectable: false, isDecodable: true },
    'iso-8859-16': { id: 'iso-8859-16', groupId: 'romanian', isDetectable: false, isDecodable: true },
    'koi8-r': { id: 'koi8-r', groupId: 'cyrillic', isDetectable: true, isDecodable: true },
    'koi8-u': { id: 'koi8-u', groupId: 'cyrillic', isDetectable: false, isDecodable: true },
    latin1: { id: 'latin1', groupId: 'western', isDetectable: false, isDecodable: true },
    macintosh: { id: 'macintosh', groupId: 'western', isDetectable: false, isDecodable: true },
    shift_jis: { id: 'shift_jis', groupId: 'japanese', isDetectable: true, isDecodable: true },
    'tis-620': { id: 'tis-620', groupId: 'thai', isDetectable: false, isDecodable: true },
    'utf-16': { id: 'utf-16', groupId: 'unicode16', isDetectable: false, isDecodable: true },
    'utf-16be': { id: 'utf-16be', groupId: 'unicode16', isDetectable: true, isDecodable: true },
    'utf-16le': { id: 'utf-16le', groupId: 'unicode16', isDetectable: true, isDecodable: true },
    'utf-32be': { id: 'utf-32be', groupId: 'unicode32', isDetectable: true, isDecodable: false },
    'utf-32le': { id: 'utf-32le', groupId: 'unicode32', isDetectable: true, isDecodable: false },
    'utf-8': { id: 'utf-8', groupId: null, isDetectable: true, isDecodable: true },
    'windows-1250': { id: 'windows-1250', groupId: 'centralEuropean', isDetectable: true, isDecodable: true },
    'windows-1251': { id: 'windows-1251', groupId: 'cyrillic', isDetectable: true, isDecodable: true },
    'windows-1252': { id: 'windows-1252', groupId: 'western', isDetectable: true, isDecodable: true },
    'windows-1253': { id: 'windows-1253', groupId: 'greek', isDetectable: true, isDecodable: true },
    'windows-1254': { id: 'windows-1254', groupId: 'turkish', isDetectable: true, isDecodable: true },
    'windows-1255': { id: 'windows-1255', groupId: 'hebrew', isDetectable: true, isDecodable: true },
    'windows-1256': { id: 'windows-1256', groupId: 'arabic', isDetectable: true, isDecodable: true },
    'windows-1257': { id: 'windows-1257', groupId: 'baltic', isDetectable: false, isDecodable: true },
    'windows-1258': { id: 'windows-1258', groupId: 'vietnamese', isDetectable: false, isDecodable: true },
    'windows-874': { id: 'windows-874', groupId: 'thai', isDetectable: false, isDecodable: true },
    'x-mac-cyrillic': { id: 'x-mac-cyrillic', groupId: 'cyrillic', isDetectable: false, isDecodable: true },
    'x-user-defined': { id: 'x-user-defined', groupId: 'other', isDetectable: false, isDecodable: true }
} as const satisfies Record<string, { id: string; groupId: keyof typeof ENCODING_GROUP_CONFIG_DATA | null; isDetectable: boolean; isDecodable: boolean }>;

export const ENCODING_GROUP_CONFIG_MAP = ENCODING_GROUP_CONFIG_DATA as Record<EncodingGroupId, EncodingGroupConfig>;
export const ENCODING_TYPE_CONFIG_MAP = ENCODING_TYPE_CONFIG_DATA as Record<EncodingTypeId, EncodingTypeConfig>;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Narrows a name from outside the app, such as one reported by encoding detection, to a known encoding id. Check with
// this once where the name arrives, so everything after it works with 'EncodingTypeId'.
export function isEncodingTypeId(value: string): value is EncodingTypeId {
    return Object.hasOwn(ENCODING_TYPE_CONFIG_MAP, value);
}

export function getEncodingTypeConfigs(localeId: LocaleId = DEFAULT_LOCALE_ID): EncodingTypeConfigLocalised[] {
    const encodingTypeConfigs: EncodingTypeConfigLocalised[] = Array.from(Object.values(ENCODING_TYPE_CONFIG_MAP), ({ groupId, id, isDecodable, isDetectable }) => {
        const groupLabel = groupId == null ? '' : resolveGroupLabel(groupId, localeId);
        return { id, groupLabel, label: groupLabel ? `${groupLabel} (${id})` : id, isDetectable, isDecodable };
    });
    return encodingTypeConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel, localeId) || left.label.localeCompare(right.label, localeId));
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function resolveGroupLabel(groupId: EncodingGroupId, localeId: LocaleId): string {
    const labels = ENCODING_GROUP_CONFIG_MAP[groupId].label;
    return labels[localeId] ?? labels[DEFAULT_LOCALE_ID] ?? groupId;
}
