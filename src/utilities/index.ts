// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type DurationUnit = 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export type UsageTypeId = 'boolean' | 'decimalNumber' | 'moment' | 'momentTime' | 'string' | 'unknown' | 'wholeNumber';
type StorageUnit = 'byte' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── File Extensions ─ Files that cannot be read as data, or whose format is not read yet. A file picker shows them
// but does not offer them. An extension missing from the list is not a promise that the file can be read: only a
// preview of its content can tell.
const UNSUPPORTED_FILE_EXTENSIONS = new Set(
    Object.values({
        archives: ['7z', 'bz2', 'gz', 'rar', 'tar', 'tgz', 'xz', 'zip'],
        audio: ['aac', 'flac', 'm4a', 'mp3', 'ogg', 'wav'],
        documents: ['doc', 'docx', 'key', 'numbers', 'odp', 'odt', 'pages', 'pdf', 'ppt', 'pptx', 'rtf'],
        images: ['bmp', 'gif', 'heic', 'ico', 'jpeg', 'jpg', 'png', 'psd', 'svg', 'tif', 'tiff', 'webp'],
        programs: ['app', 'bin', 'dll', 'dmg', 'exe', 'iso', 'msi', 'so'],
        unreadDataFormats: ['arrow', 'avro', 'db', 'ods', 'parquet', 'por', 'sav', 'sqlite', 'xls', 'xlsm', 'xlsx', 'xltm', 'xltx'], // Data formats not read yet.
        video: ['avi', 'm4v', 'mkv', 'mov', 'mp4', 'webm', 'wmv']
    }).flat()
);

// ── Locale
const NUMBER_FORMATTER_DEFAULT_LOCALE = 'en';

// ── Units ─ Each unit with its size. The names are 'Intl' unit identifiers, so 'Intl.NumberFormat' supplies the label
// in the requested locale. Durations run largest first and storage smallest first, the order each formatter searches.
const DURATION_UNITS: [DurationUnit, number][] = [
    ['day', 86_400_000],
    ['hour', 3_600_000],
    ['minute', 60_000],
    ['second', 1000],
    ['millisecond', 1]
];
const STORAGE_UNITS: [StorageUnit, number][] = [
    ['byte', 1],
    ['kilobyte', 1024],
    ['megabyte', 1_048_576],
    ['gigabyte', 1_073_741_824],
    ['terabyte', 1_099_511_627_776]
];

// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const LIST_FORMATTER_MAP = new Map<string, Intl.ListFormat>();
const NUMBER_FORMATTER_MAP = new Map<string, Intl.NumberFormat>();

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Number Formatting
export function formatNumberAsDecimalNumber(number?: number, decimalPlaces = 2, minimumFractionDigits = decimalPlaces, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    if (number == null) return '';
    return getNumberFormatter(locale, {
        localeMatcher: 'best fit',
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: Math.min(minimumFractionDigits, decimalPlaces), // 'Intl.NumberFormat' throws a 'RangeError' when the minimum is above the maximum.
        minimumIntegerDigits: 1,
        style: 'decimal',
        useGrouping: true
    }).format(number);
}

export function formatNumberAsWholeNumber(number?: number, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    return formatNumberAsDecimalNumber(number, 0, 0, locale);
}

// Compact notation chooses the unit after rounding, so 999,999 shows as '1M' rather than '1,000K'.
export function formatNumberAsSize(number?: number, decimalPlaces = 1, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    return number == null || !Number.isFinite(number) ? '' : getNumberFormatter(locale, { maximumFractionDigits: decimalPlaces, notation: 'compact' }).format(number);
}

// The unit is chosen after rounding, so 1,048,575 bytes shows as '1 MB' rather than '1,024 KB'.
export function formatNumberAsStorageSize(number?: number, decimalPlaces = 1, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    if (number == null || !Number.isFinite(number)) return '';
    const [unit, size] = STORAGE_UNITS.find(([, unitSize]) => roundNumber(Math.abs(number) / unitSize, unitSize === 1 ? 0 : decimalPlaces) < 1024) ?? [
        'terabyte',
        1_099_511_627_776
    ];
    return getNumberFormatter(locale, {
        maximumFractionDigits: size === 1 ? 0 : decimalPlaces,
        style: 'unit',
        unit,
        unitDisplay: size === 1 ? 'long' : 'short' // The short English label for bytes, 'byte', has no plural.
    }).format(number / size);
}

export function formatNumberAsDuration(number?: number, stopAt: DurationUnit = 'millisecond', locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    if (number == null || !Number.isFinite(number)) return '';

    // Fractions are rounded away before the value is split into units, so the last unit cannot round up to '1,000 ms'.
    let remaining = Math.round(Math.abs(number));

    // Start at the largest unit the value actually fills, so a value below the requested level still reads sensibly
    // rather than as a run of zeroes.
    const startIndex = DURATION_UNITS.findIndex(([, unitSize]) => remaining >= unitSize);
    const firstIndex = startIndex === -1 ? DURATION_UNITS.length - 1 : startIndex;
    const stopIndex = DURATION_UNITS.findIndex(([unit]) => unit === stopAt);

    const durationUnits = DURATION_UNITS.slice(firstIndex, Math.max(stopIndex, firstIndex) + 1);
    const parts: string[] = [];
    for (const [unit, unitSize] of durationUnits) {
        const count = Math.floor(remaining / unitSize);
        if (count === 0 && parts.length > 0) continue;
        remaining -= count * unitSize;
        const signedCount = parts.length === 0 && number < 0 && count > 0 ? -count : count; // Only the first part carries the sign: '-1 min 30 sec'.
        parts.push(getNumberFormatter(locale, { style: 'unit', unit, unitDisplay: 'short' }).format(signedCount));
    }
    return getListFormatter(locale).format(parts);
}

// ── File Paths ─ A path splits into the part before its extension and the extension, and the two always rebuild the
// path. Dots in folder names, the leading dot of a dotfile such as '.gitignore' and a trailing dot do not start an
// extension.
export function extractPathWithoutExtension(itemPath: string): string | undefined {
    if (!itemPath) return undefined;
    const extensionSeparatorIndex = findExtensionSeparatorIndex(itemPath);
    return extensionSeparatorIndex === undefined ? itemPath : itemPath.slice(0, extensionSeparatorIndex);
}

export function extractExtensionFromPath(itemPath: string): string | undefined {
    if (!itemPath) return undefined;
    const extensionSeparatorIndex = findExtensionSeparatorIndex(itemPath);
    return extensionSeparatorIndex === undefined ? undefined : itemPath.slice(extensionSeparatorIndex + 1);
}

// ── Lookup
// Extensions arrive from file names as typed, so 'REPORT.PDF' must resolve the same as 'report.pdf'.
export function isUnsupportedFileExtension(extension?: string): boolean {
    return extension != null && UNSUPPORTED_FILE_EXTENSIONS.has(extension.toLowerCase());
}

export function lookupMimeTypeForExtension(extension?: string): string {
    // Extensions arrive from file names as typed, so 'REPORT.CSV' must resolve the same as 'report.csv'.
    switch (extension?.toLowerCase()) {
        case 'csv':
            return 'text/csv';
        case 'tab':
        case 'tsv':
            return 'text/tab-separated-values';
        case 'xls':
            return 'application/vnd.ms-excel';
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        default:
            return 'application/octet-stream';
    }
}

// ── Data Type Conversion ─ Covers the primitive types of OData v2 and v4.
// See: https://www.odata.org/documentation/odata-version-2-0/overview/ and
// https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_PrimitiveTypes.
export function convertODataTypeIdToUsageTypeId(oDataTypeId: string): UsageTypeId {
    switch (oDataTypeId) {
        case 'Edm.Boolean':
            return 'boolean';
        case 'Edm.Byte':
        case 'Edm.Int16':
        case 'Edm.Int32':
        case 'Edm.Int64':
        case 'Edm.SByte':
            return 'wholeNumber';
        case 'Edm.Decimal':
        case 'Edm.Double':
        case 'Edm.Single':
            return 'decimalNumber';
        case 'Edm.Date':
        case 'Edm.DateTime':
        case 'Edm.DateTimeOffset':
            return 'moment';
        case 'Edm.Time':
        case 'Edm.TimeOfDay':
            return 'momentTime';
        case 'Edm.Guid':
        case 'Edm.String':
            return 'string';
        default:
            return 'unknown'; // 'Edm.Binary', 'Edm.Duration', 'Edm.Stream' and the geography types have no usage type.
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Returns undefined when the last segment of the path has no extension.
function findExtensionSeparatorIndex(itemPath: string): number | undefined {
    const basenameStartIndex = itemPath.lastIndexOf('/') + 1;
    const extensionSeparatorIndex = itemPath.lastIndexOf('.');
    return extensionSeparatorIndex > basenameStartIndex && extensionSeparatorIndex < itemPath.length - 1 ? extensionSeparatorIndex : undefined;
}

// 'Intl' formatters are costly to create, so each one is created once per locale and set of options, then reused.
function getListFormatter(locale: string): Intl.ListFormat {
    let listFormatter = LIST_FORMATTER_MAP.get(locale);
    if (!listFormatter) {
        listFormatter = new Intl.ListFormat(locale, { style: 'narrow', type: 'unit' });
        LIST_FORMATTER_MAP.set(locale, listFormatter);
    }
    return listFormatter;
}

function getNumberFormatter(locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
    const formatterId = `${locale}|${JSON.stringify(options)}`;
    let numberFormatter = NUMBER_FORMATTER_MAP.get(formatterId);
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat(locale, options);
        NUMBER_FORMATTER_MAP.set(formatterId, numberFormatter);
    }
    return numberFormatter;
}

function roundNumber(number: number, decimalPlaces: number): number {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
}

// TODO: Do we need this?
// // export const establishVendorAccessToken = async (item: Item, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
// export const establishVendorAccessToken = async (connectionConfig: ConnectionConfig, settings: ReadSettings, vendorRefreshURI: string): Promise<string> => {
//     let accessToken;
//
//     // If the current dropbox access token expires within 5 minutes then refresh it and return the new one, otherwise return the current one.
//     if (connectionConfig.authorisation[''].expires_at - Date.now() < 300000) {
//         // TODO: Above is WRONG 'item.authorization!['']'. We need to know what authorisation.
//         const headers: HeadersInit = {
//             'Account-Id': settings.accountId || '',
//             Authorization: settings.sessionAccessToken || '',
//             'Connection-Id': connectionConfig.id
//         };
//         const response = await fetch(vendorRefreshURI, { headers });
//         if (!response.ok) {
//             const data = {
//                 body: {
//                     context: 'establishVendorAccessToken',
//                     message: await response.text()
//                 },
//                 statusCode: response.status,
//                 statusText: response.statusText
//             };
//             throw new Error('Unable to establish access token.|' + JSON.stringify(data));
//         }
//         accessToken = await response.text();
//     } else {
//         accessToken = connectionConfig.authorisation[''].access_token; // TODO: This is WRONG 'item.authorization!['']'. We need to know what authorisation.
//     }
//
//     return accessToken;
// };
