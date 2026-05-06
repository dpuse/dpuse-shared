// Constants ───────────────────────────────────────────────────────────────────────────────────────────────────────────

const NUMBER_FORMATTER_DEFAULT_LOCALE = 'en-US';
const NUMBER_FORMATTER_MAP = new Map<string, Intl.NumberFormat>();

// Actions - Convert ───────────────────────────────────────────────────────────────────────────────────────────────────

// See: https://www.odata.org/documentation/odata-version-2-0/overview/.
export function convertODataTypeIdToUsageTypeId(oDataTypeId: string): string {
    switch (oDataTypeId) {
        case 'Edm.Binary':
            return 'unknown'; // Binary...
        case 'Edm.Boolean':
            return 'boolean';
        case 'Edm.Byte':
            return 'wholeNumber';
        case 'Edm.DateTime':
            return 'moment'; // DateTime...
        case 'Edm.DateTimeOffset':
            return 'moment'; // DateTimeOffset...
        case 'Edm.Decimal':
            return 'decimalNumber';
        case 'Edm.Double':
            return 'decimalNumber';
        case 'Edm.Guid':
            return 'string';
        case 'Edm.Int16':
            return 'wholeNumber';
        case 'Edm.Int32':
            return 'wholeNumber';
        case 'Edm.Int64':
            return 'wholeNumber';
        case 'Edm.SByte':
            return 'wholeNumber';
        case 'Edm.Single':
            return 'decimalNumber';
        case 'Edm.String':
            return 'string';
        case 'Edm.Time':
            return 'momentTime'; // Time...
        default:
            return 'unknown';
    }
}

// Actions - Extract ───────────────────────────────────────────────────────────────────────────────────────────────────

// Extract the path without its final basename extension.
// Dots in parent directories are ignored, and leading dots in the basename
// are treated as part of dotfile names rather than as an extension separator.
export function extractNameFromPath(itemPath: string): string | undefined {
    if (itemPath) {
        const lastSeparatorIndex = itemPath.lastIndexOf('/');
        const basenameStartIndex = lastSeparatorIndex + 1;
        const lastExtensionIndex = itemPath.lastIndexOf('.');
        if (lastExtensionIndex <= basenameStartIndex) return itemPath;
        return lastExtensionIndex === -1 ? itemPath : itemPath.slice(0, Math.max(0, lastExtensionIndex));
    }
    return undefined;
}

// Extract only the final basename extension.
// Returns undefined when the basename has no extension, including dotfiles such
// as .gitignore where the only dot is the leading character of the basename.
export function extractExtensionFromPath(itemPath: string): string | undefined {
    if (itemPath) {
        const lastSeparatorIndex = itemPath.lastIndexOf('/');
        const basenameStartIndex = lastSeparatorIndex + 1;
        const lastExtensionIndex = itemPath.lastIndexOf('.');
        if (lastExtensionIndex <= basenameStartIndex) return undefined;
        if (lastExtensionIndex !== -1) return itemPath.slice(Math.max(0, lastExtensionIndex + 1));
    }
    return undefined;
}

// Actions - Format ────────────────────────────────────────────────────────────────────────────────────────────────────

export function formatNumberAsDecimalNumber(number?: number, decimalPlaces = 2, minimumFractionDigits = decimalPlaces, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    if (number == null) return '';
    const formatterId = `${locale}decimal${decimalPlaces}.${minimumFractionDigits}`;
    let numberFormatter = NUMBER_FORMATTER_MAP.get(formatterId);
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat(locale, {
            localeMatcher: 'best fit',
            maximumFractionDigits: decimalPlaces,
            minimumFractionDigits,
            minimumIntegerDigits: 1,
            style: 'decimal',
            useGrouping: true
        });
        NUMBER_FORMATTER_MAP.set(formatterId, numberFormatter);
    }
    return numberFormatter.format(number);
}

export function formatNumberAsSize(number?: number, decimalPlaces = 1): string {
    if (number == null) return '';
    if (number < 1000) return formatNumberAsWholeNumber(number);
    if (number < 1_000_000) return `${formatNumberAsDecimalNumber(number / 1000, decimalPlaces, 0)}K`;
    if (number < 1_000_000_000) return `${formatNumberAsDecimalNumber(number / 1_000_000, decimalPlaces, 0)}M`;
    if (number < 1_000_000_000_000) return `${formatNumberAsDecimalNumber(number / 1_000_000_000, decimalPlaces, 0)}B`;
    return `${formatNumberAsDecimalNumber(number / 1_000_000_000_000, decimalPlaces, 0)}T`;
}

export function formatNumberAsStorageSize(number?: number, decimalPlaces = 1): string {
    if (number == null) return '';
    if (number === 1) return '1 byte';
    if (number < 1024) return `${formatNumberAsWholeNumber(number)} bytes`;
    if (number < 1_048_576) return `${formatNumberAsDecimalNumber(number / 1024, decimalPlaces, 0)} KB`;
    if (number < 1_073_741_824) return `${formatNumberAsDecimalNumber(number / 1_048_576, decimalPlaces, 0)} MB`;
    if (number < 1_099_511_627_776) return `${formatNumberAsDecimalNumber(number / 1_073_741_824, decimalPlaces, 0)} GB`;
    return `${formatNumberAsDecimalNumber(number / 1_099_511_627_776, decimalPlaces, 0)} TB`;
}

export function formatNumberAsDuration(number?: number): string {
    if (number == null) return '';
    if (number < 1000) return `${formatNumberAsWholeNumber(number)} ms`;
    if (number < 60_000) {
        const secs = Math.floor(number / 1000);
        const ms = Math.floor(number % 1000);
        const secsString = secs === 1 ? '1 sec' : `${formatNumberAsWholeNumber(secs)} secs`;
        if (ms === 0) return secsString;
        return `${secsString} ${formatNumberAsWholeNumber(ms)} ms`;
    }
    if (number < 3_600_000) {
        const mins = Math.floor(number / 60_000);
        const secs = Math.floor((number % 60_000) / 1000);
        const minsString = mins === 1 ? '1 min' : `${formatNumberAsWholeNumber(mins)} mins`;
        if (secs === 0) return minsString;
        const secsString = secs === 1 ? '1 sec' : `${formatNumberAsWholeNumber(secs)} secs`;
        return `${minsString} ${secsString}`;
    }
    if (number < 86_400_000) {
        const hrs = Math.floor(number / 3_600_000);
        const mins = Math.floor((number % 3_600_000) / 60_000);
        const hrsString = hrs === 1 ? '1 hr' : `${formatNumberAsWholeNumber(hrs)} hrs`;
        if (mins === 0) return hrsString;
        const minsString = mins === 1 ? '1 min' : `${formatNumberAsWholeNumber(mins)} mins`;
        return `${hrsString} ${minsString}`;
    }
    const days = Math.floor(number / 86_400_000);
    const hrs = Math.floor((number % 86_400_000) / 3_600_000);
    const daysString = days === 1 ? '1 day' : `${formatNumberAsWholeNumber(days)} days`;
    if (hrs === 0) return daysString;
    const hrsString = hrs === 1 ? '1 hr' : `${formatNumberAsWholeNumber(hrs)} hrs`;
    return `${daysString} ${hrsString}`;
}

export function formatNumberAsWholeNumber(number?: number, locale = NUMBER_FORMATTER_DEFAULT_LOCALE): string {
    if (number == null) return '';
    const formatterId = `${locale}decimal0.0`;
    let numberFormatter = NUMBER_FORMATTER_MAP.get(formatterId);
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat(locale, {
            localeMatcher: 'best fit',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            minimumIntegerDigits: 1,
            style: 'decimal',
            useGrouping: true
        });
        NUMBER_FORMATTER_MAP.set(formatterId, numberFormatter);
    }
    return numberFormatter.format(number);
}

// Actions - Lookup ────────────────────────────────────────────────────────────────────────────────────────────────────

export function lookupMimeTypeForExtension(extension?: string): string {
    switch (extension) {
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

// // export const establishVendorAccessToken = async (item: Item, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
// export const establishVendorAccessToken = async (connectionConfig: ConnectionConfig, settings: ReadSettings, vendorRefreshURI: string): Promise<string> => {
//     let accessToken;

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

//     return accessToken;
// };
