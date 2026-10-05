/* eslint-disable security/detect-non-literal-fs-filename -- Tests only read files inside their own fixtures folder. */

import { detect } from 'jschardet';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { ENCODING_TYPE_CONFIG_MAP, isEncodingTypeId, resolveDecoderId } from '@/encoding';

// Two sets of sample files, each with a manifest recording what jschardet detects for every file, so a jschardet upgrade
// that detects any of them differently fails here. See 'tests/fixtures/encodings/README.md'.
interface Sample {
    detectedId: string | null;
    encodingId: string; // The table's id, or chardet's name for an encoding the table does not have.
    file: string;
    isSameText: boolean; // Decoding as the detected encoding gives the original text, e.g. 'ISO-8859-1' for 'Windows-1252'.
}

interface ChardetSample extends Sample {
    document: string | null; // The source document a corpus file was generated from. Null for chardet's unit-test files.
    language: string | null;
}

interface ChardetSources {
    languages: { code: string; documents: { id: string; text: string; title: string }[] }[];
}

interface ChardetTestSources {
    documents: { id: string; language: string; text: string; title: string }[];
}

const FIXTURES_URL = new URL('../fixtures/encodings/', import.meta.url);

// Node's 'TextDecoder' lacks the Korean extension characters browsers decode as part of 'euc-kr' (CP949), e.g. '똠'.
// Chrome decodes these files correctly; Node does not yet, so their decoding runs as an expected failure.
const NODE_DECODING_GAPS = new Set(['corpus/generated/CP949/ko/train/workshop.bin']);
const CHARDET_URL = new URL('chardet/', FIXTURES_URL);

// Our own samples: one per encoding in the table, plus a few mostly-ASCII CSV files, the hard case for detection.
const SAMPLES = readJSON(new URL('manifest.json', FIXTURES_URL)) as Sample[];

// chardet's unit-test files and corpus. Corpus files are a source document's title and text, encoded.
const CHARDET_SAMPLES = readJSON(new URL('samples.json', CHARDET_URL)) as ChardetSample[];
const CHARDET_SOURCE_TEXTS = new Map([
    ...(readJSON(new URL('corpus/sources.json', CHARDET_URL)) as ChardetSources).languages.flatMap(({ code, documents }) =>
        documents.map(({ id, text, title }) => [`${code}/${id}`, `${title}\n\n${text}\n`] as const)
    ),
    ...(readJSON(new URL('corpus/test-sources.json', CHARDET_URL)) as ChardetTestSources).documents.map(
        ({ id, language, text, title }) => [`${language}/${id}`, `${title}\n\n${text}\n`] as const
    )
]);

describe('encoding samples', () => {
    it('has a text sample for every encoding in the table, and no other', () => {
        const sampledIds = SAMPLES.filter(({ file }) => file.endsWith('.txt')).map(({ encodingId }) => encodingId);

        expect(sampledIds.toSorted(compareText)).toEqual(Object.keys(ENCODING_TYPE_CONFIG_MAP).toSorted(compareText));
    });

    describeSampleSet(
        SAMPLES,
        (file) => readBytes(new URL(`samples/${file}`, FIXTURES_URL)),
        ({ file }) => readFileSync(new URL(`expected/${file}`, FIXTURES_URL), 'utf-8')
    );
});

describe('chardet samples', () => {
    // A unit-test file has no source text, so decoding as its own encoding stands in for it where browsers can.
    describeSampleSet(
        CHARDET_SAMPLES,
        (file) => readBytes(new URL(file, CHARDET_URL)),
        ({ document, encodingId, file, language }) =>
            document == null ? decodeAs(encodingId, readBytes(new URL(file, CHARDET_URL))) : CHARDET_SOURCE_TEXTS.get(`${String(language)}/${document}`)
    );
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function compareText(left: string, right: string): number {
    return left.localeCompare(right);
}

// The text of an encoding browsers can decode. Undefined for one they cannot, or a missing name.
function decodeAs(encodingId: string | null, bytes: Uint8Array): string | undefined {
    const isDecodable = encodingId != null && isEncodingTypeId(encodingId) && ENCODING_TYPE_CONFIG_MAP[encodingId].decoderId != null;
    return isDecodable ? new TextDecoder(resolveDecoderId(encodingId)).decode(bytes) : undefined;
}

function describeSampleSet<T extends Sample>(samples: T[], readSample: (file: string) => Uint8Array, readOriginalText: (sample: T) => string | undefined): void {
    // Correct means its own encoding, or a sister encoding that decodes it to the same text.
    it.each(samples.filter(({ isSameText }) => isSameText))('detects $file correctly, as $detectedId', ({ detectedId, file }) => {
        expect(detect(readSample(file)).encoding).toBe(detectedId);
    });

    // Known failures, listed as expected failures in every run. One starts failing the run when jschardet gets it
    // right, so it can move to the list above.
    it.fails.each(samples.filter(({ isSameText }) => !isSameText))('detects $file correctly (known failure: jschardet says $detectedId)', ({ encodingId, file }) => {
        expect(detect(readSample(file)).encoding).toBe(encodingId);
    });

    // Only checkable where browsers can decode the encoding and the original text is known.
    const decodableSamples = samples.filter((sample) => readOriginalText(sample) !== undefined && decodeAs(sample.encodingId, readSample(sample.file)) !== undefined);
    const expectDecodesToOriginal = (sample: T): void => {
        expect(decodeAs(sample.encodingId, readSample(sample.file))).toBe(readOriginalText(sample));
    };
    it.each(decodableSamples.filter(({ file }) => !NODE_DECODING_GAPS.has(file)))('decodes $file back to its original text', expectDecodesToOriginal);
    it.fails.each(decodableSamples.filter(({ file }) => NODE_DECODING_GAPS.has(file)))('decodes $file back to its original text (known gap in Node)', expectDecodesToOriginal);

    // Only checkable where browsers can decode the detected encoding and the original text is known.
    const misnamedSamples = samples.filter(
        (sample) => sample.detectedId !== sample.encodingId && readOriginalText(sample) !== undefined && decodeAs(sample.detectedId, readSample(sample.file)) !== undefined
    );
    it.each(misnamedSamples)('records whether decoding $file as $detectedId gives the original text', (sample) => {
        expect(decodeAs(sample.detectedId, readSample(sample.file)) === readOriginalText(sample)).toBe(sample.isSameText);
    });
}

function readBytes(url: URL): Uint8Array {
    return new Uint8Array(readFileSync(url));
}

function readJSON(url: URL): unknown {
    return JSON.parse(readFileSync(url, 'utf-8'));
}

/* eslint-enable security/detect-non-literal-fs-filename -- Ends the fixtures-only file reads. */
