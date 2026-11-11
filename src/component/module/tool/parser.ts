// ── DPUse Framework
import type { DataFormatId, ParsedRecord, RecordDelimiterId, SampleIssue, ValueDelimiterId } from '@/component/dataView';
import type { ParsedRecordsChunk, RetrieveRecordsSummary } from '@/component/module/connector';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What every parser tool implements. A tool reads one or more data formats and is told which one with each call, so a
// tool that reads both JSON and JSON Lines needs no second class. A parser that cannot read a format leaves it out of
// its config, so these methods are never called with one it does not list.
export interface ParserInterface {
    // Yields the records a chunk at a time, then returns the summary. The parser reads no further until the next chunk is
    // asked for, so a slow receiver, such as a store being written to, holds the read back rather than letting records
    // pile up in memory.
    parseStream: (stream: ReadableStream<Uint8Array>, options: ParseStreamOptions) => AsyncGenerator<ParsedRecordsChunk, ParseStreamSummary, undefined>;
    parseText: (text: string, options: ParseTextOptions) => Promise<ParseTextResult>;
}

// ── Parse Text ─ Reads the text of a preview.
export interface ParseTextOptions {
    dataFormatId: DataFormatId;
    isComplete: boolean; // Whether the text is the whole item. A quote left open at the end of cut-off text is a value the preview stopped in, not an error.
    valueDelimiterIds: ValueDelimiterId[]; // Candidates for delimited text, tried in order. Other formats ignore them.
}

export interface ParseTextResult {
    issues: SampleIssue[]; // Every record the parser could not read, in the order found. Empty when the text parsed cleanly.
    parsedRecords: ParsedRecord[];
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId | undefined; // Undefined when the text is not delimited.
}

// ── Parse Stream ─ Reads a whole item, for retrieving records and for an audit.
export interface ParseStreamOptions {
    abortSignal: AbortSignal;
    chunkSize: number | undefined; // Records per chunk. The parser's own default when undefined.
    dataFormatId: DataFormatId;
    encodingId: string;
    valueDelimiterId: ValueDelimiterId;
}

// What a parser counted while reading a whole item, for an audit to report. A header record counts as a record.
export interface ParseStreamSummary extends RetrieveRecordsSummary {
    byteCount: number; // Bytes read.
    commentLineCount: number; // Lines that are wholly a comment.
    emptyLineCount: number; // Lines with nothing on them.
    lineCount: number; // Lines read.
    nonUniformRecordCount: number; // Records with a different number of values from the first record.
}
