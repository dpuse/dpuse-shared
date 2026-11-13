// ── DPUse Framework
import { AppError } from '@/errors';
import { resolveDecoderId } from '@/encoding';
import type { RetrieveRecordsSummary } from '@/component/module/connector';
import type { AuditObjectContentOptions, AuditObjectContentResult, ConnectorUtilities, IndexObjectStructureOptions } from '@/component/module/connector';
import type { ContentAuditConfig, DataFormatId, DeclaredColumnConfig, DeclaredReadingConfig } from '@/component/dataView';
import { DATA_FORMAT_CONFIGS, VALUE_DELIMITER_CONFIGS } from '@/component/dataView';
import type { FilePreviewResult, ListStructureEntriesResult, ParserInterface, ParseTextResult, StructuredParserInterface } from '@/component/module/tool';
import type { ListObjectStructureEntriesOptions, ParsedRecordsChunk, PreviewObjectResult, RetrieveRecordsOptions } from '@/component/module/connector';
import { listParserToolConfigs, loadTool, resolveParserToolConfig, TOOL_NAME_PREFIX } from '@/component/module/tool';
import type { ReadingChoiceConfig, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
import type { StructureIndex, StructurePath, ToolConfig } from '@/component/module/tool';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// Text the previewer takes as delimited is read as delimited even when no delimiter is found, such as a single column
// or rows that split unevenly. It is then read with these, the most common ones. An empty file is read with them too.
const DEFAULT_RECORD_DELIMITER_ID: RecordDelimiterId = '\n';
const DEFAULT_VALUE_DELIMITER_ID: ValueDelimiterId = ',';

// Formats that nest, so the user chooses the part read as the table, and that have no value delimiter.
const STRUCTURED_DATA_FORMAT_IDS = new Set<DataFormatId>(DATA_FORMAT_CONFIGS.filter(({ isStructured }) => isStructured).map(({ id }) => id));

const CARRIAGE_RETURN_BYTE = 0x0d;
const LINE_FEED_BYTE = 0x0a;
const QUOTE_BYTE = 0x22;

// The most an audit hands its parser at a time. WebKit reads an item in pieces of about 18 MB, against about 2 MB in
// Chromium, and the bytes audited are counted as the parser takes them, so a whole piece at once made the progress jump
// in large steps and reach 100% while the parser was still reading.
const MAX_AUDIT_READ_BYTE_COUNT = 1_048_576;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Builds the first audit and preview of an item from what the file previewer found. The reading reports what was
// detected, and never a choice: the detected or declared format, the format's default tool, and the delimiters found.
// The sample and the audit follow the user's choices, so the user sees the result of what they chose. When nothing
// that affects parsing was chosen, one parse serves both. An item that is empty, or of a format no tool reads yet, comes
// back with no records rather than as an error, and its text is kept so the picker can still show it. A source that
// states its columns or how the item is read, such as a resource file beside it, passes them on. They are taken rather
// than inferred or detected, and the reading is marked as declared.
export async function buildPreviewObjectResult(input: {
    asAt: number;
    declaredColumnConfigs?: DeclaredColumnConfig[] | undefined;
    declaredReadingConfig?: DeclaredReadingConfig | undefined;
    filePreview: FilePreviewResult;
    inferDataTypes: ConnectorUtilities['inferDataTypes'];
    readingChoiceConfig: ReadingChoiceConfig | undefined; // The previewer has already decoded the text with the chosen encoding.
    startedAt: number; // From 'performance.now()', before the item was fetched.
    toolConfigs: ToolConfig[];
}): Promise<PreviewObjectResult> {
    const { asAt, declaredColumnConfigs, declaredReadingConfig, filePreview, inferDataTypes, readingChoiceConfig, startedAt, toolConfigs } = input;
    const { isComplete, text } = filePreview;
    const isDeclared = declaredReadingConfig != null;
    const size = filePreview.bytes.length;
    const sampleDecoding = { decodedEncodingId: filePreview.decodedEncodingId, replacementCharacterCount: filePreview.replacementCharacterCount };
    const encodingCandidates = filePreview.encodingCandidates;
    const detectedEncoding = {
        encodingConfidenceLevel: filePreview.encodingConfidenceLevel,
        encodingId: declaredReadingConfig?.encodingId ?? filePreview.encodingId,
        encodingSourceId: declaredReadingConfig?.encodingId == null ? filePreview.encodingSourceId : undefined // A declared encoding was not detected.
    };

    // An empty file is a table with no rows. An issue says so, because it is not an error but the user should know why
    // there is nothing to show.
    if (size === 0) {
        return {
            contentAuditConfig: constructFirstAuditConfig({ asAt, columns: [], isComplete: true, recordCount: 0, size, startedAt }),
            sampleConfig: {
                ...sampleDecoding,
                issues: [
                    {
                        endLineNumber: undefined,
                        fieldNumber: undefined,
                        id: 'empty',
                        lineNumber: undefined,
                        message: 'The file is empty.',
                        recordNumber: undefined,
                        severityId: 'info',
                        value: undefined
                    }
                ],
                dataFormatId: 'dtv',
                hasHeaders: false,
                parsedRecords: [],
                parserId: undefined,
                recordDelimiterId: DEFAULT_RECORD_DELIMITER_ID,
                size: 0,
                text: undefined,
                valueDelimiterId: DEFAULT_VALUE_DELIMITER_ID
            },
            readingConfig: {
                dataFormatId: 'dtv',
                dataFormatSourceId: undefined,
                ...detectedEncoding,
                fileType: undefined,
                hasHeaders: false,
                isDeclared,
                parserId: undefined,
                recordDelimiterId: DEFAULT_RECORD_DELIMITER_ID,
                valueDelimiterId: DEFAULT_VALUE_DELIMITER_ID
            },
            encodingCandidates
        };
    }

    // Detection parses with the detected or declared format and the format's default tool. The sample parses again only
    // when the user chose a format, a tool or a value delimiter.
    // A nested format is mapped from the preview's bytes first, and its parser suggests the part to read as the table.
    const detectedDataFormatId = declaredReadingConfig?.dataFormatId ?? filePreview.dataFormatId;
    const declaredValueDelimiterId = declaredReadingConfig?.valueDelimiterId;
    const detectedStructureIndex = await previewStructure({ dataFormatId: detectedDataFormatId, filePreview, parserId: undefined, toolConfigs });
    const detectedParse = await parsePreviewText({
        dataFormatId: detectedDataFormatId,
        isComplete,
        parserId: undefined,
        structureIndex: detectedStructureIndex,
        structurePath: detectedStructureIndex?.suggestedStructurePath,
        text,
        toolConfigs,
        valueDelimiterId: declaredValueDelimiterId
    });
    const sampleDataFormatId = readingChoiceConfig?.dataFormatId ?? detectedDataFormatId;
    const isFormatChosen = readingChoiceConfig?.dataFormatId != null || readingChoiceConfig?.parserId != null;
    const isParseChosen = isFormatChosen || readingChoiceConfig?.valueDelimiterId != null || readingChoiceConfig?.structurePath != null;
    const sampleStructureIndex = isFormatChosen
        ? await previewStructure({ dataFormatId: sampleDataFormatId, filePreview, parserId: readingChoiceConfig.parserId, toolConfigs })
        : detectedStructureIndex;
    const sampleParse = isParseChosen
        ? await parsePreviewText({
              dataFormatId: sampleDataFormatId,
              isComplete,
              parserId: readingChoiceConfig.parserId,
              structureIndex: sampleStructureIndex,
              structurePath: readingChoiceConfig.structurePath ?? sampleStructureIndex?.suggestedStructurePath,
              text,
              toolConfigs,
              valueDelimiterId: declaredValueDelimiterId ?? readingChoiceConfig.valueDelimiterId
          })
        : detectedParse;

    // Infer and cast values for each parsed record. Detection is inferred separately only when the sample was parsed
    // with choices, because the header record can differ.
    // A parser whose first record is always a header, such as JSON keys, says so, and is not second-guessed.
    const sampleRecords = sampleParse?.parseTextResult.parsedRecords ?? [];
    const sampleHasHeaders = sampleParse?.parseTextResult.hasHeaders ?? declaredReadingConfig?.hasHeaders;
    const sampleInference = sampleParse == null ? undefined : inferDataTypes(sampleRecords, sampleHasHeaders, declaredColumnConfigs);
    const detectedInference =
        isParseChosen && detectedParse != null
            ? inferDataTypes(detectedParse.parseTextResult.parsedRecords, detectedParse.parseTextResult.hasHeaders ?? declaredReadingConfig?.hasHeaders, declaredColumnConfigs)
            : sampleInference;

    return {
        contentAuditConfig: constructFirstAuditConfig({
            asAt,
            columns: sampleInference?.columnConfigs ?? [],
            isComplete,
            recordCount: Math.max(0, sampleRecords.length - (sampleInference?.hasHeaders === true ? 1 : 0)), // A header record names the columns and is not data.
            size,
            startedAt
        }),
        sampleConfig: {
            ...sampleDecoding,
            dataFormatId: sampleDataFormatId ?? 'unknown',
            hasHeaders: sampleInference?.hasHeaders,
            issues: sampleParse?.parseTextResult.issues ?? [], // Records the parser could not read. The text is still returned, so the user can see them.
            parsedRecords: sampleRecords,
            parserId: sampleParse?.parserId,
            recordDelimiterId: sampleParse?.parseTextResult.recordDelimiterId,
            size,
            structurePath: sampleParse?.structurePath,
            text,
            valueDelimiterId: sampleParse?.valueDelimiterId
        },
        readingConfig: {
            dataFormatId: detectedDataFormatId ?? 'unknown',
            dataFormatSourceId: declaredReadingConfig == null ? filePreview.dataFormatSourceId : undefined, // A declared format was not detected.
            ...detectedEncoding,
            fileType: filePreview.fileTypeConfig,
            hasHeaders: detectedInference?.hasHeaders,
            isDeclared,
            parserId: detectedParse?.parserId,
            recordDelimiterId: detectedParse?.parseTextResult.recordDelimiterId,
            structurePath: detectedStructureIndex?.suggestedStructurePath,
            valueDelimiterId: detectedParse?.valueDelimiterId
        },
        encodingCandidates,
        structureIndex: sampleStructureIndex
    };
}

// Reads every record of an item, with the tool that read its preview. The caller supplies the stream and owns the abort
// signal, because only the connector knows how to reach its items.
export async function* retrieveRecordsWithParser(input: {
    options: RetrieveRecordsOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): AsyncGenerator<ParsedRecordsChunk, RetrieveRecordsSummary, undefined> {
    const { options, signal, stream, toolConfigs } = input;
    const { encodingId, valueDelimiterId } = establishFileReading(options);
    const { parser } = await loadParser(toolConfigs, options.dataFormatId, options.parserId);
    const { recordCount } = yield* parser.parseStream(stream, {
        abortSignal: signal,
        chunkSize: options.chunkSize,
        dataFormatId: options.dataFormatId,
        encodingId,
        structurePath: options.structurePath,
        valueDelimiterId
    });
    return { recordCount }; // The parser's counts of lines and bytes are for an audit, so they are not passed on.
}

// Reads an item's records from its start, to count them and describe their columns, up to 'options.byteLimit' or until
// 'options.stopSignal' fires. Records are audited one chunk at a time, so the item is never held in memory. 'onProgress'
// receives the number of records in each chunk as it is audited, and the bytes read so far. A source that states its
// columns passes them on, so the audit takes their types rather than inferring them.
export async function auditObjectContentWithParser(input: {
    constructColumnAuditor: ConnectorUtilities['constructColumnAuditor'];
    declaredColumnConfigs?: DeclaredColumnConfig[] | undefined;
    onProgress: (recordCount: number, byteCount: number) => void;
    options: AuditObjectContentOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): Promise<AuditObjectContentResult> {
    const { constructColumnAuditor, declaredColumnConfigs, onProgress, options, signal, stream, toolConfigs } = input;
    const { encodingId, valueDelimiterId } = establishFileReading(options);
    const asAt = Date.now();
    const startedAt = performance.now();
    const columnAuditor = constructColumnAuditor(options.hasHeaders, declaredColumnConfigs);
    const { parser } = await loadParser(toolConfigs, options.dataFormatId, options.parserId);
    const timedSource = timeSourceWaits(stream);
    // Delimited text is cut at a record boundary here. A nested format can only be cut between its items, which only its
    // parser can find, so it is given the limit and the stop signal instead.
    const isStructured = STRUCTURED_DATA_FORMAT_IDS.has(options.dataFormatId);
    const auditSource = isStructured ? countBytes(timedSource.stream) : endAtRecordBoundary(timedSource.stream, { byteLimit: options.byteLimit, encodingId, stopSignal: options.stopSignal });
    const parsing = parser.parseStream(auditSource.stream, {
        abortSignal: signal,
        byteLimit: isStructured ? options.byteLimit : undefined,
        chunkSize: options.chunkSize,
        dataFormatId: options.dataFormatId,
        encodingId,
        stopSignal: isStructured ? options.stopSignal : undefined,
        structurePath: options.structurePath,
        valueDelimiterId
    });
    // Read with 'next' rather than 'for await', which drops the summary the parser returns at the end.
    let parsed = await parsing.next();
    while (parsed.done !== true) {
        try {
            columnAuditor.auditRecords(parsed.value.records);
            onProgress(parsed.value.records.length, auditSource.byteCount());
        } catch (error) {
            await parsing.throw(error); // Lets the parser stop its read, then rethrows the error.
            throw error;
        }
        parsed = await parsing.next();
    }
    const summary = parsed.value;
    const { columnConfigs, hasHeaders } = columnAuditor.completeAudit();
    const contentAuditConfig: ContentAuditConfig = {
        asAt,
        byteCount: auditSource.byteCount(),
        columns: columnConfigs,
        commentLineCount: summary.commentLineCount,
        duration: performance.now() - startedAt,
        emptyLineCount: summary.emptyLineCount,
        invalidFieldLengthCount: summary.nonUniformRecordCount,
        isComplete: summary.isComplete ?? auditSource.isComplete(),
        lineCount: summary.lineCount,
        recordCount: Math.max(0, summary.recordCount - (hasHeaders ? 1 : 0)), // A header record names the columns and is not data.
        sourceWaitDuration: timedSource.waitDuration()
    };
    return { contentAuditConfig, hasHeaders };
}

// Maps the structure of a whole nested item, reporting the bytes read as it goes. A syntax error ends the map early and
// is reported in it, with what was read before it kept.
export async function indexObjectStructureWithParser(input: {
    onProgress: (byteCount: number) => void;
    options: IndexObjectStructureOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): Promise<StructureIndex> {
    const { onProgress, options, signal, stream, toolConfigs } = input;
    const parser = await loadStructuredParser(toolConfigs, options.dataFormatId, options.parserId);
    const encodingId = options.encodingId ?? 'utf-8';
    return await parser.buildStructureIndex(stream, { abortSignal: signal, dataFormatId: options.dataFormatId, encodingId, isComplete: true, maxDepth: undefined, onProgress });
}

// Lists one page of a part of a nested item. The stream must start at the locator's start offset and may stop at its end
// offset, so a connector that can read part of an item reads only those bytes.
export async function listObjectStructureEntriesWithParser(input: {
    options: ListObjectStructureEntriesOptions;
    signal: AbortSignal;
    stream: ReadableStream<Uint8Array>;
    toolConfigs: ToolConfig[];
}): Promise<ListStructureEntriesResult> {
    const { options, signal, stream, toolConfigs } = input;
    const parser = await loadStructuredParser(toolConfigs, options.dataFormatId, options.parserId);
    return await parser.listStructureEntries(stream, {
        abortSignal: signal,
        dataFormatId: options.dataFormatId,
        entryCount: options.entryCount,
        locator: options.locator,
        maxValueLength: options.maxValueLength,
        path: options.structurePath
    });
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Only a file has an encoding and a value delimiter, and a parser needs both to read one. A nested format has no value
// delimiter.
function establishFileReading(options: { dataFormatId: DataFormatId; encodingId: string | undefined; path: string; valueDelimiterId: ValueDelimiterId | undefined }): {
    encodingId: string;
    valueDelimiterId: ValueDelimiterId;
} {
    const valueDelimiterId = options.valueDelimiterId ?? (STRUCTURED_DATA_FORMAT_IDS.has(options.dataFormatId) ? '' : undefined);
    if (valueDelimiterId == null || options.encodingId == null) throw new Error(`'${options.path}' has no encoding or value delimiter, which a parser needs to read it.`);
    return { encodingId: options.encodingId, valueDelimiterId };
}

// The first audit of an item, from the records its preview parsed. The bytes were fetched before it started, so it has no
// wait to report, and the parser's text mode does not count lines.
function constructFirstAuditConfig(input: {
    asAt: number;
    columns: ContentAuditConfig['columns'];
    isComplete: boolean;
    recordCount: number;
    size: number;
    startedAt: number;
}): ContentAuditConfig {
    const { asAt, columns, isComplete, recordCount, size, startedAt } = input;
    return {
        asAt,
        byteCount: size,
        columns,
        commentLineCount: undefined,
        duration: performance.now() - startedAt,
        emptyLineCount: undefined,
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
    options: Pick<AuditObjectContentOptions, 'byteLimit' | 'stopSignal'> & { encodingId: string }
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

// Passes the stream through, counting the bytes the parser has taken, for an audit's progress.
function countBytes(stream: ReadableStream<Uint8Array>): { byteCount: () => number; isComplete: () => boolean; stream: ReadableStream<Uint8Array> } {
    const reader = stream.getReader();
    let byteCount = 0;
    let isComplete = false;
    const countedStream = new ReadableStream<Uint8Array>(
        {
            async pull(controller): Promise<void> {
                const result = await reader.read();
                if (result.done) {
                    isComplete = true;
                    controller.close();
                    return;
                }
                byteCount += result.value.length;
                controller.enqueue(result.value);
            },
            cancel(reason): Promise<void> {
                return reader.cancel(reason);
            }
        },
        { highWaterMark: 0 }
    );
    return { byteCount: () => byteCount, isComplete: () => isComplete, stream: countedStream };
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
// Parses the preview text in a data format, with the tool and value delimiter given, or else the format's default tool
// and the delimiter detected. Returns undefined when there is no text, or no tool reads the format yet. Delimited text
// with no delimiter found is parsed again with the default delimiter, so the records match the delimiter reported. A
// delimiter that was given is the only one tried. Whether the preview holds the whole item decides if a quote left open
// at its end is an error, or a value the preview cut off.
// A nested format whose structure was mapped is read from the part at 'structurePath'. With no part chosen or suggested,
// there are no records until the user chooses one. When its structure could not be read at all, such as in an encoding
// its parser does not read, the structure's issues are the sample's.
async function parsePreviewText(input: {
    dataFormatId: DataFormatId | undefined;
    isComplete: boolean;
    parserId: string | undefined;
    structureIndex: StructureIndex | undefined;
    structurePath: StructurePath | undefined;
    text: string | undefined;
    toolConfigs: ToolConfig[];
    valueDelimiterId: ValueDelimiterId | undefined;
}): Promise<{ parserId: string; parseTextResult: ParseTextResult; structurePath: StructurePath | undefined; valueDelimiterId: ValueDelimiterId | undefined } | undefined> {
    const { dataFormatId, isComplete, parserId, structureIndex, structurePath, text, toolConfigs, valueDelimiterId } = input;
    if (dataFormatId == null || text == null || listParserToolConfigs(toolConfigs, dataFormatId).length === 0) return undefined;

    const { parser, parserId: usedParserId } = await loadParser(toolConfigs, dataFormatId, parserId);
    if (structureIndex != null) {
        const isUnreadable = structureIndex.nodes.length === 0 && structureIndex.issues.length > 0;
        if (isUnreadable || structurePath == null) {
            const issues = isUnreadable ? structureIndex.issues : [];
            return { parserId: usedParserId, parseTextResult: { issues, parsedRecords: [], recordDelimiterId: '\n', valueDelimiterId: undefined }, structurePath: undefined, valueDelimiterId: undefined };
        }
        const parseTextResult = await parser.parseText(text, { dataFormatId, isComplete, structurePath, valueDelimiterIds: [] });
        return { parserId: usedParserId, parseTextResult, structurePath, valueDelimiterId: undefined };
    }
    const valueDelimiterIds = valueDelimiterId == null ? VALUE_DELIMITER_CONFIGS.map(({ id }) => id) : [valueDelimiterId];
    const firstParseTextResult = await parser.parseText(text, { dataFormatId, isComplete, valueDelimiterIds });
    const isDelimitedText = dataFormatId === 'dtv';
    const parseTextResult =
        isDelimitedText && valueDelimiterId == null && firstParseTextResult.valueDelimiterId == null
            ? await parser.parseText(text, { dataFormatId, isComplete, valueDelimiterIds: [DEFAULT_VALUE_DELIMITER_ID] })
            : firstParseTextResult;
    const reportedValueDelimiterId = isDelimitedText ? (valueDelimiterId ?? parseTextResult.valueDelimiterId ?? DEFAULT_VALUE_DELIMITER_ID) : parseTextResult.valueDelimiterId;
    return { parserId: usedParserId, parseTextResult, structurePath: undefined, valueDelimiterId: reportedValueDelimiterId };
}

// Maps the structure of a nested item from the preview's bytes, with the tool that reads its format. Undefined for a
// format that does not nest, or when its tool does not map structure, which then reads the item its own way.
async function previewStructure(input: {
    dataFormatId: DataFormatId | undefined;
    filePreview: FilePreviewResult;
    parserId: string | undefined;
    toolConfigs: ToolConfig[];
}): Promise<StructureIndex | undefined> {
    const { dataFormatId, filePreview, parserId, toolConfigs } = input;
    const isMapped =
        dataFormatId != null &&
        STRUCTURED_DATA_FORMAT_IDS.has(dataFormatId) &&
        listParserToolConfigs(toolConfigs, dataFormatId).length > 0 &&
        resolveParserToolConfig(toolConfigs, dataFormatId, parserId).actionNames?.includes('buildStructureIndex') === true;
    if (!isMapped) return undefined;
    const parser = await loadStructuredParser(toolConfigs, dataFormatId, parserId);
    const stream = new Blob([filePreview.bytes as Uint8Array<ArrayBuffer>]).stream();
    const encodingId = filePreview.decodedEncodingId ?? 'utf-8';
    return await parser.buildStructureIndex(stream, {
        abortSignal: new AbortController().signal, // The bytes are already in memory, so there is nothing to cancel.
        dataFormatId,
        encodingId,
        isComplete: filePreview.isComplete,
        maxDepth: undefined,
        onProgress: undefined
    });
}

async function loadParser(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId: string | undefined): Promise<{ parser: ParserInterface; parserId: string }> {
    const parserToolConfig = resolveParserToolConfig(toolConfigs, dataFormatId, parserId);
    const parser = await loadTool<ParserInterface>(toolConfigs, parserToolConfig.id.slice(TOOL_NAME_PREFIX.length));
    return { parser, parserId: parserToolConfig.id };
}

// The tool for a nested format, which must also map structure.
async function loadStructuredParser(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId: string | undefined): Promise<StructuredParserInterface> {
    const { parser, parserId: usedParserId } = await loadParser(toolConfigs, dataFormatId, parserId);
    if (!('buildStructureIndex' in parser)) {
        throw new AppError(`Tool '${usedParserId}' does not map the structure of '${dataFormatId}' items.`, 'dpuse-shared.component.module.connector.objectParsing.loadStructuredParser');
    }
    return parser as StructuredParserInterface;
}
