import { describe, expect, it } from 'vitest';

import {
    convertODataTypeIdToUsageTypeId,
    extractExtensionFromPath,
    extractPathWithoutExtension,
    formatNumberAsDecimalNumber,
    formatNumberAsDuration,
    formatNumberAsSize,
    formatNumberAsStorageSize,
    formatNumberAsWholeNumber,
    hasMimeTypeForExtension,
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

    it.each([
        ['Edm.Binary', 'unknown'],
        ['Edm.Boolean', 'boolean'],
        ['Edm.Byte', 'wholeNumber'],
        ['Edm.DateTime', 'moment'],
        ['Edm.DateTimeOffset', 'moment'],
        ['Edm.Decimal', 'decimalNumber'],
        ['Edm.Double', 'decimalNumber'],
        ['Edm.Guid', 'string'],
        ['Edm.Int16', 'wholeNumber'],
        ['Edm.Int32', 'wholeNumber'],
        ['Edm.Int64', 'wholeNumber'],
        ['Edm.SByte', 'wholeNumber'],
        ['Edm.Single', 'decimalNumber'],
        ['Edm.String', 'string'],
        ['Edm.Time', 'momentTime']
    ])('maps %s to %s', (oDataTypeId, usageTypeId) => {
        expect(convertODataTypeIdToUsageTypeId(oDataTypeId)).toBe(usageTypeId);
    });

    it.each([
        ['Edm.Date', 'moment'],
        ['Edm.TimeOfDay', 'momentTime'],
        ['Edm.Duration', 'unknown']
    ])('maps OData v4 type %s to %s', (oDataTypeId, usageTypeId) => {
        expect(convertODataTypeIdToUsageTypeId(oDataTypeId)).toBe(usageTypeId);
    });

    it('falls back to unknown for unsupported odata types', () => {
        expect(convertODataTypeIdToUsageTypeId('Edm.Stream')).toBe('unknown');
    });
});

describe('extractPathWithoutExtension', () => {
    it('keeps dots in parent directories when extracting the basename without extension', () => {
        expect(extractPathWithoutExtension('dir.with.dot/file.txt')).toBe('dir.with.dot/file');
    });

    it('treats a leading basename dot as part of a dotfile name', () => {
        expect(extractPathWithoutExtension('.gitignore')).toBe('.gitignore');
        expect(extractPathWithoutExtension('dir/.env')).toBe('dir/.env');
    });

    it('returns the full path when the basename has no extension', () => {
        expect(extractPathWithoutExtension('dir.with.dot/file')).toBe('dir.with.dot/file');
    });

    it('removes the extension from a simple filename', () => {
        expect(extractPathWithoutExtension('file.txt')).toBe('file');
    });

    it('still extracts an extension from a dotfile with an extra suffix', () => {
        expect(extractPathWithoutExtension('.config.json')).toBe('.config');
    });
});

describe('extractExtensionFromPath', () => {
    it('does not treat a trailing dot as an empty extension', () => {
        expect(extractExtensionFromPath('dir/file.')).toBeUndefined();
        expect(extractPathWithoutExtension('dir/file.')).toBe('dir/file.');
    });

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

    it('lowers a minimum fraction digits above the decimal places instead of throwing', () => {
        expect(formatNumberAsDecimalNumber(1.25, 1, 2)).toBe('1.3');
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
        expect(formatNumberAsSize(1_000_000_000)).toBe('1B');
        expect(formatNumberAsSize(1_000_000_000_000)).toBe('1T');
    });

    it('rounds before choosing the unit', () => {
        expect(formatNumberAsSize(999_999)).toBe('1M');
    });

    it('formats negative values and follows the locale', () => {
        expect(formatNumberAsSize(-5000)).toBe('-5K');
        expect(formatNumberAsSize(1_500_000, 1, 'es')).toBe('1,5\u{A0}M');
    });

    it('returns an empty string for nullish and non-finite values', () => {
        expect(formatNumberAsSize()).toBe('');
        expect(formatNumberAsSize(NaN)).toBe('');
        expect(formatNumberAsSize(Infinity)).toBe('');
    });
});

describe('formatNumberAsStorageSize', () => {
    it('handles singular and plural bytes', () => {
        expect(formatNumberAsStorageSize(1)).toBe('1 byte');
        expect(formatNumberAsStorageSize(1023)).toBe('1,023 bytes');
    });

    it('switches to storage units at binary thresholds', () => {
        expect(formatNumberAsStorageSize(1024)).toBe('1 kB');
        expect(formatNumberAsStorageSize(1536)).toBe('1.5 kB');
        expect(formatNumberAsStorageSize(1_048_576)).toBe('1 MB');
        expect(formatNumberAsStorageSize(1_073_741_824)).toBe('1 GB');
        expect(formatNumberAsStorageSize(1_099_511_627_776)).toBe('1 TB');
    });

    it('rounds before choosing the unit', () => {
        expect(formatNumberAsStorageSize(1023.9)).toBe('1 kB');
        expect(formatNumberAsStorageSize(1_048_575)).toBe('1 MB');
    });

    it('returns an empty string for nullish and non-finite values', () => {
        expect(formatNumberAsStorageSize()).toBe('');
        expect(formatNumberAsStorageSize(NaN)).toBe('');
    });
});

describe('formatNumberAsDuration', () => {
    it('returns an empty string for nullish and non-finite values', () => {
        expect(formatNumberAsDuration()).toBe('');
        expect(formatNumberAsDuration(NaN)).toBe('');
        expect(formatNumberAsDuration(Infinity)).toBe('');
    });

    it('rounds to whole milliseconds before splitting into units', () => {
        expect(formatNumberAsDuration(999.6)).toBe('1 sec');
        expect(formatNumberAsDuration(59_999.6)).toBe('1 min');
        expect(formatNumberAsDuration(0.4)).toBe('0 ms');
    });

    it('puts the sign of a negative duration on the first part only', () => {
        expect(formatNumberAsDuration(-90_000)).toBe('-1 min 30 sec');
    });

    it('follows the locale', () => {
        expect(formatNumberAsDuration(5_400_000, 'millisecond', 'es')).toBe('1 h 30 min');
    });

    it('stops at the requested level, dropping the finer units', () => {
        expect(formatNumberAsDuration(90_500, 'second')).toBe('1 min 30 sec'); // Default would add '500 ms'.
        expect(formatNumberAsDuration(5_400_000, 'minute')).toBe('1 hr 30 min');
        expect(formatNumberAsDuration(108_000_000, 'hour')).toBe('1 day 6 hr');
        expect(formatNumberAsDuration(108_000_000, 'day')).toBe('1 day');
    });

    it('still picks a sensible single unit for values below the requested level', () => {
        expect(formatNumberAsDuration(5000, 'day')).toBe('5 sec');
        expect(formatNumberAsDuration(500, 'day')).toBe('500 ms');
    });

    it('formats durations across unit boundaries', () => {
        expect(formatNumberAsDuration(999)).toBe('999 ms');
        expect(formatNumberAsDuration(1000)).toBe('1 sec');
        expect(formatNumberAsDuration(1500)).toBe('1 sec 500 ms');
        expect(formatNumberAsDuration(60_000)).toBe('1 min');
        expect(formatNumberAsDuration(90_000)).toBe('1 min 30 sec');
        expect(formatNumberAsDuration(3_600_000)).toBe('1 hr');
        expect(formatNumberAsDuration(5_400_000)).toBe('1 hr 30 min');
        expect(formatNumberAsDuration(86_400_000)).toBe('1 day');
        expect(formatNumberAsDuration(108_000_000)).toBe('1 day 6 hr');
    });
});

describe('lookupMimeTypeForExtension', () => {
    it('returns known mime types for supported extensions', () => {
        expect(lookupMimeTypeForExtension('tab')).toBe('text/tab-separated-values');
        expect(lookupMimeTypeForExtension('xls')).toBe('application/vnd.ms-excel');
        expect(lookupMimeTypeForExtension('csv')).toBe('text/csv');
        expect(lookupMimeTypeForExtension('tsv')).toBe('text/tab-separated-values');
        expect(lookupMimeTypeForExtension('xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        expect(lookupMimeTypeForExtension('json')).toBe('application/json');
        expect(lookupMimeTypeForExtension('md')).toBe('text/markdown');
        expect(lookupMimeTypeForExtension('txt')).toBe('text/plain');
        expect(lookupMimeTypeForExtension('xml')).toBe('application/xml');
    });

    it('returns mime types for data formats not read yet', () => {
        expect(lookupMimeTypeForExtension('arrow')).toBe('application/vnd.apache.arrow.file');
        expect(lookupMimeTypeForExtension('jsonl')).toBe('application/jsonl');
        expect(lookupMimeTypeForExtension('ods')).toBe('application/vnd.oasis.opendocument.spreadsheet');
        expect(lookupMimeTypeForExtension('parquet')).toBe('application/vnd.apache.parquet');
        expect(lookupMimeTypeForExtension('sqlite')).toBe('application/vnd.sqlite3');
        expect(lookupMimeTypeForExtension('xlsm')).toBe('application/vnd.ms-excel.sheet.macroEnabled.12');
    });

    it('ignores the case of the extension', () => {
        expect(lookupMimeTypeForExtension('CSV')).toBe('text/csv');
        expect(lookupMimeTypeForExtension('XlSx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });

    it('falls back to octet-stream for unsupported and missing extensions', () => {
        expect(lookupMimeTypeForExtension('pdf')).toBe('application/octet-stream');
        expect(lookupMimeTypeForExtension()).toBe('application/octet-stream');
    });
});

describe('hasMimeTypeForExtension', () => {
    it('tells a listed extension, in any case, from one that falls back to octet-stream', () => {
        expect(hasMimeTypeForExtension('CSV')).toBe(true);
        expect(hasMimeTypeForExtension('bin')).toBe(true);
        expect(hasMimeTypeForExtension('pdf')).toBe(false);
        expect(hasMimeTypeForExtension('constructor')).toBe(false);
        expect(hasMimeTypeForExtension()).toBe(false);
    });
});
