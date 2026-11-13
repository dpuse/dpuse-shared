// ── External Dependencies & Registrations
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── DPUse Framework
import type { AuditObjectContentOptions, ParsedRecordsChunk } from '@/component/module/connector';
import { auditObjectContentWithParser, buildPreviewObjectResult, indexObjectStructureWithParser } from '@/component/module/connector';
import type { FilePreviewResult, ParseStreamSummary, StructureIndex, ToolConfig } from '@/component/module/tool';
import { listObjectStructureEntriesWithParser, retrieveRecordsWithParser } from '@/component/module/connector';
import type { ParsedRecord, ReadingChoiceConfig } from '@/component/dataView';

// ── Mocks ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Tools are loaded from the network, so each test supplies the ones it needs, by the id 'loadTool' takes.
const tools = vi.hoisted((): { byName: Record<string, unknown> } => ({ byName: {} }));
vi.mock('@/component/module/tool', async (importOriginal) => ({
    ...(await importOriginal<object>()),
    loadTool: vi.fn((_toolConfigs: unknown, name: string) => Promise.resolve(tools.byName[name]))
}));

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

function buildToolConfig(id: string, dataFormatIds: ('dtv' | 'json')[]): ToolConfig {
    return {
        description: {},
        firstCreatedAt: null,
        icon: null,
        iconDark: null,
        id,
        label: {},
        lastUpdatedAt: null,
        parser: { dataFormatIds },
        status: null,
        statusId: null,
        typeId: 'tool',
        vendorAccountURL: null,
        vendorDocumentationURL: null,
        vendorHomeURL: null,
        version: '1.0.0'
    };
}

const ADALTAS = buildToolConfig('dpuse-tool-adaltas-csv-parser', ['dtv']);
const RUST = buildToolConfig('dpuse-tool-rust-csv-core-parser', ['dtv']);
const JSON_TOOL = buildToolConfig('dpuse-tool-json-parser', ['json']);
const TOOL_CONFIGS = [RUST, ADALTAS, JSON_TOOL];

// A JSON tool that maps structure, as its config's action names say.
const STRUCTURED_JSON_TOOL: ToolConfig = {
    ...buildToolConfig('dpuse-tool-streamparser-json-parser', ['json']),
    actionNames: ['buildStructureIndex', 'listStructureEntries', 'parseStream', 'parseText']
};
const STRUCTURED_TOOL_CONFIGS = [RUST, STRUCTURED_JSON_TOOL];
const LOCATOR = { endOffset: 20, startOffset: 4, state: undefined };

const RECORDS = [[{ value: 'a', valueWasQuoted: false }]] as ParsedRecord[];

function buildFilePreview(overrides: Partial<FilePreviewResult> = {}): FilePreviewResult {
    return {
        bytes: new Uint8Array(10),
        dataFormatId: 'dtv',
        dataFormatSourceId: 'default',
        decodedEncodingId: 'utf-8',
        encodingCandidates: undefined,
        encodingConfidenceLevel: 100,
        encodingId: 'utf-8',
        encodingSourceId: 'utf8Validation',
        fileTypeConfig: undefined,
        isComplete: true,
        replacementCharacterCount: 0,
        text: 'a,b\n1,2\n',
        ...overrides
    };
}

function buildStream(...pieces: string[]): { cancel: ReturnType<typeof vi.fn>; stream: ReadableStream<Uint8Array> } {
    const cancel = vi.fn();
    const encodedPieces = pieces.map((piece) => new TextEncoder().encode(piece));
    const stream = new ReadableStream<Uint8Array>(
        {
            cancel,
            pull(controller): void {
                const piece = encodedPieces.shift();
                if (piece == null) controller.close();
                else controller.enqueue(piece);
            }
        },
        { highWaterMark: 0 }
    );
    return { cancel, stream };
}

// A parser's read that yields the chunks given, then returns the summary. 'onStop' runs when the read ends, however it
// ends.
async function* buildParsing(summary: ParseStreamSummary, chunks: ParsedRecordsChunk[] = [], onStop?: () => void): AsyncGenerator<ParsedRecordsChunk, ParseStreamSummary> {
    try {
        for (const chunk of chunks) {
            await Promise.resolve(); // Hands each chunk over a turn later, as a parser reading a stream does.
            yield chunk;
        }
        return summary;
    } finally {
        onStop?.();
    }
}

const INFERENCE_SUMMARY = { columnConfigs: [{ id: 'a' }], hasHeaders: true };
const inferDataTypes = vi.fn(() => INFERENCE_SUMMARY);

function buildPreviewInput(filePreview: FilePreviewResult, choices: Partial<ReadingChoiceConfig> = {}, toolConfigs = TOOL_CONFIGS): Parameters<typeof buildPreviewObjectResult>[0] {
    const readingChoiceConfig = { dataFormatId: undefined, encodingId: undefined, hasHeaders: undefined, parserId: undefined, valueDelimiterId: undefined, ...choices };
    return { asAt: 1000, filePreview, inferDataTypes: inferDataTypes as never, readingChoiceConfig, startedAt: performance.now(), toolConfigs };
}

function buildStructureIndex(overrides: Partial<StructureIndex> = {}): StructureIndex {
    const node = { checkpoints: [], childCount: 2, isComplete: true, isTableCandidate: true, keys: ['a'], kindId: 'list' as const, locator: LOCATOR, path: ['rows'] };
    return { byteCount: 10, isComplete: true, issues: [], nodes: [node], suggestedStructurePath: ['rows'], tableCandidateCount: 1, ...overrides };
}

function buildStructuredAuditOptions(overrides: Partial<AuditObjectContentOptions> = {}): AuditObjectContentOptions {
    return {
        byteLimit: 100,
        chunkSize: undefined,
        dataFormatId: 'json',
        encodingId: 'utf-8',
        hasHeaders: true,
        parserId: undefined,
        path: '/a.json',
        stopSignal: new AbortController().signal,
        structurePath: ['rows'],
        supportsTransferableStreams: false,
        valueDelimiterId: undefined,
        ...overrides
    };
}

describe('objectParsing', () => {
    afterEach(() => {
        tools.byName = {};
        inferDataTypes.mockClear();
    });

    describe('buildPreviewObjectResult', () => {
        it('parses the text with the format’s default tool, and infers its types', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ';' });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview()));

            expect(parseText).toHaveBeenCalledOnce();
            expect(parseText).toHaveBeenCalledWith('a,b\n1,2\n', expect.objectContaining({ dataFormatId: 'dtv', isComplete: true }));
            expect(result).toMatchObject({
                contentAuditConfig: { asAt: 1000, byteCount: 10, columns: INFERENCE_SUMMARY.columnConfigs, isComplete: true, recordCount: 0 },
                sampleConfig: { parsedRecords: RECORDS, size: 10, text: 'a,b\n1,2\n' },
                readingConfig: { dataFormatId: 'dtv', hasHeaders: true, parserId: 'dpuse-tool-rust-csv-core-parser', recordDelimiterId: '\n', valueDelimiterId: ';' }
            });
        });

        it.each([
            ['a parsed item', 'dtv', 'a,b\n1,2\n'],
            ['an item no tool reads yet', 'xml', '<a/>']
        ] as const)(
            'keeps in the reading of %s how its format and encoding were found, in the sample how its text was decoded, and the candidates beside them',
            async (_description, dataFormatId, text) => {
                tools.byName['rust-csv-core-parser'] = {
                    parseText: vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' })
                };
                const encodingCandidates = [
                    { confidenceLevel: 0.46, id: 'windows-1251' as const },
                    { confidenceLevel: 0.43, id: 'maccyrillic' as const }
                ];
                const filePreview = buildFilePreview({
                    dataFormatId,
                    dataFormatSourceId: 'jsonSyntax',
                    encodingCandidates,
                    encodingSourceId: 'detection',
                    replacementCharacterCount: 3,
                    text
                });

                const result = await buildPreviewObjectResult(buildPreviewInput(filePreview));

                expect(result.readingConfig).toMatchObject({ dataFormatSourceId: 'jsonSyntax', encodingSourceId: 'detection' });
                expect(result.sampleConfig).toMatchObject({ decodedEncodingId: 'utf-8', replacementCharacterCount: 3 });
                expect(result.encodingCandidates).toEqual(encodingCandidates);
                expect(result.readingConfig).not.toHaveProperty('encodingCandidates');
            }
        );

        it('parses the sample with the tool the user chose, but reports the default tool in the reading', async () => {
            const chosenRecords = [[{ value: 'chosen', valueWasQuoted: false }]] as ParsedRecord[];
            const adaltasParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: chosenRecords, recordDelimiterId: '\n', valueDelimiterId: ',' });
            const rustParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['adaltas-csv-parser'] = { parseText: adaltasParseText };
            tools.byName['rust-csv-core-parser'] = { parseText: rustParseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview(), { parserId: 'dpuse-tool-adaltas-csv-parser' }));

            expect(result.sampleConfig).toMatchObject({ parsedRecords: chosenRecords, parserId: 'dpuse-tool-adaltas-csv-parser' });
            expect(result.readingConfig.parserId).toBe('dpuse-tool-rust-csv-core-parser');
        });

        it('parses the sample in the format the user chose, but reports the detected format in the reading', async () => {
            const jsonParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            const rustParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['json-parser'] = { parseText: jsonParseText };
            tools.byName['rust-csv-core-parser'] = { parseText: rustParseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '[1]' }), { dataFormatId: 'dtv' }));

            expect(rustParseText).toHaveBeenCalledWith('[1]', expect.objectContaining({ dataFormatId: 'dtv' }));
            expect(result.readingConfig).toMatchObject({ dataFormatId: 'json', parserId: 'dpuse-tool-json-parser', valueDelimiterId: undefined });
            expect(result.sampleConfig).toMatchObject({ dataFormatId: 'dtv', parserId: 'dpuse-tool-rust-csv-core-parser', recordDelimiterId: '\n', valueDelimiterId: ',' }); // How the sample was read, for audits and loads.
        });

        it('parses once when nothing that affects parsing was chosen', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['rust-csv-core-parser'] = { parseText };

            await buildPreviewObjectResult(buildPreviewInput(buildFilePreview(), { encodingId: 'windows-1252', hasHeaders: false }));

            expect(parseText).toHaveBeenCalledOnce();
        });

        it('reads delimited text with no delimiter found as comma-delimited, parsing it again with the comma', async () => {
            const parseText = vi
                .fn()
                .mockResolvedValueOnce({ issues: [], parsedRecords: [], recordDelimiterId: '\n', valueDelimiterId: undefined })
                .mockResolvedValueOnce({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ text: 'Ada\nGrace\n' })));

            expect(parseText).toHaveBeenCalledTimes(2);
            expect(parseText.mock.calls[1]?.[1]).toMatchObject({ valueDelimiterIds: [','] });
            expect(result).toMatchObject({ sampleConfig: { parsedRecords: RECORDS }, readingConfig: { valueDelimiterId: ',' } });
        });

        it('parses the sample only with the value delimiter the user chose, but reports the detected delimiter in the reading', async () => {
            const parseText = vi
                .fn()
                .mockResolvedValueOnce({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' })
                .mockResolvedValueOnce({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview(), { valueDelimiterId: '|' }));

            expect(parseText).toHaveBeenCalledTimes(2);
            expect(parseText.mock.calls[1]?.[1]).toMatchObject({ valueDelimiterIds: ['|'] });
            expect(result.readingConfig.valueDelimiterId).toBe(',');
            expect(result.sampleConfig.valueDelimiterId).toBe('|');
        });

        it('leaves the value delimiter undefined for a format that is not delimited, and parses it once', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['json-parser'] = { parseText };

            const { readingConfig } = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '[1]' })));

            expect(parseText).toHaveBeenCalledOnce();
            expect(readingConfig).toMatchObject({ dataFormatId: 'json', parserId: 'dpuse-tool-json-parser', valueDelimiterId: undefined });
        });

        it('passes on whether the preview holds the whole item', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const { contentAuditConfig } = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ isComplete: false })));

            expect(parseText).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ isComplete: false }));
            expect(contentAuditConfig.isComplete).toBe(false);
        });

        it('reports an empty file as delimited text with no rows, read with the defaults', async () => {
            const filePreview = buildFilePreview({ bytes: new Uint8Array(0), dataFormatId: undefined, text: undefined });
            const result = await buildPreviewObjectResult(buildPreviewInput(filePreview));

            expect(result).toMatchObject({
                contentAuditConfig: { byteCount: 0, isComplete: true, recordCount: 0 },
                sampleConfig: { issues: [{ id: 'empty', severityId: 'info' }], parsedRecords: [], size: 0 },
                readingConfig: { dataFormatId: 'dtv', hasHeaders: false, recordDelimiterId: '\n', valueDelimiterId: ',' }
            });
            expect(result.readingConfig.parserId).toBeUndefined();
        });

        it('keeps the text of a format no tool reads yet, without parsing it', async () => {
            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'xml', text: '<a/>' })));

            expect(result).toMatchObject({ sampleConfig: { parsedRecords: [], text: '<a/>' }, readingConfig: { dataFormatId: 'xml', valueDelimiterId: undefined } });
            expect(result.readingConfig.parserId).toBeUndefined();
        });

        it("reports a type the app cannot read as 'unknown'", async () => {
            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: undefined, text: undefined })));

            expect(result).toMatchObject({ sampleConfig: { text: undefined }, readingConfig: { dataFormatId: 'unknown' } });
        });

        it('hands inference the columns and header record the source states, and marks the reading as declared', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['rust-csv-core-parser'] = { parseText };
            const declaredColumnConfigs = [{ dataSubtypeId: undefined, dataTypeId: 'numeric' as const, label: 'Amount', name: 'amount' }];
            const declaredReadingConfig = { dataFormatId: 'dtv' as const, encodingId: 'utf-8', hasHeaders: true, valueDelimiterId: ';' as const };

            const filePreview = buildFilePreview({ encodingId: 'windows-1252' });

            const result = await buildPreviewObjectResult({ ...buildPreviewInput(filePreview, { valueDelimiterId: ',' }), declaredColumnConfigs, declaredReadingConfig });

            expect(inferDataTypes).toHaveBeenCalledWith(RECORDS, true, declaredColumnConfigs);
            expect(parseText).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ valueDelimiterIds: [';'] })); // The source's delimiter, not the one given.
            expect(result.readingConfig).toMatchObject({
                dataFormatSourceId: undefined,
                encodingId: 'utf-8',
                encodingSourceId: undefined,
                isDeclared: true,
                valueDelimiterId: ';'
            });
        });

        it('marks an empty item from a source that says how it is read as declared', async () => {
            const emptyFilePreview = buildFilePreview({ bytes: new Uint8Array(0) });
            const result = await buildPreviewObjectResult({
                ...buildPreviewInput(emptyFilePreview),
                declaredReadingConfig: { dataFormatId: 'dtv', encodingId: 'utf-8', hasHeaders: true, valueDelimiterId: ',' }
            });

            expect(result.readingConfig.isDeclared).toBe(true);
        });

        it('leaves the header record to detection when the source does not state it', async () => {
            tools.byName['rust-csv-core-parser'] = { parseText: vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' }) };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview()));

            expect(inferDataTypes).toHaveBeenCalledWith(RECORDS, undefined, undefined);
            expect(result.readingConfig.isDeclared).toBe(false);
        });
    });

    describe('retrieveRecordsWithParser', () => {
        const RETRIEVE_OPTIONS = { chunkSize: 500, dataFormatId: 'dtv', encodingId: 'utf-8', parserId: 'dpuse-tool-rust-csv-core-parser', path: '/a.csv', valueDelimiterId: ';' };
        const SUMMARY = { byteCount: 1, commentLineCount: 0, emptyLineCount: 0, lineCount: 1, nonUniformRecordCount: 0, recordCount: 1 };

        it('streams the item through the tool that read its preview, then returns its summary', async () => {
            const chunks: ParsedRecordsChunk[] = [
                { records: RECORDS, typeId: 'parsingRecordArray' },
                { records: [...RECORDS, ...RECORDS], typeId: 'parsingRecordArray' }
            ];
            const parseStream = vi.fn(() => buildParsing(SUMMARY, chunks));
            tools.byName['rust-csv-core-parser'] = { parseStream };
            const stream = new ReadableStream<Uint8Array>();
            const signal = new AbortController().signal;

            const retrieval = retrieveRecordsWithParser({ options: RETRIEVE_OPTIONS as never, signal, stream, toolConfigs: TOOL_CONFIGS });
            const receivedChunks: ParsedRecordsChunk[] = [];
            let result = await retrieval.next();
            while (result.done !== true) {
                receivedChunks.push(result.value);
                result = await retrieval.next();
            }

            expect(receivedChunks).toEqual(chunks);
            expect(result.value).toEqual({ recordCount: 1 }); // The parser's other counts are for an audit.
            expect(parseStream).toHaveBeenCalledWith(stream, { abortSignal: signal, chunkSize: 500, dataFormatId: 'dtv', encodingId: 'utf-8', valueDelimiterId: ';' });
        });

        it('fails for an item with no encoding or value delimiter, because only a file has them', async () => {
            const retrieval = retrieveRecordsWithParser({
                options: { ...RETRIEVE_OPTIONS, encodingId: undefined } as never,
                signal: new AbortController().signal,
                stream: new ReadableStream(),
                toolConfigs: TOOL_CONFIGS
            });

            await expect(retrieval.next()).rejects.toThrow("'/a.csv' has no encoding or value delimiter, which a parser needs to read it.");
        });

        it('stops the parser when the receiver stops reading', async () => {
            const onStop = vi.fn();
            const chunks: ParsedRecordsChunk[] = [
                { records: RECORDS, typeId: 'parsingRecordArray' },
                { records: RECORDS, typeId: 'parsingRecordArray' }
            ];
            tools.byName['rust-csv-core-parser'] = { parseStream: vi.fn(() => buildParsing(SUMMARY, chunks, onStop)) };

            const retrieval = retrieveRecordsWithParser({
                options: RETRIEVE_OPTIONS as never,
                signal: new AbortController().signal,
                stream: new ReadableStream(),
                toolConfigs: TOOL_CONFIGS
            });
            for await (const chunk of retrieval) {
                expect(chunk.records).toBe(RECORDS);
                break; // Stops after the first chunk, as a store does when its write fails.
            }

            expect(onStop).toHaveBeenCalledOnce();
        });
    });

    describe('auditObjectContentWithParser', () => {
        const SUMMARY = { byteCount: 9, commentLineCount: 1, emptyLineCount: 2, lineCount: 5, nonUniformRecordCount: 3, recordCount: 4 };

        function runAudit(
            hasHeaders: boolean | undefined,
            stream = new ReadableStream<Uint8Array>({
                start: (controller) => {
                    controller.close();
                }
            }),
            auditOptions: { byteLimit?: number; encodingId?: string; stopSignal?: AbortSignal } = {},
            auditedHasHeaders = hasHeaders === true // What the auditor finds. It checks again when the preview found no header.
        ) {
            const columnAuditor = { auditRecords: vi.fn(), completeAudit: vi.fn().mockReturnValue({ columnConfigs: [{ id: 'a' }], hasHeaders: auditedHasHeaders }) };
            const parsedBytes: number[] = [];
            const parseStream = vi.fn(async function* (sourceStream: ReadableStream<Uint8Array>): AsyncGenerator<ParsedRecordsChunk, ParseStreamSummary> {
                const reader = sourceStream.getReader();
                let result = await reader.read();
                while (!result.done) {
                    parsedBytes.push(...result.value); // Reads the stream through, as a parser does.
                    result = await reader.read();
                }
                yield { records: RECORDS, typeId: 'parsingRecordArray' };
                yield { records: [...RECORDS, ...RECORDS], typeId: 'parsingRecordArray' };
                return SUMMARY;
            });
            tools.byName['rust-csv-core-parser'] = { parseStream };
            const onProgress = vi.fn();
            const audit = auditObjectContentWithParser({
                constructColumnAuditor: vi.fn().mockReturnValue(columnAuditor),
                onProgress,
                options: {
                    chunkSize: undefined,
                    dataFormatId: 'dtv',
                    encodingId: 'utf-8',
                    hasHeaders,
                    parserId: undefined,
                    path: '/a.csv',
                    valueDelimiterId: ',',
                    ...auditOptions
                } as never,
                signal: new AbortController().signal,
                stream,
                toolConfigs: TOOL_CONFIGS
            });
            return { audit, columnAuditor, onProgress, parsedText: (): string => new TextDecoder().decode(new Uint8Array(parsedBytes)) };
        }

        it("audits each chunk's records, reports progress, and describes the columns and counts", async () => {
            const { audit, columnAuditor, onProgress } = runAudit(true);

            const { contentAuditConfig: auditConfig, hasHeaders } = await audit;

            expect(hasHeaders).toBe(true);
            expect(auditConfig).toMatchObject({
                byteCount: 0,
                columns: [{ id: 'a' }],
                commentLineCount: 1,
                emptyLineCount: 2,
                invalidFieldLengthCount: 3,
                isComplete: true,
                lineCount: 5,
                recordCount: 3
            });
            expect(columnAuditor.auditRecords).toHaveBeenCalledTimes(2);
            expect(onProgress.mock.calls).toEqual([
                [1, 0],
                [2, 0]
            ]);
        });

        it('counts a header record as data only when the item has none', async () => {
            const { contentAuditConfig: auditConfig } = await runAudit(false).audit;

            expect(auditConfig.recordCount).toBe(4);
        });

        it('leaves out a header the auditor finds when the preview found none', async () => {
            const { audit, columnAuditor } = runAudit(undefined, undefined, {}, true);

            const { contentAuditConfig: auditConfig, hasHeaders } = await audit;

            expect(hasHeaders).toBe(true);
            expect(auditConfig.recordCount).toBe(3);
            expect(columnAuditor.completeAudit).toHaveBeenCalledOnce();
        });

        it('ends at the first record to finish past the byte limit, and stops reading the item', async () => {
            const { cancel, stream } = buildStream('a,b\n1,2\n', '3,4\n5,6\n');
            const { audit, parsedText } = runAudit(true, stream, { byteLimit: 5 });

            const { contentAuditConfig: auditConfig } = await audit;

            expect(parsedText()).toBe('a,b\n1,2\n');
            expect(auditConfig).toMatchObject({ byteCount: 8, isComplete: false });
            expect(cancel).toHaveBeenCalledOnce();
        });

        it('reads on into the next piece when no record ends in the one that reached the limit', async () => {
            const { stream } = buildStream('a,b', 'c,d\n1,2\n');
            const { audit, parsedText } = runAudit(true, stream, { byteLimit: 2 });

            await audit;

            expect(parsedText()).toBe('a,bc,d\n');
        });

        it('does not take a line break inside quotes for the end of a record', async () => {
            const { stream } = buildStream('"a\nb",c\n1,2\n');
            const { audit, parsedText } = runAudit(true, stream, { byteLimit: 1 });

            await audit;

            expect(parsedText()).toBe('"a\nb",c\n');
        });

        it('keeps a Windows line break whole', async () => {
            const { stream } = buildStream('a\r\nb\r\n');
            const { audit, parsedText } = runAudit(true, stream, { byteLimit: 1 });

            await audit;

            expect(parsedText()).toBe('a\r\n');
        });

        it('finds the end of a record in UTF-16', async () => {
            const bytes = new Uint8Array([0x61, 0, 0x0a, 0x61, 0x0a, 0, 0x62, 0, 0x0a, 0]); // A 'ਊ' character holds a line feed byte, which ends nothing.
            const stream = new ReadableStream<Uint8Array>({
                start: (controller) => {
                    controller.enqueue(bytes);
                    controller.close();
                }
            });
            const { audit } = runAudit(true, stream, { byteLimit: 1, encodingId: 'utf-16le' });

            const { contentAuditConfig: auditConfig } = await audit;

            expect(auditConfig.byteCount).toBe(6);
        });

        it('reaches the end of the item when the limit is past it', async () => {
            const { stream } = buildStream('a,b\n1,2');
            const { audit } = runAudit(true, stream, { byteLimit: 100 });

            const { contentAuditConfig: auditConfig } = await audit;

            expect(auditConfig).toMatchObject({ byteCount: 7, isComplete: true });
        });

        it('keeps what was read when stopped, ending at the next record', async () => {
            const stopController = new AbortController();
            const encoder = new TextEncoder();
            const pieces = [encoder.encode('a,b\n1,'), encoder.encode('2\n3,4\n')];
            const stream = new ReadableStream<Uint8Array>(
                {
                    pull(controller): void {
                        if (pieces.length === 1) stopController.abort(); // The stop arrives between the two pieces.
                        const piece = pieces.shift();
                        if (piece == null) controller.close();
                        else controller.enqueue(piece);
                    }
                },
                { highWaterMark: 0 }
            );
            const { audit, parsedText } = runAudit(true, stream, { stopSignal: stopController.signal });

            const { contentAuditConfig: auditConfig } = await audit;

            expect(parsedText()).toBe('a,b\n1,2\n');
            expect(auditConfig).toMatchObject({ byteCount: 8, isComplete: false });
        });

        it('hands a large piece to the parser 1 MB at a time, so the progress follows what it has read', async () => {
            const MEGABYTE = 1_048_576;
            const piece = new Uint8Array(2.5 * MEGABYTE).fill(0x61); // One piece, as WebKit reads an item in pieces of about 18 MB.
            const stream = new ReadableStream<Uint8Array>({
                start: (controller) => {
                    controller.enqueue(piece);
                    controller.close();
                }
            });
            const readByteCounts: number[] = [];
            tools.byName['rust-csv-core-parser'] = {
                parseStream: vi.fn(async function* (sourceStream: ReadableStream<Uint8Array>): AsyncGenerator<ParsedRecordsChunk, ParseStreamSummary> {
                    const reader = sourceStream.getReader();
                    let result = await reader.read();
                    while (!result.done) {
                        readByteCounts.push(result.value.length);
                        yield { records: RECORDS, typeId: 'parsingRecordArray' }; // Records come out of each read, as they do from a parser.
                        result = await reader.read();
                    }
                    return SUMMARY;
                })
            };
            const onProgress = vi.fn<(recordCount: number, byteCount: number) => void>();

            const { contentAuditConfig: auditConfig } = await auditObjectContentWithParser({
                constructColumnAuditor: vi.fn().mockReturnValue({ auditRecords: vi.fn(), completeAudit: vi.fn().mockReturnValue({ columnConfigs: [], hasHeaders: false }) }),
                onProgress,
                options: { chunkSize: undefined, dataFormatId: 'dtv', encodingId: 'utf-8', hasHeaders: false, parserId: undefined, path: '/a.csv', valueDelimiterId: ',' } as never,
                signal: new AbortController().signal,
                stream,
                toolConfigs: TOOL_CONFIGS
            });

            expect(readByteCounts).toEqual([MEGABYTE, MEGABYTE, 0.5 * MEGABYTE]);
            expect(onProgress.mock.calls.map(([, byteCount]) => byteCount)).toEqual([MEGABYTE, 2 * MEGABYTE, 2.5 * MEGABYTE]);
            expect(auditConfig).toMatchObject({ byteCount: 2.5 * MEGABYTE, isComplete: true });
        });

        it('ends at the next record after the limit when it falls inside a part of a large piece', async () => {
            const MEGABYTE = 1_048_576;
            const piece = new Uint8Array(2.5 * MEGABYTE).fill(0x61);
            piece[1.5 * MEGABYTE] = 0x0a; // The first record ends halfway through the second part.
            const stream = new ReadableStream<Uint8Array>({
                start: (controller) => {
                    controller.enqueue(piece);
                    controller.close();
                }
            });
            let parsedByteCount = 0;
            tools.byName['rust-csv-core-parser'] = {
                parseStream: vi.fn(async function* (sourceStream: ReadableStream<Uint8Array>): AsyncGenerator<ParsedRecordsChunk, ParseStreamSummary> {
                    const reader = sourceStream.getReader();
                    let result = await reader.read();
                    while (!result.done) {
                        parsedByteCount += result.value.length; // Counted rather than kept, because spreading a megabyte overflows the stack.
                        yield* []; // Yields no records, so only the bytes read are checked.
                        result = await reader.read();
                    }
                    return SUMMARY;
                })
            };

            const { contentAuditConfig: auditConfig } = await auditObjectContentWithParser({
                constructColumnAuditor: vi.fn().mockReturnValue({ auditRecords: vi.fn(), completeAudit: vi.fn().mockReturnValue({ columnConfigs: [], hasHeaders: false }) }),
                onProgress: vi.fn(),
                options: {
                    byteLimit: 1,
                    chunkSize: undefined,
                    dataFormatId: 'dtv',
                    encodingId: 'utf-8',
                    hasHeaders: false,
                    parserId: undefined,
                    path: '/a.csv',
                    valueDelimiterId: ','
                } as never,
                signal: new AbortController().signal,
                stream,
                toolConfigs: TOOL_CONFIGS
            });

            expect(parsedByteCount).toBe(1.5 * MEGABYTE + 1);
            expect(auditConfig).toMatchObject({ byteCount: 1.5 * MEGABYTE + 1, isComplete: false });
        });

        it('adds up how long the parser waited for the item to arrive', async () => {
            vi.useFakeTimers();
            const stream = new ReadableStream<Uint8Array>({
                async pull(controller): Promise<void> {
                    await new Promise((resolve) => setTimeout(resolve, 100)); // Each chunk takes 100 ms to arrive.
                    controller.enqueue(new Uint8Array([1]));
                    controller.close();
                }
            });
            const { audit } = runAudit(true, stream);

            await vi.advanceTimersByTimeAsync(100);
            const { contentAuditConfig: auditConfig } = await audit;
            vi.useRealTimers();

            expect(auditConfig.sourceWaitDuration).toBeGreaterThanOrEqual(100);
        });

        it('hands the auditor the columns the source states', async () => {
            tools.byName['rust-csv-core-parser'] = {
                parseStream: vi.fn(() => buildParsing({ byteCount: 0, commentLineCount: 0, emptyLineCount: 0, lineCount: 0, nonUniformRecordCount: 0, recordCount: 0 }))
            };
            const constructColumnAuditor = vi.fn().mockReturnValue({ auditRecords: vi.fn(), completeAudit: () => ({ columnConfigs: [], hasHeaders: true }) });
            const declaredColumnConfigs = [{ dataSubtypeId: 'date' as const, dataTypeId: 'temporal' as const, label: undefined, name: 'hireDate' }];

            await auditObjectContentWithParser({
                constructColumnAuditor,
                declaredColumnConfigs,
                onProgress: vi.fn(),
                options: { chunkSize: undefined, dataFormatId: 'dtv', encodingId: 'utf-8', hasHeaders: true, parserId: undefined, path: '/a.csv', valueDelimiterId: ',' } as never,
                signal: new AbortController().signal,
                stream: new ReadableStream<Uint8Array>({
                    start: (controller) => {
                        controller.close();
                    }
                }),
                toolConfigs: TOOL_CONFIGS
            });

            expect(constructColumnAuditor).toHaveBeenCalledWith(true, declaredColumnConfigs);
        });
    });

    describe('nested formats', () => {
        const HEADER_RECORDS = [[{ value: 'a', valueWasQuoted: true }], [{ value: '1', valueWasQuoted: false }]] as ParsedRecord[];

        it("maps the preview's bytes, reads the suggested part as the table, and takes the parser's header", async () => {
            const index = buildStructureIndex();
            const buildStructureIndexMock = vi.fn().mockResolvedValue(index);
            const parseText = vi.fn().mockResolvedValue({ hasHeaders: true, issues: [], parsedRecords: HEADER_RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: buildStructureIndexMock, parseText };
            const bytes = new TextEncoder().encode('{"rows":[{"a":1}]}');

            const result = await buildPreviewObjectResult(
                buildPreviewInput(buildFilePreview({ bytes, dataFormatId: 'json', isComplete: false, text: '{"rows":[{"a":1}]}' }), {}, STRUCTURED_TOOL_CONFIGS)
            );

            const [stream, options] = buildStructureIndexMock.mock.calls[0] as [ReadableStream<Uint8Array>, Record<string, unknown>];
            expect(new Uint8Array(await new Response(stream).arrayBuffer())).toEqual(bytes);
            expect(options).toMatchObject({ dataFormatId: 'json', encodingId: 'utf-8', isComplete: false });
            expect(parseText).toHaveBeenCalledWith('{"rows":[{"a":1}]}', expect.objectContaining({ structurePath: ['rows'] }));
            expect(inferDataTypes).toHaveBeenCalledWith(HEADER_RECORDS, true, undefined);
            expect(result.structureIndex).toBe(index);
            expect(result.readingConfig).toMatchObject({ structurePath: ['rows'], valueDelimiterId: undefined });
            expect(result.sampleConfig).toMatchObject({ parsedRecords: HEADER_RECORDS, structurePath: ['rows'] });
        });

        it('reads no records when the parser suggests no part, so the user chooses one', async () => {
            const parseText = vi.fn();
            const index = buildStructureIndex({ suggestedStructurePath: undefined, tableCandidateCount: 2 });
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: vi.fn().mockResolvedValue(index), parseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '{}' }), {}, STRUCTURED_TOOL_CONFIGS));

            expect(parseText).not.toHaveBeenCalled();
            expect(result.readingConfig.structurePath).toBeUndefined();
            expect(result.sampleConfig).toMatchObject({ issues: [], parsedRecords: [], structurePath: undefined });
        });

        it('reads the part the user chose, but reports the suggested part in the reading', async () => {
            const parseText = vi.fn().mockResolvedValue({ hasHeaders: true, issues: [], parsedRecords: HEADER_RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: vi.fn().mockResolvedValue(buildStructureIndex()), parseText };

            const result = await buildPreviewObjectResult(
                buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '{}' }), { structurePath: ['other'] }, STRUCTURED_TOOL_CONFIGS)
            );

            expect(parseText).toHaveBeenLastCalledWith('{}', expect.objectContaining({ structurePath: ['other'] }));
            expect(result.readingConfig.structurePath).toEqual(['rows']);
            expect(result.sampleConfig.structurePath).toEqual(['other']);
        });

        it('reports why the structure could not be read at all, without reading records', async () => {
            const issue = {
                endLineNumber: undefined,
                fieldNumber: undefined,
                id: 'JSON_ENCODING',
                lineNumber: undefined,
                message: 'JSON must be encoded as UTF-8.',
                recordNumber: undefined,
                severityId: 'error' as const,
                value: undefined
            };
            const parseText = vi.fn();
            const index = buildStructureIndex({ issues: [issue], nodes: [], suggestedStructurePath: undefined, tableCandidateCount: 0 });
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: vi.fn().mockResolvedValue(index), parseText };

            const result = await buildPreviewObjectResult(
                buildPreviewInput(buildFilePreview({ dataFormatId: 'json', decodedEncodingId: 'utf-16le', text: '{}' }), {}, STRUCTURED_TOOL_CONFIGS)
            );

            expect(parseText).not.toHaveBeenCalled();
            expect(result.sampleConfig).toMatchObject({ issues: [issue], parsedRecords: [] });
        });

        it('hands the parser the limit, the stop signal and the part, rather than cutting the stream itself', async () => {
            const parseStream = vi.fn(() =>
                buildParsing({ byteCount: 7, commentLineCount: 0, emptyLineCount: 0, isComplete: false, lineCount: 1, nonUniformRecordCount: 0, recordCount: 3 })
            );
            tools.byName['streamparser-json-parser'] = { parseStream };
            const options = buildStructuredAuditOptions();
            const { stream } = buildStream('{"rows":[', '{"a":1}]}');

            const { contentAuditConfig } = await auditObjectContentWithParser({
                constructColumnAuditor: vi.fn().mockReturnValue({ auditRecords: vi.fn(), completeAudit: () => ({ columnConfigs: [], hasHeaders: true }) }),
                onProgress: vi.fn(),
                options,
                signal: new AbortController().signal,
                stream,
                toolConfigs: STRUCTURED_TOOL_CONFIGS
            });

            expect(parseStream).toHaveBeenCalledWith(
                expect.any(ReadableStream),
                expect.objectContaining({ byteLimit: 100, stopSignal: options.stopSignal, structurePath: ['rows'], valueDelimiterId: '' })
            );
            expect(contentAuditConfig).toMatchObject({ isComplete: false, recordCount: 2 });
        });

        it('retrieves the records of the part read as the table', async () => {
            const parseStream = vi.fn(() => buildParsing({ byteCount: 0, commentLineCount: 0, emptyLineCount: 0, lineCount: 0, nonUniformRecordCount: 0, recordCount: 1 }));
            tools.byName['streamparser-json-parser'] = { parseStream };
            const { stream } = buildStream('[]');
            const options = {
                chunkSize: undefined,
                dataFormatId: 'json' as const,
                encodingId: 'utf-8',
                parserId: undefined,
                path: '/a.json',
                structurePath: ['rows'],
                valueDelimiterId: undefined
            };

            const retrieval = retrieveRecordsWithParser({ options, signal: new AbortController().signal, stream, toolConfigs: STRUCTURED_TOOL_CONFIGS });
            await retrieval.next();

            expect(parseStream).toHaveBeenCalledWith(stream, expect.objectContaining({ structurePath: ['rows'], valueDelimiterId: '' }));
        });

        it('maps the whole item, reporting progress', async () => {
            const index = buildStructureIndex();
            const buildStructureIndexMock = vi.fn().mockResolvedValue(index);
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: buildStructureIndexMock };
            const { stream } = buildStream('[]');
            const onProgress = vi.fn();

            const result = await indexObjectStructureWithParser({
                onProgress,
                options: { dataFormatId: 'json', encodingId: undefined, parserId: undefined, path: '/a.json' },
                signal: new AbortController().signal,
                stream,
                toolConfigs: STRUCTURED_TOOL_CONFIGS
            });

            expect(result).toBe(index);
            expect(buildStructureIndexMock).toHaveBeenCalledWith(stream, expect.objectContaining({ encodingId: 'utf-8', isComplete: true, onProgress }));
        });

        it('lists a page of a part at the locator given', async () => {
            const page = { entries: [], issues: [], nextLocator: undefined };
            const listStructureEntries = vi.fn().mockResolvedValue(page);
            tools.byName['streamparser-json-parser'] = { buildStructureIndex: vi.fn(), listStructureEntries };
            const { stream } = buildStream('[]');

            const result = await listObjectStructureEntriesWithParser({
                options: { dataFormatId: 'json', entryCount: 50, locator: LOCATOR, maxValueLength: undefined, parserId: undefined, path: '/a.json', structurePath: ['rows'] },
                signal: new AbortController().signal,
                stream,
                toolConfigs: STRUCTURED_TOOL_CONFIGS
            });

            expect(result).toBe(page);
            expect(listStructureEntries).toHaveBeenCalledWith(stream, expect.objectContaining({ entryCount: 50, locator: LOCATOR, path: ['rows'] }));
        });

        it('fails clearly when the tool for the format does not map structure', async () => {
            tools.byName['json-parser'] = { parseText: vi.fn() };
            const { stream } = buildStream('[]');

            await expect(
                indexObjectStructureWithParser({
                    onProgress: vi.fn(),
                    options: { dataFormatId: 'json', encodingId: 'utf-8', parserId: undefined, path: '/a.json' },
                    signal: new AbortController().signal,
                    stream,
                    toolConfigs: TOOL_CONFIGS
                })
            ).rejects.toThrow("Tool 'dpuse-tool-json-parser' does not map the structure of 'json' items.");
        });
    });
});
