// ── DPUse Framework
import { DEFAULT_LOCALE_ID, type LocaleId, type LocaleLabel } from '@/locale/label';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

type EncodingGroupId = keyof typeof ENCODING_GROUP_CONFIG_DATA;
type EncodingTypeId = keyof typeof ENCODING_TYPE_CONFIG_DATA;

interface EncodingGroupConfig {
    id: EncodingGroupId;
    label: LocaleLabel;
}

// One per encoding jschardet can detect, keyed by the name its 'detect' reports, in lower case, plus those the browser's
// 'TextDecoder' or iconv-lite can decode that jschardet never reports, so the user can still choose them.
interface EncodingTypeConfig {
    id: EncodingTypeId;
    groupId: EncodingGroupId | null; // Null for an encoding that belongs to no group, i.e. 'ascii'.
    isDetectable: boolean; // Whether jschardet's 'detect' can report it.
    textDecoderId: string | null; // The name the browser's 'TextDecoder' takes, from jschardet's own map where it detects it. Null when it cannot decode it.
    iconvLiteDecoderId: string | null; // The name iconv-lite takes. Null when it cannot decode it. Nothing decodes with iconv-lite yet.
}
export interface EncodingTypeConfigLocalised {
    id: EncodingTypeId;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
    textDecoderId: string | null;
    iconvLiteDecoderId: string | null;
}

export interface EncodingDetectionConfig {
    id: EncodingTypeId;
    confidenceLevel: number | undefined;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const ENCODING_GROUP_CONFIG_DATA = {
    arabic: { id: 'arabic', label: { en: 'Arabic', es: 'Árabe' } },
    armenian: { id: 'armenian', label: { en: 'Armenian', es: 'Armenio' } },
    baltic: { id: 'baltic', label: { en: 'Baltic', es: 'Báltico' } },
    celtic: { id: 'celtic', label: { en: 'Celtic', es: 'Celta' } },
    centralEuropean: { id: 'centralEuropean', label: { en: 'Central European', es: 'Centroeuropeo' } },
    chineseSimplified: { id: 'chineseSimplified', label: { en: 'Chinese Simplified', es: 'Chino simplificado' } },
    chineseTraditional: { id: 'chineseTraditional', label: { en: 'Chinese Traditional', es: 'Chino tradicional' } },
    cyrillic: { id: 'cyrillic', label: { en: 'Cyrillic', es: 'Cirílico' } },
    georgian: { id: 'georgian', label: { en: 'Georgian', es: 'Georgiano' } },
    greek: { id: 'greek', label: { en: 'Greek', es: 'Griego' } },
    hebrew: { id: 'hebrew', label: { en: 'Hebrew', es: 'Hebreo' } },
    japanese: { id: 'japanese', label: { en: 'Japanese', es: 'Japonés' } },
    korean: { id: 'korean', label: { en: 'Korean', es: 'Coreano' } },
    lao: { id: 'lao', label: { en: 'Lao', es: 'Lao' } },
    nordic: { id: 'nordic', label: { en: 'Nordic', es: 'Nórdico' } },
    southEasternEuropean: { id: 'southEasternEuropean', label: { en: 'South-Eastern European', es: 'Europeo sudoriental' } },
    southernEuropean: { id: 'southernEuropean', label: { en: 'Southern European', es: 'Europeo meridional' } },
    thai: { id: 'thai', label: { en: 'Thai', es: 'Tailandés' } },
    turkish: { id: 'turkish', label: { en: 'Turkish', es: 'Turco' } },
    unicode: { id: 'unicode', label: { en: 'Unicode', es: 'Unicode' } },
    vietnamese: { id: 'vietnamese', label: { en: 'Vietnamese', es: 'Vietnamita' } },
    western: { id: 'western', label: { en: 'Western', es: 'Occidental' } }
} as const satisfies Record<string, { id: string; label: LocaleLabel }>;

const ENCODING_TYPE_CONFIG_DATA = {
    'armscii-8': { id: 'armscii-8', groupId: 'armenian', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'armscii8' },
    ascii: { id: 'ascii', groupId: null, isDetectable: true, textDecoderId: 'windows-1252', iconvLiteDecoderId: 'ascii' },
    big5: { id: 'big5', groupId: 'chineseTraditional', isDetectable: true, textDecoderId: 'big5', iconvLiteDecoderId: 'big5hkscs' },
    'cesu-8': { id: 'cesu-8', groupId: 'unicode', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cesu8' },
    cp273: { id: 'cp273', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp424: { id: 'cp424', groupId: 'hebrew', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp437: { id: 'cp437', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp437' },
    cp500: { id: 'cp500', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp720: { id: 'cp720', groupId: 'arabic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp720' },
    cp737: { id: 'cp737', groupId: 'greek', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp737' },
    cp775: { id: 'cp775', groupId: 'baltic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp775' },
    cp808: { id: 'cp808', groupId: 'cyrillic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp808' },
    cp850: { id: 'cp850', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp850' },
    cp852: { id: 'cp852', groupId: 'centralEuropean', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp852' },
    cp856: { id: 'cp856', groupId: 'hebrew', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp856' },
    cp857: { id: 'cp857', groupId: 'turkish', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp857' },
    cp858: { id: 'cp858', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp858' },
    cp860: { id: 'cp860', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp860' },
    cp861: { id: 'cp861', groupId: 'nordic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp861' },
    cp862: { id: 'cp862', groupId: 'hebrew', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp862' },
    cp863: { id: 'cp863', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp863' },
    cp864: { id: 'cp864', groupId: 'arabic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp864' },
    cp865: { id: 'cp865', groupId: 'nordic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp865' },
    cp869: { id: 'cp869', groupId: 'greek', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp869' },
    cp874: { id: 'cp874', groupId: 'thai', isDetectable: true, textDecoderId: 'windows-874', iconvLiteDecoderId: 'windows874' },
    cp875: { id: 'cp875', groupId: 'greek', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp922: { id: 'cp922', groupId: 'baltic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp922' },
    cp932: { id: 'cp932', groupId: 'japanese', isDetectable: true, textDecoderId: 'shift_jis', iconvLiteDecoderId: 'shiftjis' },
    cp936: { id: 'cp936', groupId: 'chineseSimplified', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp936' },
    cp949: { id: 'cp949', groupId: 'korean', isDetectable: true, textDecoderId: 'euc-kr', iconvLiteDecoderId: 'cp949' },
    cp950: { id: 'cp950', groupId: 'chineseTraditional', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp950' },
    cp1006: { id: 'cp1006', groupId: 'arabic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp1026: { id: 'cp1026', groupId: 'turkish', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp1046: { id: 'cp1046', groupId: 'arabic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1046' },
    cp1124: { id: 'cp1124', groupId: 'cyrillic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1124' },
    cp1125: { id: 'cp1125', groupId: 'cyrillic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp1125' },
    cp1129: { id: 'cp1129', groupId: 'vietnamese', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1129' },
    cp1133: { id: 'cp1133', groupId: 'lao', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1133' },
    cp1140: { id: 'cp1140', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    cp1161: { id: 'cp1161', groupId: 'thai', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1161' },
    cp1162: { id: 'cp1162', groupId: 'thai', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1162' },
    cp1163: { id: 'cp1163', groupId: 'vietnamese', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'cp1163' },
    cp1258: { id: 'cp1258', groupId: 'vietnamese', isDetectable: true, textDecoderId: 'windows-1258', iconvLiteDecoderId: 'windows1258' },
    'euc-jp': { id: 'euc-jp', groupId: 'japanese', isDetectable: true, textDecoderId: 'euc-jp', iconvLiteDecoderId: 'eucjp' },
    'euc-kr': { id: 'euc-kr', groupId: 'korean', isDetectable: true, textDecoderId: 'euc-kr', iconvLiteDecoderId: 'cp949' },
    gb18030: { id: 'gb18030', groupId: 'chineseSimplified', isDetectable: true, textDecoderId: 'gb18030', iconvLiteDecoderId: 'gb18030' },
    gbk: { id: 'gbk', groupId: 'chineseSimplified', isDetectable: false, textDecoderId: 'gbk', iconvLiteDecoderId: 'gbk' }, // 'gb18030' reads the same files, as it extends 'gbk'.
    'georgian-academy': { id: 'georgian-academy', groupId: 'georgian', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'georgianacademy' },
    'georgian-ps': { id: 'georgian-ps', groupId: 'georgian', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'georgianps' },
    'hp-roman8': { id: 'hp-roman8', groupId: 'western', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'hproman8' },
    'hz-gb-2312': { id: 'hz-gb-2312', groupId: 'chineseSimplified', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    ibm855: { id: 'ibm855', groupId: 'cyrillic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'cp855' },
    ibm866: { id: 'ibm866', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'ibm866', iconvLiteDecoderId: 'cp866' },
    'iso-2022-jp': { id: 'iso-2022-jp', groupId: 'japanese', isDetectable: true, textDecoderId: 'iso-2022-jp', iconvLiteDecoderId: null },
    'iso-2022-kr': { id: 'iso-2022-kr', groupId: 'korean', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    'iso-8859-1': { id: 'iso-8859-1', groupId: 'western', isDetectable: true, textDecoderId: 'windows-1252', iconvLiteDecoderId: 'iso88591' },
    'iso-8859-2': { id: 'iso-8859-2', groupId: 'centralEuropean', isDetectable: true, textDecoderId: 'iso-8859-2', iconvLiteDecoderId: 'iso88592' },
    'iso-8859-5': { id: 'iso-8859-5', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'iso-8859-5', iconvLiteDecoderId: 'iso88595' },
    'iso-8859-6': { id: 'iso-8859-6', groupId: 'arabic', isDetectable: true, textDecoderId: 'iso-8859-6', iconvLiteDecoderId: 'iso88596' },
    'iso-8859-7': { id: 'iso-8859-7', groupId: 'greek', isDetectable: true, textDecoderId: 'iso-8859-7', iconvLiteDecoderId: 'iso88597' },
    'iso-8859-8': { id: 'iso-8859-8', groupId: 'hebrew', isDetectable: true, textDecoderId: 'iso-8859-8-i', iconvLiteDecoderId: 'iso88598' },
    'iso-8859-9': { id: 'iso-8859-9', groupId: 'turkish', isDetectable: true, textDecoderId: 'windows-1254', iconvLiteDecoderId: 'iso88599' },
    'iso-8859-11': { id: 'iso-8859-11', groupId: 'thai', isDetectable: false, textDecoderId: 'windows-874', iconvLiteDecoderId: 'iso885911' },
    'iso-8859-13': { id: 'iso-8859-13', groupId: 'baltic', isDetectable: true, textDecoderId: 'iso-8859-13', iconvLiteDecoderId: 'iso885913' },
    'iso646-cn': { id: 'iso646-cn', groupId: 'chineseSimplified', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'iso646cn' },
    'iso646-jp': { id: 'iso646-jp', groupId: 'japanese', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'iso646jp' },
    iso2022_jp_2004: { id: 'iso2022_jp_2004', groupId: 'japanese', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    iso2022_jp_ext: { id: 'iso2022_jp_ext', groupId: 'japanese', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    'iso8859-3': { id: 'iso8859-3', groupId: 'southernEuropean', isDetectable: true, textDecoderId: 'iso-8859-3', iconvLiteDecoderId: 'iso88593' },
    'iso8859-4': { id: 'iso8859-4', groupId: 'baltic', isDetectable: true, textDecoderId: 'iso-8859-4', iconvLiteDecoderId: 'iso88594' },
    'iso8859-10': { id: 'iso8859-10', groupId: 'nordic', isDetectable: true, textDecoderId: 'iso-8859-10', iconvLiteDecoderId: 'iso885910' },
    'iso8859-14': { id: 'iso8859-14', groupId: 'celtic', isDetectable: true, textDecoderId: 'iso-8859-14', iconvLiteDecoderId: 'iso885914' },
    'iso8859-15': { id: 'iso8859-15', groupId: 'western', isDetectable: true, textDecoderId: 'iso-8859-15', iconvLiteDecoderId: 'iso885915' },
    'iso8859-16': { id: 'iso8859-16', groupId: 'southEasternEuropean', isDetectable: true, textDecoderId: 'iso-8859-16', iconvLiteDecoderId: 'iso885916' },
    johab: { id: 'johab', groupId: 'korean', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: null },
    'koi8-r': { id: 'koi8-r', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'koi8-r', iconvLiteDecoderId: 'koi8r' },
    'koi8-ru': { id: 'koi8-ru', groupId: 'cyrillic', isDetectable: false, textDecoderId: 'koi8-u', iconvLiteDecoderId: 'koi8ru' },
    'koi8-t': { id: 'koi8-t', groupId: 'cyrillic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'koi8t' },
    'koi8-u': { id: 'koi8-u', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'koi8-u', iconvLiteDecoderId: 'koi8u' },
    kz1048: { id: 'kz1048', groupId: 'cyrillic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'rk1048' },
    maccroatian: { id: 'maccroatian', groupId: 'centralEuropean', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'maccroatian' },
    maccyrillic: { id: 'maccyrillic', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'x-mac-cyrillic', iconvLiteDecoderId: 'maccyrillic' },
    macgreek: { id: 'macgreek', groupId: 'greek', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'macgreek' },
    maciceland: { id: 'maciceland', groupId: 'nordic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'maciceland' },
    maclatin2: { id: 'maclatin2', groupId: 'centralEuropean', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'maccenteuro' },
    macroman: { id: 'macroman', groupId: 'western', isDetectable: true, textDecoderId: 'macintosh', iconvLiteDecoderId: 'macroman' },
    macromania: { id: 'macromania', groupId: 'southEasternEuropean', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'macromania' },
    macthai: { id: 'macthai', groupId: 'thai', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'macthai' },
    macturkish: { id: 'macturkish', groupId: 'turkish', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'macturkish' },
    macukraine: { id: 'macukraine', groupId: 'cyrillic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'macukraine' },
    mik: { id: 'mik', groupId: 'cyrillic', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'mik' },
    ptcp154: { id: 'ptcp154', groupId: 'cyrillic', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'pt154' },
    shift_jis: { id: 'shift_jis', groupId: 'japanese', isDetectable: true, textDecoderId: 'shift_jis', iconvLiteDecoderId: 'shiftjis' },
    tcvn: { id: 'tcvn', groupId: 'vietnamese', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'tcvn' },
    'tis-620': { id: 'tis-620', groupId: 'thai', isDetectable: true, textDecoderId: 'windows-874', iconvLiteDecoderId: 'tis620' },
    'utf-7': { id: 'utf-7', groupId: 'unicode', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'utf7' },
    'utf-8': { id: 'utf-8', groupId: 'unicode', isDetectable: true, textDecoderId: 'utf-8', iconvLiteDecoderId: 'utf-8' },
    'utf-8-sig': { id: 'utf-8-sig', groupId: 'unicode', isDetectable: true, textDecoderId: 'utf-8', iconvLiteDecoderId: 'utf-8' }, // jschardet's map leaves it out, but 'utf-8' skips the byte-order mark.
    'utf-16': { id: 'utf-16', groupId: 'unicode', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'utf16' },
    'utf-16-be': { id: 'utf-16-be', groupId: 'unicode', isDetectable: true, textDecoderId: 'utf-16be', iconvLiteDecoderId: 'utf16be' },
    'utf-16-le': { id: 'utf-16-le', groupId: 'unicode', isDetectable: true, textDecoderId: 'utf-16le', iconvLiteDecoderId: 'utf16le' },
    'utf-32': { id: 'utf-32', groupId: 'unicode', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'utf32' },
    'utf-32-be': { id: 'utf-32-be', groupId: 'unicode', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'utf32be' },
    'utf-32-le': { id: 'utf-32-le', groupId: 'unicode', isDetectable: true, textDecoderId: null, iconvLiteDecoderId: 'utf32le' },
    viscii: { id: 'viscii', groupId: 'vietnamese', isDetectable: false, textDecoderId: null, iconvLiteDecoderId: 'viscii' },
    'windows-1250': { id: 'windows-1250', groupId: 'centralEuropean', isDetectable: true, textDecoderId: 'windows-1250', iconvLiteDecoderId: 'windows1250' },
    'windows-1251': { id: 'windows-1251', groupId: 'cyrillic', isDetectable: true, textDecoderId: 'windows-1251', iconvLiteDecoderId: 'windows1251' },
    'windows-1252': { id: 'windows-1252', groupId: 'western', isDetectable: true, textDecoderId: 'windows-1252', iconvLiteDecoderId: 'windows1252' },
    'windows-1253': { id: 'windows-1253', groupId: 'greek', isDetectable: true, textDecoderId: 'windows-1253', iconvLiteDecoderId: 'windows1253' },
    'windows-1254': { id: 'windows-1254', groupId: 'turkish', isDetectable: true, textDecoderId: 'windows-1254', iconvLiteDecoderId: 'windows1254' },
    'windows-1255': { id: 'windows-1255', groupId: 'hebrew', isDetectable: true, textDecoderId: 'windows-1255', iconvLiteDecoderId: 'windows1255' },
    'windows-1256': { id: 'windows-1256', groupId: 'arabic', isDetectable: true, textDecoderId: 'windows-1256', iconvLiteDecoderId: 'windows1256' },
    'windows-1257': { id: 'windows-1257', groupId: 'baltic', isDetectable: true, textDecoderId: 'windows-1257', iconvLiteDecoderId: 'windows1257' }
} as const satisfies Record<string, { id: string; groupId: keyof typeof ENCODING_GROUP_CONFIG_DATA | null; isDetectable: boolean; textDecoderId: string | null; iconvLiteDecoderId: string | null }>;

export const ENCODING_GROUP_CONFIG_MAP = ENCODING_GROUP_CONFIG_DATA as Record<EncodingGroupId, EncodingGroupConfig>;
export const ENCODING_TYPE_CONFIG_MAP = ENCODING_TYPE_CONFIG_DATA as Record<EncodingTypeId, EncodingTypeConfig>;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Narrows a name from outside the app, such as one reported by encoding detection and lower-cased, to a known encoding
// id. Check with this once where the name arrives, so everything after it works with 'EncodingTypeId'.
export function isEncodingTypeId(value: string): value is EncodingTypeId {
    return Object.hasOwn(ENCODING_TYPE_CONFIG_MAP, value);
}

// The name to give the browser's 'TextDecoder' for an encoding id. An id browsers cannot decode, or one the table does
// not know, passes through unchanged, so 'TextDecoder' rejects it.
export function resolveDecoderId(encodingId: string): string {
    return isEncodingTypeId(encodingId) ? (ENCODING_TYPE_CONFIG_MAP[encodingId].textDecoderId ?? encodingId) : encodingId;
}

export function getEncodingTypeConfigs(localeId: LocaleId = DEFAULT_LOCALE_ID): EncodingTypeConfigLocalised[] {
    const encodingTypeConfigs: EncodingTypeConfigLocalised[] = Array.from(Object.values(ENCODING_TYPE_CONFIG_MAP), ({ groupId, iconvLiteDecoderId, id, isDetectable, textDecoderId }) => {
        const groupLabel = groupId == null ? '' : resolveGroupLabel(groupId, localeId);
        return { id, groupLabel, label: groupLabel ? `${groupLabel} (${id})` : id, isDetectable, isDecodable: textDecoderId != null, textDecoderId, iconvLiteDecoderId };
    });
    return encodingTypeConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel, localeId) || left.id.localeCompare(right.id, localeId, { numeric: true })); // Ids, not labels, so 'utf-16' sorts before 'utf-16-le'.
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function resolveGroupLabel(groupId: EncodingGroupId, localeId: LocaleId): string {
    const labels = ENCODING_GROUP_CONFIG_MAP[groupId].label;
    return labels[localeId] ?? labels[DEFAULT_LOCALE_ID] ?? groupId;
}
