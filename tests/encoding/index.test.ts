import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';

import { ENCODING_GROUP_CONFIG_MAP, ENCODING_TYPE_CONFIG_MAP, getEncodingTypeConfigs, isEncodingTypeId, resolveDecoderId } from '@/encoding';

describe('ENCODING_GROUP_CONFIG_MAP', () => {
    it('keys every group by its own id', () => {
        for (const [key, encodingGroupConfig] of Object.entries(ENCODING_GROUP_CONFIG_MAP)) expect(key).toBe(encodingGroupConfig.id);
    });
});

describe('ENCODING_TYPE_CONFIG_MAP', () => {
    it('keys every encoding by its own id', () => {
        for (const [key, encodingTypeConfig] of Object.entries(ENCODING_TYPE_CONFIG_MAP)) expect(key).toBe(encodingTypeConfig.id);
    });

    // Fails when a jschardet upgrade adds, drops, renames or remaps an encoding, so the table never drifts from it.
    it("holds exactly the encodings jschardet's 'detect' can report, each decoded with the browser name jschardet gives it", async () => {
        const jschardetEncodings = await listJschardetEncodings();

        expect(Object.values(ENCODING_TYPE_CONFIG_MAP).map(({ decoderId, id }) => ({ decoderId, id }))).toEqual(
            expect.arrayContaining(jschardetEncodings.map(({ browserName, name }) => ({ decoderId: browserName, id: name })))
        );
        expect(Object.keys(ENCODING_TYPE_CONFIG_MAP)).toHaveLength(jschardetEncodings.length);
    });

    // Node accepts the same encoding names as browsers, though it decodes a few characters differently (see
    // 'samples.test.ts'). Real browsers are checked by hand with 'npm run check:browsers'.
    it('decodes only with names TextDecoder takes as its own', () => {
        for (const { decoderId } of Object.values(ENCODING_TYPE_CONFIG_MAP)) if (decoderId != null) expect(new TextDecoder(decoderId).encoding).toBe(decoderId);
    });
});

describe('resolveDecoderId', () => {
    it('gives the browser name for an encoding browsers can decode', () => {
        expect(resolveDecoderId('MacRoman')).toBe('macintosh');
        expect(resolveDecoderId('CP932')).toBe('shift_jis');
        expect(resolveDecoderId('utf-8')).toBe('utf-8');
    });

    it('passes through an id browsers cannot decode, or one the table does not know', () => {
        expect(resolveDecoderId('cp437')).toBe('cp437');
        expect(resolveDecoderId('toString')).toBe('toString');
    });
});

describe('isEncodingTypeId', () => {
    it('accepts a known encoding id', () => {
        expect(isEncodingTypeId('Windows-1252')).toBe(true);
    });

    it('rejects an unknown name, including an inherited object property', () => {
        expect(isEncodingTypeId('windows-1252')).toBe(false);
        expect(isEncodingTypeId('toString')).toBe(false);
    });
});

describe('getEncodingTypeConfigs', () => {
    it('returns one config per entry in the encoding map', () => {
        expect(getEncodingTypeConfigs()).toHaveLength(Object.keys(ENCODING_TYPE_CONFIG_MAP).length);
    });

    it('sorts by group label, then by label, leaving the ungrouped encodings first', () => {
        const encodingTypeConfigs = getEncodingTypeConfigs();

        expect(encodingTypeConfigs.slice(0, 4).map((config) => [config.groupLabel, config.label])).toEqual([
            ['', 'ascii'],
            ['', 'utf-8'],
            ['', 'UTF-8-SIG'],
            ['Arabic', 'Arabic (cp1006)']
        ]);

        for (const [index, config] of encodingTypeConfigs.slice(1).entries()) {
            const previousConfig = encodingTypeConfigs[index];
            if (previousConfig == null) throw new TypeError('Expected a preceding config.');
            expect(previousConfig.groupLabel.localeCompare(config.groupLabel, 'en') || previousConfig.label.localeCompare(config.label, 'en')).toBeLessThanOrEqual(0);
        }
    });

    it('marks an encoding decodable exactly when it has a browser name', () => {
        for (const { decoderId, isDecodable } of getEncodingTypeConfigs()) expect(isDecodable).toBe(decoderId != null);
    });

    it('translates the group but never the encoding id', () => {
        const koi8r = getEncodingTypeConfigs('es').find((config) => config.id === 'KOI8-R');

        expect(koi8r).toMatchObject({ groupLabel: 'Cirílico', label: 'Cirílico (KOI8-R)' });
    });

    it('labels an ungrouped encoding with its id alone', () => {
        expect(getEncodingTypeConfigs('es').find((config) => config.id === 'utf-8')).toMatchObject({ groupLabel: '', label: 'utf-8' });
    });
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// jschardet does not export its encoding list, so it is read from its own files: every encoding it knows, under the
// name 'detect' reports (which renames many, e.g. 'cp1252' to 'Windows-1252'), with the browser name it maps it to.
//
// TODO: Stop reading jschardet's internal files once it exports what this needs. In jschardet 4.0.0, this loads three
// build files by absolute path, because the package's 'exports' only opens its main entry: 'registry.js'
// ('REGISTRY', every encoding it knows), 'output_names.js' ('_COMPAT_NAMES', the names 'detect' reports) and
// 'encoding-whatwg-map.js' ('ENCODING_WHATWG_MAP', the browser name for each). If an upgrade moves or renames any of
// them, this test fails loudly at the import or the destructuring rather than passing quietly: update the file and
// variable names here, or switch to a public export if jschardet has added one. Worth asking jschardet
// (https://github.com/aadsm/jschardet) to export its encoding list and names.
//
// TODO: Report to jschardet that its 'detect' ignores the 'compatNames' option. In jschardet 4.0.0, 'DetectOptions'
// declares 'compatNames', but the public 'detect' in 'build/index.js' passes only 'includeEncodings' and
// 'excludeEncodings' to its internal 'detect', so it always returns the renamed display names, e.g. 'Windows-1252'
// rather than 'cp1252'. Found in October 2026. The encoding table's ids are therefore those display names. If a fixed
// version is used with 'compatNames: false', the table's ids, the sample manifests and the previewer would all need
// the internal names instead, so keep relying on the display names unless that change is made everywhere.
async function listJschardetEncodings(): Promise<{ browserName: string | null; name: string }[]> {
    const buildFolderPath = path.dirname(createRequire(import.meta.url).resolve('jschardet'));
    const loadBuildFile = async <T>(fileName: string): Promise<T> => (await import(pathToFileURL(path.join(buildFolderPath, fileName)).href)) as T;
    const { REGISTRY } = await loadBuildFile<{ REGISTRY: Record<string, unknown> }>('registry.js');
    const { _COMPAT_NAMES } = await loadBuildFile<{ _COMPAT_NAMES: Record<string, string> }>('output_names.js');
    const { ENCODING_WHATWG_MAP } = await loadBuildFile<{ ENCODING_WHATWG_MAP: Record<string, string> }>('encoding-whatwg-map.js');
    // The one deliberate difference: jschardet's map leaves out 'utf-8-sig', which browsers decode as 'utf-8'.
    return Object.keys(REGISTRY).map((name) => ({ browserName: name === 'utf-8-sig' ? 'utf-8' : (ENCODING_WHATWG_MAP[name] ?? null), name: _COMPAT_NAMES[name] ?? name }));
}
