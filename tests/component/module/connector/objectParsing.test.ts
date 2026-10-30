// ── External Dependencies & Registrations
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── DPUse Framework
import type { ObjectFilePreview } from '@/component/module/connector';
import type { ParsingRecord } from '@/component/dataView';
import type { ToolConfig } from '@/component/module/tool';
import { auditObjectContentWithParser, buildPreviewConfig, retrieveRecordsWithParser } from '@/component/module/connector';

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

const INFERENCE_SUMMARY = { columnConfigs: [{ id: 'a' }], hasHeaderRow: true };
const inferDataTypes = vi.fn(() => INFERENCE_SUMMARY);

function buildPreviewInput(filePreview: ObjectFilePreview, parserId?: string): Parameters<typeof buildPreviewConfig>[0] {
    return { asAt: 1000, filePreview, inferDataTypes: inferDataTypes as never, parserId, startedAt: performance.now(), toolConfigs: TOOL_CONFIGS };
}

describe('objectParsing', () => {
    afterEach(() => {
        tools.byName = {};
        inferDataTypes.mockClear();
    });

    describe('buildPreviewConfig', () => {
        it('parses the text with the format’s default tool, and infers its types', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ';' });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview()));

            expect(parseText).toHaveBeenCalledOnce();
            expect(parseText).toHaveBeenCalledWith('a,b\n1,2\n', expect.objectContaining({ dataFormatId: 'dtv', isComplete: true }));
            expect(preview).toMatchObject({
                asAt: 1000,
                columnConfigs: INFERENCE_SUMMARY.columnConfigs,
                dataFormatId: 'dtv',
                hasHeaders: true,
                parsedRecords: RECORDS,
                parserId: 'dpuse-tool-rust-csv-core-parser',
                recordDelimiterId: '\n',
                size: 10,
                text: 'a,b\n1,2\n',
                valueDelimiterId: ';'
            });
        });

        it('parses with the tool the user chose, even when it is not the first', async () => {
            const adaltasParseText = vi.fn();
            const rustParseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['adaltas-csv-parser'] = { parseText: adaltasParseText };
            tools.byName['rust-csv-core-parser'] = { parseText: rustParseText };

            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview(), 'dpuse-tool-rust-csv-core-parser'));

            expect(adaltasParseText).not.toHaveBeenCalled();
            expect(preview.parserId).toBe('dpuse-tool-rust-csv-core-parser');
        });

        it('reads delimited text with no delimiter found as comma-delimited, parsing it again with the comma', async () => {
            const parseText = vi
                .fn()
                .mockResolvedValueOnce({ issues: [], parsedRecords: [], recordDelimiterId: '\n', valueDelimiterId: undefined })
                .mockResolvedValueOnce({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['rust-csv-core-parser'] = { parseText };

            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview({ text: 'Ada\nGrace\n' })));

            expect(parseText).toHaveBeenCalledTimes(2);
            expect(parseText.mock.calls[1]?.[1]).toMatchObject({ valueDelimiterIds: [','] });
            expect(preview).toMatchObject({ parsedRecords: RECORDS, valueDelimiterId: ',' });
        });

        it('leaves the value delimiter undefined for a format that is not delimited, and parses it once', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: undefined });
            tools.byName['json-parser'] = { parseText };

            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview({ dataFormatId: 'json', text: '[1]' })));

            expect(parseText).toHaveBeenCalledOnce();
            expect(preview).toMatchObject({ dataFormatId: 'json', parserId: 'dpuse-tool-json-parser', valueDelimiterId: undefined });
        });

        it('passes on whether the preview holds the whole item', async () => {
            const parseText = vi.fn().mockResolvedValue({ issues: [], parsedRecords: RECORDS, recordDelimiterId: '\n', valueDelimiterId: ',' });
            tools.byName['rust-csv-core-parser'] = { parseText };

            await buildPreviewConfig(buildPreviewInput(buildFilePreview({ isComplete: false })));

            expect(parseText).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ isComplete: false }));
        });

        it('reports an empty file as delimited text with no rows, read with the defaults', async () => {
            const filePreview = buildFilePreview({ bytes: new Uint8Array(0), dataFormatId: undefined, text: undefined });
            const preview = await buildPreviewConfig(buildPreviewInput(filePreview));

            expect(preview).toMatchObject({
                dataFormatId: 'dtv',
                hasHeaders: false,
                issues: [{ id: 'empty', severityId: 'info' }],
                parsedRecords: [],
                recordDelimiterId: '\n',
                size: 0,
                valueDelimiterId: ','
            });
            expect(preview).not.toHaveProperty('parserId');
        });

        it('keeps the text of a format no tool reads yet, without parsing it', async () => {
            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview({ dataFormatId: 'xml', text: '<a/>' })));

            expect(preview).toMatchObject({ dataFormatId: 'xml', parsedRecords: [], text: '<a/>', valueDelimiterId: undefined });
            expect(preview).not.toHaveProperty('parserId');
        });

        it("reports a type the app cannot read as 'unknown'", async () => {
            const preview = await buildPreviewConfig(buildPreviewInput(buildFilePreview({ dataFormatId: undefined, text: undefined })));

            expect(preview).toMatchObject({ dataFormatId: 'unknown', text: undefined });
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
            })
        ) {
            const columnAuditor = { auditRecords: vi.fn(), completeAudit: vi.fn().mockReturnValue([{ id: 'a' }]) };
            const parseStream = vi.fn(async (sourceStream: ReadableStream<Uint8Array>, _options: unknown, chunk: (typeId: string, records: ParsingRecord[]) => void) => {
                const reader = sourceStream.getReader();
                let result = await reader.read();
                while (!result.done) result = await reader.read(); // Reads the stream through, as a parser does.
                chunk('parsingRecordArray', RECORDS);
                chunk('parsingRecordArray', [...RECORDS, ...RECORDS]);
                return SUMMARY;
            });
            tools.byName['rust-csv-core-parser'] = { parseStream };
            const onProgress = vi.fn();
            const audit = auditObjectContentWithParser({
                constructColumnAuditor: vi.fn().mockReturnValue(columnAuditor),
                onProgress,
                options: { chunkSize: undefined, dataFormatId: 'dtv', encodingId: 'utf-8', hasHeaders, parserId: undefined, path: '/a.csv', valueDelimiterId: ',' } as never,
                signal: new AbortController().signal,
                stream,
                toolConfigs: TOOL_CONFIGS
            });
            return { audit, columnAuditor, onProgress };
        }

        it("audits each chunk's records, reports progress, and describes the columns and counts", async () => {
            const { audit, columnAuditor, onProgress } = runAudit(true);

            const auditConfig = await audit;

            expect(auditConfig).toMatchObject({
                columns: [{ id: 'a' }],
                commentLineCount: 1,
                emptyLineCount: 2,
                invalidFieldLengthCount: 3,
                lineCount: 5,
                recordCount: 3
            });
            expect(columnAuditor.auditRecords).toHaveBeenCalledTimes(2);
            expect(onProgress.mock.calls).toEqual([[1], [2]]);
        });

        it('counts a header record as data only when the item has none', async () => {
            const auditConfig = await runAudit(false).audit;

            expect(auditConfig.recordCount).toBe(4);
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
