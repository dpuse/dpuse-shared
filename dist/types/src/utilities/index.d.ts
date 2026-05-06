export declare function convertODataTypeIdToUsageTypeId(oDataTypeId: string): string;
export declare function extractNameFromPath(itemPath: string): string | undefined;
export declare function extractExtensionFromPath(itemPath: string): string | undefined;
export declare function formatNumberAsDecimalNumber(number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string): string;
export declare function formatNumberAsSize(number?: number, decimalPlaces?: number): string;
export declare function formatNumberAsStorageSize(number?: number, decimalPlaces?: number): string;
export declare function formatNumberAsDuration(number?: number): string;
export declare function formatNumberAsWholeNumber(number?: number, locale?: string): string;
export declare function lookupMimeTypeForExtension(extension?: string): string;
