// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import { ORDERED_VALUE_DELIMITER_IDS } from '@/component/dataView';
import type {
    AuditObjectContentOptions,
    ColumnAuditor,
    ConnectorUtilities,
    RecordRetrievalTypeId,
    RetrieveRecordsOptions,
    RetrieveRecordsSummary
} from '@/component/module/connector';
import type { ContentAuditConfig, DataFormatId, ParsingRecord, PreviewConfig, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
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

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Builds the preview of an item from what the file previewer found, parsing its text with the tool the user chose or the
// first that reads its format. An item that is empty, or of a format no tool reads yet, comes back as itself with no
// records rather than as an error, and its text is kept so the picker can still show it.
export async function buildPreviewConfig(input: {
    asAt: number;
    filePreview: ObjectFilePreview;
    inferDataTypes: ConnectorUtilities['inferDataTypes'];
    parserId: string | undefined;
    startedAt: number; // From 'performance.now()', before the item was fetched.
    toolConfigs: ToolConfig[];
}): Promise<PreviewConfig> {
    const { asAt, filePreview, inferDataTypes, parserId, startedAt, toolConfigs } = input;
    const { dataFormatId, text } = filePreview;
    const size = filePreview.bytes.length;

    // An empty file is a table with no rows. An issue says so, because it is not an error but the user should know why
    // there is nothing to show.
    if (size === 0) {
        return {
            asAt,
            columnConfigs: [],
            dataFormatId: 'dtv',
            duration: performance.now() - startedAt,
            encodingId: undefined,
            encodingConfidenceLevel: undefined,
            fileType: undefined,
            hasHeaders: false,
            recordDelimiterId: DEFAULT_RECORD_DELIMITER_ID,
            parsedRecords: [],
            inferenceRecords: [],
            issues: [{ id: 'empty', lineNumber: undefined, message: 'The file is empty.', severityId: 'info' }],
            size: 0,
            text: undefined,
            valueDelimiterId: DEFAULT_VALUE_DELIMITER_ID
        };
    }

    if (dataFormatId == null || text == null || listParserToolConfigs(toolConfigs, dataFormatId).length === 0) {
        return {
            asAt,
            columnConfigs: [],
            dataFormatId: dataFormatId ?? 'unknown',
            duration: performance.now() - startedAt,
            encodingId: filePreview.encodingId,
            encodingConfidenceLevel: filePreview.encodingConfidenceLevel,
            fileType: filePreview.fileTypeConfig,
            hasHeaders: undefined,
            recordDelimiterId: undefined,
            parsedRecords: [],
            inferenceRecords: [],
            issues: [],
            size,
            text,
            valueDelimiterId: undefined
        };
    }

    // Parse the text and, for delimited text, identify its delimiters. With no delimiter found, the text is parsed again
    // with the default, so the records match the delimiter reported. Whether the preview holds the whole item decides if a
    // quote left open at its end is an error, or a value the preview cut off.
    const { parser, parserId: usedParserId } = await loadParser(toolConfigs, dataFormatId, parserId);
    const detectedParseTextResult = await parser.parseText(text, { dataFormatId, isComplete: filePreview.isComplete, valueDelimiterIds: ORDERED_VALUE_DELIMITER_IDS });
    const isDelimitedText = dataFormatId === 'dtv';
    const parseTextResult =
        isDelimitedText && detectedParseTextResult.valueDelimiterId == null
            ? await parser.parseText(text, { dataFormatId, isComplete: filePreview.isComplete, valueDelimiterIds: [DEFAULT_VALUE_DELIMITER_ID] })
            : detectedParseTextResult;

    // Infer and cast values for each parsed record.
    const inferenceSummary = inferDataTypes(parseTextResult.parsedRecords);

    return {
        asAt,
        columnConfigs: inferenceSummary.columnConfigs,
        dataFormatId,
        duration: performance.now() - startedAt,
        encodingId: filePreview.encodingId,
        encodingConfidenceLevel: filePreview.encodingConfidenceLevel,
        fileType: filePreview.fileTypeConfig,
        hasHeaders: inferenceSummary.hasHeaderRow,
        recordDelimiterId: parseTextResult.recordDelimiterId,
        parsedRecords: parseTextResult.parsedRecords,
        parserId: usedParserId,
        inferenceRecords: inferenceSummary.typedRecords,
        issues: parseTextResult.issues, // Records the parser could not read. The text is still returned, so the user can see them.
        size,
        text,
        valueDelimiterId: isDelimitedText ? (parseTextResult.valueDelimiterId ?? DEFAULT_VALUE_DELIMITER_ID) : parseTextResult.valueDelimiterId
    };
}

// Reads every record of an item, with the tool that read its preview. The caller supplies the stream and owns the abort
// signal, because only the connector knows how to reach its items.
export async function retrieveRecordsWithParser(input: {
    chunk: (typeId: RecordRetrievalTypeId, records: ParsingRecord[]) => void;
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

// Reads every record of an item, to count them and describe their columns. Records are audited one chunk at a time, so
// the item is never held in memory. 'onProgress' receives the number of records in each chunk as it is audited.
export async function auditObjectContentWithParser(input: {
    constructColumnAuditor: (hasHeaders: boolean) => ColumnAuditor;
    onProgress: (recordCount: number) => void;
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
    const summary = await parser.parseStream(
        stream,
        { abortSignal: signal, chunkSize: options.chunkSize, dataFormatId: options.dataFormatId, encodingId: options.encodingId, valueDelimiterId: options.valueDelimiterId },
        (_typeId, records) => {
            columnAuditor.auditRecords(records);
            onProgress(records.length);
        }
    );
    return {
        asAt,
        columns: columnAuditor.completeAudit(),
        commentLineCount: summary.commentLineCount,
        duration: performance.now() - startedAt,
        emptyLineCount: summary.emptyLineCount,
        invalidFieldLengthCount: summary.nonUniformRecordCount,
        lineCount: summary.lineCount,
        recordCount: Math.max(0, summary.recordCount - (options.hasHeaders ? 1 : 0)) // A header record names the columns and is not data.
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Loads the tool the user chose for the format, or the first that reads it. Returns the id of the tool actually used.
async function loadParser(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId: string | undefined): Promise<{ parser: ParserInterface; parserId: string }> {
    const parserToolConfig = resolveParserToolConfig(toolConfigs, dataFormatId, parserId);
    const parser = await loadTool<ParserInterface>(toolConfigs, parserToolConfig.id.slice(TOOL_NAME_PREFIX.length));
    return { parser, parserId: parserToolConfig.id };
}
