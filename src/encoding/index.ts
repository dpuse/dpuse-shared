// ── DPUse Framework
import { DEFAULT_LOCALE_ID, type LocaleId, type LocaleLabel } from '@/locale/label';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

type EncodingGroupId = keyof typeof ENCODING_GROUP_CONFIG_DATA;
type EncodingTypeId = keyof typeof ENCODING_TYPE_CONFIG_DATA;

interface EncodingGroupConfig {
    id: EncodingGroupId;
    label: LocaleLabel;
}

// One per encoding jschardet can detect, keyed by the name its 'detect' reports.
interface EncodingTypeConfig {
    id: EncodingTypeId;
    groupId: EncodingGroupId | null; // Null for encodings that belong to no group, e.g. 'ascii' and 'utf-8'.
    decoderId: string | null; // The name browsers decode it with, from jschardet's own map. Null when browsers cannot.
}
export interface EncodingTypeConfigLocalised {
    id: EncodingTypeId;
    groupLabel: string;
    label: string;
    isDecodable: boolean;
    decoderId: string | null;
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
    ascii: { id: 'ascii', groupId: null, decoderId: 'windows-1252' },
    Big5: { id: 'Big5', groupId: 'chineseTraditional', decoderId: 'big5' },
    cp273: { id: 'cp273', groupId: 'western', decoderId: null },
    cp424: { id: 'cp424', groupId: 'hebrew', decoderId: null },
    cp437: { id: 'cp437', groupId: 'western', decoderId: null },
    cp500: { id: 'cp500', groupId: 'western', decoderId: null },
    cp720: { id: 'cp720', groupId: 'arabic', decoderId: null },
    cp737: { id: 'cp737', groupId: 'greek', decoderId: null },
    cp775: { id: 'cp775', groupId: 'baltic', decoderId: null },
    cp850: { id: 'cp850', groupId: 'western', decoderId: null },
    cp852: { id: 'cp852', groupId: 'centralEuropean', decoderId: null },
    cp856: { id: 'cp856', groupId: 'hebrew', decoderId: null },
    cp857: { id: 'cp857', groupId: 'turkish', decoderId: null },
    cp858: { id: 'cp858', groupId: 'western', decoderId: null },
    cp860: { id: 'cp860', groupId: 'western', decoderId: null },
    cp861: { id: 'cp861', groupId: 'nordic', decoderId: null },
    cp862: { id: 'cp862', groupId: 'hebrew', decoderId: null },
    cp863: { id: 'cp863', groupId: 'western', decoderId: null },
    cp864: { id: 'cp864', groupId: 'arabic', decoderId: null },
    cp865: { id: 'cp865', groupId: 'nordic', decoderId: null },
    cp869: { id: 'cp869', groupId: 'greek', decoderId: null },
    CP874: { id: 'CP874', groupId: 'thai', decoderId: 'windows-874' },
    cp875: { id: 'cp875', groupId: 'greek', decoderId: null },
    CP932: { id: 'CP932', groupId: 'japanese', decoderId: 'shift_jis' },
    CP949: { id: 'CP949', groupId: 'korean', decoderId: 'euc-kr' },
    cp1006: { id: 'cp1006', groupId: 'arabic', decoderId: null },
    cp1026: { id: 'cp1026', groupId: 'turkish', decoderId: null },
    cp1125: { id: 'cp1125', groupId: 'cyrillic', decoderId: null },
    cp1140: { id: 'cp1140', groupId: 'western', decoderId: null },
    cp1258: { id: 'cp1258', groupId: 'vietnamese', decoderId: 'windows-1258' },
    'EUC-JP': { id: 'EUC-JP', groupId: 'japanese', decoderId: 'euc-jp' },
    'EUC-KR': { id: 'EUC-KR', groupId: 'korean', decoderId: 'euc-kr' },
    GB18030: { id: 'GB18030', groupId: 'chineseSimplified', decoderId: 'gb18030' },
    'hp-roman8': { id: 'hp-roman8', groupId: 'western', decoderId: null },
    'HZ-GB-2312': { id: 'HZ-GB-2312', groupId: 'chineseSimplified', decoderId: null },
    IBM855: { id: 'IBM855', groupId: 'cyrillic', decoderId: null },
    IBM866: { id: 'IBM866', groupId: 'cyrillic', decoderId: 'ibm866' },
    'ISO-2022-JP': { id: 'ISO-2022-JP', groupId: 'japanese', decoderId: 'iso-2022-jp' },
    'ISO-2022-KR': { id: 'ISO-2022-KR', groupId: 'korean', decoderId: null },
    'ISO-8859-1': { id: 'ISO-8859-1', groupId: 'western', decoderId: 'windows-1252' },
    'ISO-8859-2': { id: 'ISO-8859-2', groupId: 'centralEuropean', decoderId: 'iso-8859-2' },
    'ISO-8859-5': { id: 'ISO-8859-5', groupId: 'cyrillic', decoderId: 'iso-8859-5' },
    'ISO-8859-6': { id: 'ISO-8859-6', groupId: 'arabic', decoderId: 'iso-8859-6' },
    'ISO-8859-7': { id: 'ISO-8859-7', groupId: 'greek', decoderId: 'iso-8859-7' },
    'ISO-8859-8': { id: 'ISO-8859-8', groupId: 'hebrew', decoderId: 'iso-8859-8-i' },
    'ISO-8859-9': { id: 'ISO-8859-9', groupId: 'turkish', decoderId: 'windows-1254' },
    'ISO-8859-13': { id: 'ISO-8859-13', groupId: 'baltic', decoderId: 'iso-8859-13' },
    iso2022_jp_2004: { id: 'iso2022_jp_2004', groupId: 'japanese', decoderId: null },
    iso2022_jp_ext: { id: 'iso2022_jp_ext', groupId: 'japanese', decoderId: null },
    'iso8859-3': { id: 'iso8859-3', groupId: 'southernEuropean', decoderId: 'iso-8859-3' },
    'iso8859-4': { id: 'iso8859-4', groupId: 'baltic', decoderId: 'iso-8859-4' },
    'iso8859-10': { id: 'iso8859-10', groupId: 'nordic', decoderId: 'iso-8859-10' },
    'iso8859-14': { id: 'iso8859-14', groupId: 'celtic', decoderId: 'iso-8859-14' },
    'iso8859-15': { id: 'iso8859-15', groupId: 'western', decoderId: 'iso-8859-15' },
    'iso8859-16': { id: 'iso8859-16', groupId: 'romanian', decoderId: 'iso-8859-16' },
    Johab: { id: 'Johab', groupId: 'korean', decoderId: null },
    'KOI8-R': { id: 'KOI8-R', groupId: 'cyrillic', decoderId: 'koi8-r' },
    'koi8-t': { id: 'koi8-t', groupId: 'cyrillic', decoderId: null },
    'koi8-u': { id: 'koi8-u', groupId: 'cyrillic', decoderId: 'koi8-u' },
    KZ1048: { id: 'KZ1048', groupId: 'cyrillic', decoderId: null },
    MacCyrillic: { id: 'MacCyrillic', groupId: 'cyrillic', decoderId: 'x-mac-cyrillic' },
    MacGreek: { id: 'MacGreek', groupId: 'greek', decoderId: null },
    MacIceland: { id: 'MacIceland', groupId: 'nordic', decoderId: null },
    MacLatin2: { id: 'MacLatin2', groupId: 'centralEuropean', decoderId: null },
    MacRoman: { id: 'MacRoman', groupId: 'western', decoderId: 'macintosh' },
    MacTurkish: { id: 'MacTurkish', groupId: 'turkish', decoderId: null },
    ptcp154: { id: 'ptcp154', groupId: 'cyrillic', decoderId: null },
    SHIFT_JIS: { id: 'SHIFT_JIS', groupId: 'japanese', decoderId: 'shift_jis' },
    'TIS-620': { id: 'TIS-620', groupId: 'thai', decoderId: 'windows-874' },
    'utf-7': { id: 'utf-7', groupId: 'other', decoderId: null },
    'utf-8': { id: 'utf-8', groupId: null, decoderId: 'utf-8' },
    'UTF-8-SIG': { id: 'UTF-8-SIG', groupId: null, decoderId: 'utf-8' }, // jschardet's map leaves it out, but 'utf-8' skips the byte-order mark.
    'UTF-16': { id: 'UTF-16', groupId: 'unicode16', decoderId: null },
    'utf-16-be': { id: 'utf-16-be', groupId: 'unicode16', decoderId: 'utf-16be' },
    'utf-16-le': { id: 'utf-16-le', groupId: 'unicode16', decoderId: 'utf-16le' },
    'UTF-32': { id: 'UTF-32', groupId: 'unicode32', decoderId: null },
    'utf-32-be': { id: 'utf-32-be', groupId: 'unicode32', decoderId: null },
    'utf-32-le': { id: 'utf-32-le', groupId: 'unicode32', decoderId: null },
    'Windows-1250': { id: 'Windows-1250', groupId: 'centralEuropean', decoderId: 'windows-1250' },
    'Windows-1251': { id: 'Windows-1251', groupId: 'cyrillic', decoderId: 'windows-1251' },
    'Windows-1252': { id: 'Windows-1252', groupId: 'western', decoderId: 'windows-1252' },
    'Windows-1253': { id: 'Windows-1253', groupId: 'greek', decoderId: 'windows-1253' },
    'Windows-1254': { id: 'Windows-1254', groupId: 'turkish', decoderId: 'windows-1254' },
    'Windows-1255': { id: 'Windows-1255', groupId: 'hebrew', decoderId: 'windows-1255' },
    'Windows-1256': { id: 'Windows-1256', groupId: 'arabic', decoderId: 'windows-1256' },
    'Windows-1257': { id: 'Windows-1257', groupId: 'baltic', decoderId: 'windows-1257' }
} as const satisfies Record<string, { id: string; groupId: keyof typeof ENCODING_GROUP_CONFIG_DATA | null; decoderId: string | null }>;

export const ENCODING_GROUP_CONFIG_MAP = ENCODING_GROUP_CONFIG_DATA as Record<EncodingGroupId, EncodingGroupConfig>;
export const ENCODING_TYPE_CONFIG_MAP = ENCODING_TYPE_CONFIG_DATA as Record<EncodingTypeId, EncodingTypeConfig>;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Narrows a name from outside the app, such as one reported by encoding detection, to a known encoding id. Check with
// this once where the name arrives, so everything after it works with 'EncodingTypeId'.
export function isEncodingTypeId(value: string): value is EncodingTypeId {
    return Object.hasOwn(ENCODING_TYPE_CONFIG_MAP, value);
}

// The name to give the browser's 'TextDecoder' for an encoding id. An id browsers cannot decode, or one the table does
// not know, passes through unchanged, so 'TextDecoder' rejects it.
export function resolveDecoderId(encodingId: string): string {
    return isEncodingTypeId(encodingId) ? (ENCODING_TYPE_CONFIG_MAP[encodingId].decoderId ?? encodingId) : encodingId;
}

export function getEncodingTypeConfigs(localeId: LocaleId = DEFAULT_LOCALE_ID): EncodingTypeConfigLocalised[] {
    const encodingTypeConfigs: EncodingTypeConfigLocalised[] = Array.from(Object.values(ENCODING_TYPE_CONFIG_MAP), ({ decoderId, groupId, id }) => {
        const groupLabel = groupId == null ? '' : resolveGroupLabel(groupId, localeId);
        return { id, groupLabel, label: groupLabel ? `${groupLabel} (${id})` : id, isDecodable: decoderId != null, decoderId };
    });
    return encodingTypeConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel, localeId) || left.label.localeCompare(right.label, localeId));
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function resolveGroupLabel(groupId: EncodingGroupId, localeId: LocaleId): string {
    const labels = ENCODING_GROUP_CONFIG_MAP[groupId].label;
    return labels[localeId] ?? labels[DEFAULT_LOCALE_ID] ?? groupId;
}
