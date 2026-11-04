// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import { ORDERED_VALUE_DELIMITER_IDS } from '@/component/dataView';
import type {
    AuditObjectContentOptions,
    ColumnAuditor,
    ConnectorUtilities,
    PreviewObjectResult,
    RecordRetrievalTypeId,
    RetrieveRecordsOptions,
    RetrieveRecordsSummary
} from '@/component/module/connector';
import type { ContentAuditConfig, DataFormatId, ParsingRecord, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
import { resolveDecoderId } from '@/encoding';
import { listParserToolConfigs, loadTool, resolveParserToolConfig, TOOL_NAME_PREFIX } from '@/component/module/tool';
import type { ParserInterface, ToolConfig } from '@/component/module/tool';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What a connector gets from the file previewer tool: the start of the item, its format and its text. Only the fields
// the preview is built from.
export interface ObjectFilePreview {
    bytes: Uint8Array;
    dataFormatId: DataFormatId | undefined;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    fileTypeConfig: FileTypeResult | undefined;
    isComplete: boolean; // Whether the preview holds the whole item rather than only its start.
    text: string | undefined;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// Text the previewer takes as delimited is read as delimited even when no delimiter is found, such as a single column
// or rows that split unevenly. It is then read with these, the most common ones. An empty file is read with them too.
const DEFAULT_RECORD_DELIMITER_ID: RecordDelimiterId = '\n';
const DEFAULT_VALUE_DELIMITER_ID: ValueDelimiterId = ',';

const CARRIAGE_RETURN_BYTE = 0x0d;
const LINE_FEED_BYTE = 0x0a;
const QUOTE_BYTE = 0x22;

// The most an audit hands its parser at a time. WebKit reads an item in pieces of about 18 MB, against about 2 MB in
// Chromium, and the bytes audited are counted as the parser takes them, so a whole piece at once made the progress jump
// in large steps and reach 100% while the parser was still reading.
const MAX_AUDIT_READ_BYTE_COUNT = 1_048_576;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Builds the first audit and preview of an item from what the file previewer found, parsing its text with the tool the user chose or the
// format's default, and delimited text with the value delimiter the user chose or the one detected. An item that is empty, or of a format no tool reads yet, comes back as itself with no
// records rather than as an error, and its text is kept so the picker can still show it.
export async function buildPreviewObjectResult(input: {
    asAt: number;
    filePreview: ObjectFilePreview;
    inferDataTypes: ConnectorUtilities['inferDataTypes'];
    parserId: string | undefined;
    startedAt: number; // From 'performance.now()', before the item was fetched.
    toolConfigs: ToolConfig[];
    valueDelimiterId: ValueDelimiterId | undefined;
}): Promise<PreviewObjectResult> {
    const { asAt, filePreview, inferDataTypes, parserId, startedAt, toolConfigs, valueDelimiterId } = input;
    const { dataFormatId, text } = filePreview;
    const size = filePreview.bytes.length;

    // An empty file is a table with no rows. An issue says so, because it is not an error but the user should know why
    // there is nothing to show.
    if (size === 0) {
        return {
            contentAuditConfig: constructFirstAuditConfig({ asAt, columns: [], hasHeaders: false, isComplete: true, recordCount: 0, size, startedAt }),
            previewConfig: {
                issues: [{ id: 'empty', lineNumber: undefined, message: 'The file is empty.', severityId: 'info' }],
                parsedRecords: [],
                size: 0,
                text: undefined
            },
            readConfig: {
                dataFormatId: 'dtv',
                encodingConfidenceLevel: undefined,
                encodingId: undefined,
                fileType: undefined,
                hasHeaders: false,
                recordDelimiterId: DEFAULT_RECORD_DELIMITER_ID,
                valueDelimiterId: DEFAULT_VALUE_DELIMITER_ID
            }
        };
    }

    if (dataFormatId == null || text == null || listParserToolConfigs(toolConfigs, dataFormatId).length === 0) {
        return {
            contentAuditConfig: constructFirstAuditConfig({ asAt, columns: [], hasHeaders: false, isComplete: filePreview.isComplete, recordCount: 0, size, startedAt }),
            previewConfig: { issues: [], parsedRecords: [], size, text },
            readConfig: {
                dataFormatId: dataFormatId ?? 'unknown',
                encodingConfidenceLevel: filePreview.encodingConfidenceLevel,
                encodingId: filePreview.encodingId,
                fileType: filePreview.fileTypeConfig,
                hasHeaders: undefined,
                recordDelimiterId: undefined,
                valueDelimiterId: undefined
            }
        };
    }

    // Parse the text and, for delimited text, identify its delimiters. With no delimiter found, the text is parsed again
    // with the default, so the records match the delimiter reported. A delimiter the user chose is the only one tried, and
    // is reported even when it does not split the text into a table, so the user sees the result of their choice. Whether the preview holds the whole item decides if a
    // quote left open at its end is an error, or a value the preview cut off.
    const { parser, parserId: usedParserId } = await loadParser(toolConfigs, dataFormatId, parserId);
    const valueDelimiterIds = valueDelimiterId == null ? ORDERED_VALUE_DELIMITER_IDS : [valueDelimiterId];
    const detectedParseTextResult = await parser.parseText(text, { dataFormatId, isComplete: filePreview.isComplete, valueDelimiterIds });
    const isDelimitedText = dataFormatId === 'dtv';
    const parseTextResult =
        isDelimitedText && valueDelimiterId == null && detectedParseTextResult.valueDelimiterId == null
            ? await parser.parseText(text, { dataFormatId, isComplete: filePreview.isComplete, valueDelimiterIds: [DEFAULT_VALUE_DELIMITER_ID] })
            : detectedParseTextResult;

    // Infer and cast values for each parsed record.
    const inferenceSummary = inferDataTypes(parseTextResult.parsedRecords);

    return {
        contentAuditConfig: constructFirstAuditConfig({
            asAt,
            columns: inferenceSummary.columnConfigs,
            hasHeaders: inferenceSummary.hasHeaderRow,
            isComplete: filePreview.isComplete,
            recordCount: Math.max(0, parseTextResult.parsedRecords.length - (inferenceSummary.hasHeaderRow ? 1 : 0)), // A header record names the columns and is not data.
            size,
            startedAt
        }),
        previewConfig: {
            issues: parseTextResult.issues, // Records the parser could not read. The text is still returned, so the user can see them.
            parsedRecords: parseTextResult.parsedRecords,
            size,
            text
        },
        readConfig: {
            dataFormatId,
            encodingConfidenceLevel: filePreview.encodingConfidenceLevel,
            encodingId: filePreview.encodingId,
            fileType: filePreview.fileTypeConfig,
            hasHeaders: inferenceSummary.hasHeaderRow,
            parserId: usedParserId,
            recordDelimiterId: parseTextResult.recordDelimiterId,
            valueDelimiterId: isDelimitedText ? (valueDelimiterId ?? parseTextResult.valueDelimiterId ?? DEFAULT_VALUE_DELIMITER_ID) : parseTextResult.valueDelimiterId
        }
    };
}

// Reads every record of an item, with the tool that read its preview. The caller supplies the stream and owns the abort
// signal, because only the connector knows how to reach its items.
export async function retrieveRecordsWithParser(input: {
    chunk: (typeId: RecordRetrievalTypeId, records: ParsingRecord[]) => void | Promise<void>; // A returned promise holds the read back until it settles.
    options: RetrieveRecordsOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): Promise<RetrieveRecordsSummary> {
    const { chunk, options, signal, stream, toolConfigs } = input;
    const { parser } = await loadParser(toolConfigs, options.dataFormatId, options.parserId);
    return await parser.parseStream(
        stream,
        { abortSignal: signal, chunkSize: options.chunkSize, dataFormatId: options.dataFormatId, encodingId: options.encodingId, valueDelimiterId: options.valueDelimiterId },
        chunk
    );
}

// Reads an item's records from its start, to count them and describe their columns, up to 'options.byteLimit' or until
// 'options.stopSignal' fires. Records are audited one chunk at a time, so the item is never held in memory. 'onProgress'
// receives the number of records in each chunk as it is audited, and the bytes read so far.
export async function auditObjectContentWithParser(input: {
    constructColumnAuditor: (hasHeaders: boolean | undefined) => ColumnAuditor;
    onProgress: (recordCount: number, byteCount: number) => void;
    options: AuditObjectContentOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): Promise<ContentAuditConfig> {
    const { constructColumnAuditor, onProgress, options, signal, stream, toolConfigs } = input;
    const asAt = Date.now();
    const startedAt = performance.now();
    const columnAuditor = constructColumnAuditor(options.hasHeaders);
    const { parser } = await loadParser(toolConfigs, options.dataFormatId, options.parserId);
    const timedSource = timeSourceWaits(stream);
    const auditSource = endAtRecordBoundary(timedSource.stream, options);
    const summary = await parser.parseStream(
        auditSource.stream,
        { abortSignal: signal, chunkSize: options.chunkSize, dataFormatId: options.dataFormatId, encodingId: options.encodingId, valueDelimiterId: options.valueDelimiterId },
        (_typeId, records) => {
            columnAuditor.auditRecords(records);
            onProgress(records.length, auditSource.byteCount());
        }
    );
    const { columnConfigs, hasHeaders } = columnAuditor.completeAudit();
    return {
        asAt,
        byteCount: auditSource.byteCount(),
        columns: columnConfigs,
        commentLineCount: summary.commentLineCount,
        duration: performance.now() - startedAt,
        emptyLineCount: summary.emptyLineCount,
        hasHeaders,
        invalidFieldLengthCount: summary.nonUniformRecordCount,
        isComplete: auditSource.isComplete(),
        lineCount: summary.lineCount,
        recordCount: Math.max(0, summary.recordCount - (hasHeaders ? 1 : 0)), // A header record names the columns and is not data.
        sourceWaitDuration: timedSource.waitDuration()
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The first audit of an item, from the records its preview parsed. The bytes were fetched before it started, so it has no
// wait to report, and the parser's text mode does not count lines.
function constructFirstAuditConfig(input: {
    asAt: number;
    columns: ContentAuditConfig['columns'];
    hasHeaders: boolean;
    isComplete: boolean;
    recordCount: number;
    size: number;
    startedAt: number;
}): ContentAuditConfig {
    const { asAt, columns, hasHeaders, isComplete, recordCount, size, startedAt } = input;
    return {
        asAt,
        byteCount: size,
        columns,
        commentLineCount: undefined,
        duration: performance.now() - startedAt,
        emptyLineCount: undefined,
        hasHeaders,
        invalidFieldLengthCount: undefined,
        isComplete,
        lineCount: undefined,
        recordCount,
        sourceWaitDuration: undefined
    };
}

// Passes the stream through until the limit is reached or the stop signal fires, then ends it just after the next record.
// Ending the stream, rather than aborting, lets the parser finish normally, so its counts are kept and no record is cut
// in two. The limit is a minimum, because a record that runs past it is read to its end. Line breaks inside quotes do not
// end a record, so every byte is checked for quotes, even while no limit is near. A large piece is handed over a part at a
// time, the rest kept for the next read, so the byte count follows what the parser has taken.
function endAtRecordBoundary(
    stream: ReadableStream<Uint8Array>,
    options: Pick<AuditObjectContentOptions, 'byteLimit' | 'encodingId' | 'stopSignal'>
): { byteCount: () => number; isComplete: () => boolean; stream: ReadableStream<Uint8Array> } {
    const reader = stream.getReader();
    const recordEndFinder = constructRecordEndFinder(options.encodingId);
    let byteCount = 0;
    let isComplete = false;
    let pendingBytes: Uint8Array | undefined; // What is left of the last piece read, not yet handed over.
    const boundedStream = new ReadableStream<Uint8Array>(
        {
            async pull(controller): Promise<void> {
                let pieceBytes = pendingBytes;
                if (pieceBytes == null) {
                    const result = await reader.read();
                    if (result.done) {
                        isComplete = true;
                        controller.close();
                        return;
                    }
                    pieceBytes = result.value;
                }
                const bytes = pieceBytes.subarray(0, MAX_AUDIT_READ_BYTE_COUNT); // A view, not a copy.
                pendingBytes = pieceBytes.length > MAX_AUDIT_READ_BYTE_COUNT ? pieceBytes.subarray(MAX_AUDIT_READ_BYTE_COUNT) : undefined;
                const limit = options.stopSignal?.aborted === true ? byteCount : (options.byteLimit ?? Infinity);
                const recordEnd = recordEndFinder(bytes, byteCount, limit - byteCount);
                if (recordEnd == null) {
                    byteCount += bytes.length;
                    controller.enqueue(bytes);
                    return;
                }
                byteCount += recordEnd;
                pendingBytes = undefined;
                controller.enqueue(bytes.subarray(0, recordEnd));
                controller.close();
                await reader.cancel();
            },
            cancel(reason): Promise<void> {
                return reader.cancel(reason);
            }
        },
        { highWaterMark: 0 }
    );
    return { byteCount: () => byteCount, isComplete: () => isComplete, stream: boundedStream };
}

// Finds where the first record to end at or after 'searchFrom' ends in a piece of the item, remembering across pieces
// whether a quote is open. Doubled quotes inside a value close and reopen it, which leaves the answer right. UTF-8 never
// uses these byte values inside a longer character. UTF-16 can, so it is read as two-byte units.
function constructRecordEndFinder(encodingId: string): (bytes: Uint8Array, position: number, searchFrom: number) => number | undefined {
    const decoderId = resolveDecoderId(encodingId);
    const isUtf16 = decoderId.startsWith('utf-16');
    const unitByteCount = isUtf16 ? 2 : 1;
    const lowByteOffset = decoderId === 'utf-16be' ? 1 : 0;
    let quoteIsOpen = false;

    return (bytes, position, searchFrom): number | undefined => {
        for (let index = 0; index < bytes.length; index++) {
            const byte = bytes[index];
            if (byte !== QUOTE_BYTE && byte !== LINE_FEED_BYTE && byte !== CARRIAGE_RETURN_BYTE) continue;
            if (isUtf16 && ((position + index) % 2 !== lowByteOffset || bytes[index + 1 - 2 * lowByteOffset] !== 0)) continue;
            if (byte === QUOTE_BYTE) quoteIsOpen = !quoteIsOpen;
            else if (!quoteIsOpen && index >= searchFrom && (byte === LINE_FEED_BYTE || bytes[index + unitByteCount] !== LINE_FEED_BYTE))
                return index + unitByteCount - lowByteOffset;
        }
    };
}

// Passes the stream through, adding up how long the parser waits for each chunk, so an audit can show how much of its
// time went on fetching the item rather than reading it. A chunk is only asked for when the parser wants one, so the
// wait is time the parser sat idle. The browser keeps receiving the item meanwhile, so this does not slow the fetch.
function timeSourceWaits(stream: ReadableStream<Uint8Array>): { stream: ReadableStream<Uint8Array>; waitDuration: () => number } {
    const reader = stream.getReader();
    let waitDuration = 0;
    const timedStream = new ReadableStream<Uint8Array>(
        {
            async pull(controller): Promise<void> {
                const startedAt = performance.now();
                const result = await reader.read();
                waitDuration += performance.now() - startedAt;
                if (result.done) controller.close();
                else controller.enqueue(result.value);
            },
            cancel(reason): Promise<void> {
                return reader.cancel(reason);
            }
        },
        { highWaterMark: 0 }
    );
    return { stream: timedStream, waitDuration: () => waitDuration };
}

// Loads the tool the user chose for the format, or the format's default. Returns the id of the tool actually used.
async function loadParser(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId: string | undefined): Promise<{ parser: ParserInterface; parserId: string }> {
    const parserToolConfig = resolveParserToolConfig(toolConfigs, dataFormatId, parserId);
    const parser = await loadTool<ParserInterface>(toolConfigs, parserToolConfig.id.slice(TOOL_NAME_PREFIX.length));
    return { parser, parserId: parserToolConfig.id };
}
