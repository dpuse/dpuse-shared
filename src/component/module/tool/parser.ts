// ── DPUse Framework
import type { DataFormatId, ParsingRecord, PreviewIssue, RecordDelimiterId, ValueDelimiterId } from '@/component/dataView';
import type { RecordRetrievalTypeId, RetrieveRecordsSummary } from '@/component/module/connector';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What every parser tool implements. A tool reads one or more data formats and is told which one with each call, so a
// tool that reads both JSON and JSON Lines needs no second class. A parser that cannot read a format leaves it out of
// its config, so these methods are never called with one it does not list.
export interface ParserInterface {
    parseStream: (
        stream: ReadableStream<Uint8Array>,
        options: ParseStreamOptions,
        chunk: (typeId: RecordRetrievalTypeId, records: ParsingRecord[]) => void
    ) => Promise<RetrieveRecordsSummary>;
    parseText: (text: string, options: ParseTextOptions) => Promise<ParseTextResult>;
}

// ── Parse Text ─ Reads the text of a preview.
export interface ParseTextOptions {
    dataFormatId: DataFormatId;
    isComplete: boolean; // Whether the text is the whole item. A quote left open at the end of cut-off text is a value the preview stopped in, not an error.
    valueDelimiterIds: ValueDelimiterId[]; // Candidates for delimited text, tried in order. Other formats ignore them.
}

export interface ParseTextResult {
    issues: PreviewIssue[]; // Every record the parser could not read, in the order found. Empty when the text parsed cleanly.
    parsedRecords: ParsingRecord[];
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId | undefined; // Undefined when the text is not delimited.
}

// ── Parse Stream ─ Reads a whole item, for retrieving records and for an audit.
export interface ParseStreamOptions {
    abortSignal: AbortSignal;
    chunkSize: number | undefined; // Records per call of 'chunk'. The parser's own default when undefined.
    dataFormatId: DataFormatId;
    encodingId: string;
    valueDelimiterId: ValueDelimiterId;
}
