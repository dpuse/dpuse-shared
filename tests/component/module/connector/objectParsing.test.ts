// ── External Dependencies & Registrations
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── DPUse Framework
import type { ObjectFilePreview } from '@/component/module/connector';
import type { ToolConfig } from '@/component/module/tool';
import { auditObjectContentWithParser, buildPreviewObjectResult, retrieveRecordsWithParser } from '@/component/module/connector';
import type { ParsingRecord, ValueDelimiterId } from '@/component/dataView';

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

const RECORDS = [[{ value: 'a', valueWasQuoted: false }]] as ParsingRecord[];

function buildFilePreview(overrides: Partial<ObjectFilePreview> = {}): ObjectFilePreview {
    return {
        bytes: new Uint8Array(10),
        dataFormatId: 'dtv',
        encodingConfidenceLevel: 100,
        encodingId: 'utf-8',
        fileTypeConfig: undefined,
        isComplete: true,
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

const INFERENCE_SUMMARY = { columnConfigs: [{ id: 'a' }], hasHeaderRow: true };
const inferDataTypes = vi.fn(() => INFERENCE_SUMMARY);

function buildPreviewInput(filePreview: ObjectFilePreview, parserId?: string, valueDelimiterId?: ValueDelimiterId): Parameters<typeof buildPreviewObjectResult>[0] {
    return { asAt: 1000, filePreview, inferDataTypes: inferDataTypes as never, parserId, startedAt: performance.now(), toolConfigs: TOOL_CONFIGS, valueDelimiterId };
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
                previewConfig: { parsedRecords: RECORDS, size: 10, text: 'a,b\n1,2\n' },
                readConfig: { dataFormatId: 'dtv', hasHeaders: true, parserId: 'dpuse-tool-rust-csv-core-parser', recordDelimiterId: '\n', valueDelimiterId: ';' }
            });
        });

        it('parses with the tool the user chose, even when it is not the first', async () => {
            const adaltasParseText = vi.fn();
            const rustParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['adaltas-csv-parser'] = { parseText: adaltasParseText };
            tools.byName['rust-csv-core-parser'] = { parseText: rustParseText };

            const { readConfig } = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview(), 'dpuse-tool-rust-csv-core-parser'));

            expect(adaltasParseText).not.toHaveBeenCalled();
            expect(readConfig.parserId).toBe('dpuse-tool-rust-csv-core-parser');
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
            expect(result).toMatchObject({ previewConfig: { parsedRecords: RECORDS }, readConfig: { valueDelimiterId: ',' } });
        });

        it('parses only with the value delimiter the user chose, and reports it even when it does not split the text', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview(), undefined, '|'));

            expect(parseText).toHaveBeenCalledTimes(1);
            expect(parseText.mock.calls[0]?.[1]).toMatchObject({ valueDelimiterIds: ['|'] });
            expect(result).toMatchObject({ previewConfig: { parsedRecords: RECORDS }, readConfig: { valueDelimiterId: '|' } });
        });

        it('leaves the value delimiter undefined for a format that is not delimited, and parses it once', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['json-parser'] = { parseText };

            const { readConfig } = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '[1]' })));

            expect(parseText).toHaveBeenCalledOnce();
            expect(readConfig).toMatchObject({ dataFormatId: 'json', parserId: 'dpuse-tool-json-parser', valueDelimiterId: undefined });
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
                previewConfig: { issues: [{ id: 'empty', severityId: 'info' }], parsedRecords: [], size: 0 },
                readConfig: { dataFormatId: 'dtv', hasHeaders: false, recordDelimiterId: '\n', valueDelimiterId: ',' }
            });
            expect(result.readConfig).not.toHaveProperty('parserId');
        });

        it('keeps the text of a format no tool reads yet, without parsing it', async () => {
            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: 'xml', text: '<a/>' })));

            expect(result).toMatchObject({ previewConfig: { parsedRecords: [], text: '<a/>' }, readConfig: { dataFormatId: 'xml', valueDelimiterId: undefined } });
            expect(result.readConfig).not.toHaveProperty('parserId');
        });

        it("reports a type the app cannot read as 'unknown'", async () => {
            const result = await buildPreviewObjectResult(buildPreviewInput(buildFilePreview({ dataFormatId: undefined, text: undefined })));

            expect(result).toMatchObject({ previewConfig: { text: undefined }, readConfig: { dataFormatId: 'unknown' } });
        });
    });

    describe('retrieveRecordsWithParser', () => {
        it('streams the item through the tool that read its preview, and returns its summary', async () => {
            const summary = { byteCount: 1, commentLineCount: 0, emptyLineCount: 0, lineCount: 1, nonUniformRecordCount: 0, recordCount: 1 };
            const parseStream = vi.fn().mockResolvedValue(summary);
            tools.byName['rust-csv-core-parser'] = { parseStream };
            const stream = new ReadableStream<Uint8Array>();
            const signal = new AbortController().signal;
            const chunk = vi.fn();

            const result = await retrieveRecordsWithParser({
                chunk,
                options: { chunkSize: 500, dataFormatId: 'dtv', encodingId: 'utf-8', parserId: 'dpuse-tool-rust-csv-core-parser', path: '/a.csv', valueDelimiterId: ';' } as never,
                signal,
                stream,
                toolConfigs: TOOL_CONFIGS
            });

            expect(result).toBe(summary);
            expect(parseStream).toHaveBeenCalledWith(stream, { abortSignal: signal, chunkSize: 500, dataFormatId: 'dtv', encodingId: 'utf-8', valueDelimiterId: ';' }, chunk);
        });
    });

    describe('auditObjectContentWithParser', () => {
        const SUMMARY = { byteCount: 9, commentLineCount: 1, emptyLineCount: 2, lineCount: 5, nonUniformRecordCount: 3, recordCount: 4 };

        function runAudit(
            hasHeaders: boolean,
            stream = new ReadableStream<Uint8Array>({
                start: (controller) => {
                    controller.close();
                }
            }),
            auditOptions: { byteLimit?: number; encodingId?: string; stopSignal?: AbortSignal } = {}
        ) {
            const columnAuditor = { auditRecords: vi.fn(), completeAudit: vi.fn().mockReturnValue([{ id: 'a' }]) };
            const parsedBytes: number[] = [];
            const parseStream = vi.fn(async (sourceStream: ReadableStream<Uint8Array>, _options: unknown, chunk: (typeId: string, records: ParsingRecord[]) => void) => {
                const reader = sourceStream.getReader();
                let result = await reader.read();
                while (!result.done) {
                    parsedBytes.push(...result.value); // Reads the stream through, as a parser does.
                    result = await reader.read();
                }
                chunk('parsingRecordArray', RECORDS);
                chunk('parsingRecordArray', [...RECORDS, ...RECORDS]);
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

            const auditConfig = await audit;

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
            const auditConfig = await runAudit(false).audit;

            expect(auditConfig.recordCount).toBe(4);
        });

        it('ends at the first record to finish past the byte limit, and stops reading the item', async () => {
            const { cancel, stream } = buildStream('a,b\n1,2\n', '3,4\n5,6\n');
            const { audit, parsedText } = runAudit(true, stream, { byteLimit: 5 });

            const auditConfig = await audit;

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

            const auditConfig = await audit;

            expect(auditConfig.byteCount).toBe(6);
        });

        it('reaches the end of the item when the limit is past it', async () => {
            const { stream } = buildStream('a,b\n1,2');
            const { audit } = runAudit(true, stream, { byteLimit: 100 });

            const auditConfig = await audit;

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

            const auditConfig = await audit;

            expect(parsedText()).toBe('a,b\n1,2\n');
            expect(auditConfig).toMatchObject({ byteCount: 8, isComplete: false });
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
            const auditConfig = await audit;
            vi.useRealTimers();

            expect(auditConfig.sourceWaitDuration).toBeGreaterThanOrEqual(100);
        });
    });
});
