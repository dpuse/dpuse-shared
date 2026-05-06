import { describe, expect, it } from 'vitest';

import {
    convertODataTypeIdToUsageTypeId,
    extractExtensionFromPath,
    extractNameFromPath,
    formatNumberAsDecimalNumber,
    formatNumberAsDuration,
    formatNumberAsSize,
    formatNumberAsStorageSize,
    formatNumberAsWholeNumber,
    lookupMimeTypeForExtension
} from '@/utilities';

describe('convertODataTypeIdToUsageTypeId', () => {
    it('maps known odata types to usage types', () => {
        expect(convertODataTypeIdToUsageTypeId('Edm.Boolean')).toBe('boolean');
        expect(convertODataTypeIdToUsageTypeId('Edm.Decimal')).toBe('decimalNumber');
        expect(convertODataTypeIdToUsageTypeId('Edm.Int64')).toBe('wholeNumber');
        expect(convertODataTypeIdToUsageTypeId('Edm.String')).toBe('string');
        expect(convertODataTypeIdToUsageTypeId('Edm.Time')).toBe('momentTime');
    });

    it('falls back to unknown for unsupported odata types', () => {
        expect(convertODataTypeIdToUsageTypeId('Edm.Stream')).toBe('unknown');
    });
});

describe('extractNameFromPath', () => {
    it('keeps dots in parent directories when extracting the basename without extension', () => {
        expect(extractNameFromPath('dir.with.dot/file.txt')).toBe('dir.with.dot/file');
    });

    it('treats a leading basename dot as part of a dotfile name', () => {
        expect(extractNameFromPath('.gitignore')).toBe('.gitignore');
        expect(extractNameFromPath('dir/.env')).toBe('dir/.env');
    });

    it('returns the full path when the basename has no extension', () => {
        expect(extractNameFromPath('dir.with.dot/file')).toBe('dir.with.dot/file');
    });

    it('removes the extension from a simple filename', () => {
        expect(extractNameFromPath('file.txt')).toBe('file');
    });

    it('still extracts an extension from a dotfile with an extra suffix', () => {
        expect(extractNameFromPath('.config.json')).toBe('.config');
    });
});

describe('extractExtensionFromPath', () => {
    it('ignores dots in parent directories when extracting the extension', () => {
        expect(extractExtensionFromPath('dir.with.dot/file.txt')).toBe('txt');
    });

    it('does not treat a leading basename dot as an extension', () => {
        expect(extractExtensionFromPath('.gitignore')).toBeUndefined();
        expect(extractExtensionFromPath('dir/.env')).toBeUndefined();
    });

    it('returns undefined when the basename has no extension', () => {
        expect(extractExtensionFromPath('dir.with.dot/file')).toBeUndefined();
    });

    it('returns the extension from a simple filename', () => {
        expect(extractExtensionFromPath('file.txt')).toBe('txt');
    });

    it('extracts the extension from a dotfile with an extra suffix', () => {
        expect(extractExtensionFromPath('.config.json')).toBe('json');
    });
});

describe('formatNumberAsDecimalNumber', () => {
    it('returns an empty string for nullish values', () => {
        expect(formatNumberAsDecimalNumber()).toBe('');
    });

    it('formats decimal numbers with the default precision', () => {
        expect(formatNumberAsDecimalNumber(1234.567)).toBe('1,234.57');
    });

    it('honors custom minimum and maximum fraction digits', () => {
        expect(formatNumberAsDecimalNumber(1234.5, 3, 3)).toBe('1,234.500');
    });
});

describe('formatNumberAsWholeNumber', () => {
    it('returns an empty string for nullish values', () => {
        expect(formatNumberAsWholeNumber()).toBe('');
    });

    it('rounds and groups whole numbers', () => {
        expect(formatNumberAsWholeNumber(1234.6)).toBe('1,235');
    });
});

describe('formatNumberAsSize', () => {
    it('uses the raw whole number below one thousand', () => {
        expect(formatNumberAsSize(999)).toBe('999');
    });

    it('switches to compact size units at threshold boundaries', () => {
        expect(formatNumberAsSize(1000)).toBe('1K');
        expect(formatNumberAsSize(1500)).toBe('1.5K');
        expect(formatNumberAsSize(1_000_000)).toBe('1M');
    });
});

describe('formatNumberAsStorageSize', () => {
    it('handles singular and plural bytes', () => {
        expect(formatNumberAsStorageSize(1)).toBe('1 byte');
        expect(formatNumberAsStorageSize(1023)).toBe('1,023 bytes');
    });

    it('switches to storage units at binary thresholds', () => {
        expect(formatNumberAsStorageSize(1024)).toBe('1 KB');
        expect(formatNumberAsStorageSize(1536)).toBe('1.5 KB');
        expect(formatNumberAsStorageSize(1_048_576)).toBe('1 MB');
    });
});

describe('formatNumberAsDuration', () => {
    it('returns an empty string for nullish values', () => {
        expect(formatNumberAsDuration()).toBe('');
    });

    it('formats durations across unit boundaries', () => {
        expect(formatNumberAsDuration(999)).toBe('999 ms');
        expect(formatNumberAsDuration(1000)).toBe('1 sec');
        expect(formatNumberAsDuration(1500)).toBe('1 sec 500 ms');
        expect(formatNumberAsDuration(60_000)).toBe('1 min');
        expect(formatNumberAsDuration(90_000)).toBe('1 min 30 secs');
        expect(formatNumberAsDuration(3_600_000)).toBe('1 hr');
        expect(formatNumberAsDuration(5_400_000)).toBe('1 hr 30 mins');
        expect(formatNumberAsDuration(86_400_000)).toBe('1 day');
        expect(formatNumberAsDuration(108_000_000)).toBe('1 day 6 hrs');
    });
});

describe('lookupMimeTypeForExtension', () => {
    it('returns known mime types for supported extensions', () => {
        expect(lookupMimeTypeForExtension('csv')).toBe('text/csv');
        expect(lookupMimeTypeForExtension('tsv')).toBe('text/tab-separated-values');
        expect(lookupMimeTypeForExtension('xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });

    it('falls back to octet-stream for unsupported extensions', () => {
        expect(lookupMimeTypeForExtension('CSV')).toBe('application/octet-stream');
        expect(lookupMimeTypeForExtension('json')).toBe('application/octet-stream');
    });
});
