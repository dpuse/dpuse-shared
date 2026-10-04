import { createRequire } from 'node:module';
import type { Context, Recogniser } from 'chardet/lib/encoding';
import { describe, expect, it } from 'vitest';

import { ENCODING_GROUP_CONFIG_MAP, ENCODING_TYPE_CONFIG_MAP, getEncodingTypeConfigs, isEncodingTypeId } from '@/encoding';

describe('ENCODING_GROUP_CONFIG_MAP', () => {
    it('keys every group by its own id', () => {
        for (const [key, encodingGroupConfig] of Object.entries(ENCODING_GROUP_CONFIG_MAP)) expect(key).toBe(encodingGroupConfig.id);
    });
});

describe('ENCODING_TYPE_CONFIG_MAP', () => {
    it('keys every encoding by its own id', () => {
        for (const [key, encodingTypeConfig] of Object.entries(ENCODING_TYPE_CONFIG_MAP)) expect(key).toBe(encodingTypeConfig.id);
    });

    // Node follows the same Encoding Standard as browsers, so this catches a wrong flag either way. Real browsers are
    // checked by hand with 'npm run check:browsers'.
    it('marks an encoding decodable exactly when TextDecoder accepts it', () => {
        for (const { id, isDecodable } of Object.values(ENCODING_TYPE_CONFIG_MAP)) expect(isAcceptedByTextDecoder(id), id).toBe(isDecodable);
    });

    it('names the encoding TextDecoder actually uses, only where it differs from the id', () => {
        for (const { decoderId, id, isDecodable } of Object.values(ENCODING_TYPE_CONFIG_MAP)) {
            if (isDecodable) expect(new TextDecoder(id).encoding).toBe(decoderId ?? id);
            else expect(decoderId).toBeNull();
        }
    });

    // Fails when a chardet upgrade adds, drops or renames a detector, so the detectable flags never drift from it.
    it('marks an encoding detectable exactly when chardet can report it', () => {
        const detectableIds = Object.values(ENCODING_TYPE_CONFIG_MAP)
            .filter(({ isDetectable }) => isDetectable)
            .map(({ id }) => id);

        expect(listChardetEncodingNames().toSorted(compareText)).toEqual(detectableIds.toSorted(compareText));
    });
});

describe('isEncodingTypeId', () => {
    it('accepts a known encoding id', () => {
        expect(isEncodingTypeId('windows-1252')).toBe(true);
    });

    it('rejects an unknown name, including an inherited object property', () => {
        expect(isEncodingTypeId('utf16')).toBe(false);
        expect(isEncodingTypeId('toString')).toBe(false);
    });
});

describe('getEncodingTypeConfigs', () => {
    it('returns one config per entry in the encoding map', () => {
        expect(getEncodingTypeConfigs()).toHaveLength(Object.keys(ENCODING_TYPE_CONFIG_MAP).length);
    });

    it('sorts by group label, then by label, leaving the ungrouped encodings first', () => {
        const encodingTypeConfigs = getEncodingTypeConfigs();

        expect(encodingTypeConfigs.slice(0, 3).map((config) => [config.groupLabel, config.label])).toEqual([
            ['', 'ascii'],
            ['', 'utf-8'],
            ['Arabic', 'Arabic (iso-8859-6)']
        ]);

        for (const [index, config] of encodingTypeConfigs.slice(1).entries()) {
            const previousConfig = encodingTypeConfigs[index];
            if (previousConfig == null) throw new TypeError('Expected a preceding config.');
            expect(previousConfig.groupLabel.localeCompare(config.groupLabel, 'en') || previousConfig.label.localeCompare(config.label, 'en')).toBeLessThanOrEqual(0);
        }
    });

    it('translates the group but never the encoding id', () => {
        const koi8r = getEncodingTypeConfigs('es').find((config) => config.id === 'koi8-r');

        expect(koi8r).toMatchObject({ groupLabel: 'Cirílico', label: 'Cirílico (koi8-r)' });
    });

    it('labels an ungrouped encoding with its id alone', () => {
        expect(getEncodingTypeConfigs('es').find((config) => config.id === 'utf-8')).toMatchObject({ groupLabel: '', label: 'utf-8' });
    });
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function compareText(left: string, right: string): number {
    return left.localeCompare(right);
}

function isAcceptedByTextDecoder(id: string): boolean {
    try {
        new TextDecoder(id);
        return true;
    } catch {
        return false;
    }
}

// chardet does not export its detectors, so they are loaded from its six detector files. 'require' rather than
// 'import', because Vitest unwraps a file's default export when it holds a single detector. Some detectors report one
// of two names, depending on whether the bytes include the 0x80–0x9F range, so each is asked for both.
function listChardetEncodingNames(): string[] {
    const require = createRequire(import.meta.url);
    const detectorFiles = [
        require('chardet/lib/encoding/ascii'),
        require('chardet/lib/encoding/iso2022'),
        require('chardet/lib/encoding/mbcs'),
        require('chardet/lib/encoding/sbcs'),
        require('chardet/lib/encoding/unicode'),
        require('chardet/lib/encoding/utf8')
    ] as Record<string, new () => Recogniser>[];
    const detectorClasses = detectorFiles.flatMap((detectorFile) => Object.values(detectorFile));
    const names = new Set<string>();
    for (const Detector of detectorClasses) {
        const detector = new Detector();
        for (const hasC1Bytes of [false, true]) names.add(detector.name({ ...EMPTY_CONTEXT, c1Bytes: hasC1Bytes }).toLowerCase());
    }
    return [...names];
}

const EMPTY_CONTEXT: Context = { byteStats: [], c1Bytes: false, inputBytes: new Uint8Array(), inputLen: 0, rawInput: new Uint8Array(), rawLen: 0 };
