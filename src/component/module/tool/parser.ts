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

// A parser for a nested format, such as JSON, XML or a workbook, also maps the item's structure. The user browses the map
// and chooses the part that becomes a data view's table, so one item can give several data views. Only the parser knows
// the format, so everything outside it moves through the structure by the locators it hands out.
export interface StructuredParserInterface extends ParserInterface {
    buildStructureIndex: (stream: ReadableStream<Uint8Array>, options: BuildStructureIndexOptions) => Promise<StructureIndex>;
    listStructureEntries: (stream: ReadableStream<Uint8Array>, options: ListStructureEntriesOptions) => Promise<ListStructureEntriesResult>;
}

// ── Parse Text ─ Reads the text of a preview.
export interface ParseTextOptions {
    dataFormatId: DataFormatId;
    isComplete: boolean; // Whether the text is the whole item. A quote left open at the end of cut-off text is a value the preview stopped in, not an error.
    structurePath?: StructurePath | undefined; // The part to read as the table, in a nested format. The top of the item when undefined. Other formats ignore it.
    valueDelimiterIds: ValueDelimiterId[]; // Candidates for delimited text, tried in order. Other formats ignore them.
}

export interface ParseTextResult {
    hasHeaders?: boolean | undefined; // Set by a parser whose first record is always a header, such as column names taken from JSON keys. Undefined when the records must be inspected to tell.
    issues: SampleIssue[]; // Every record the parser could not read, in the order found. Empty when the text parsed cleanly.
    parsedRecords: ParsedRecord[];
    recordDelimiterId: RecordDelimiterId;
    valueDelimiterId: ValueDelimiterId | undefined; // Undefined when the text is not delimited.
}

// ── Parse Stream ─ Reads a whole item, for retrieving records and for an audit.
export interface ParseStreamOptions {
    abortSignal: AbortSignal;
    byteLimit?: number | undefined; // A structured parser stops at the first item to end after this many bytes. Delimited text is cut by the caller instead.
    chunkSize: number | undefined; // Records per chunk. The parser's own default when undefined.
    dataFormatId: DataFormatId;
    encodingId: string;
    stopSignal?: AbortSignal | undefined; // A structured parser stops at the end of the next item and keeps its counts, unlike an abort. Delimited text is cut by the caller instead.
    structurePath?: StructurePath | undefined; // The part to read as the table, in a nested format. The top of the item when undefined. Other formats ignore it.
    valueDelimiterId: ValueDelimiterId;
}

// What a parser counted while reading a whole item, for an audit to report. A header record counts as a record.
export interface ParseStreamSummary extends RetrieveRecordsSummary {
    byteCount: number; // Bytes read.
    commentLineCount: number; // Lines that are wholly a comment.
    emptyLineCount: number; // Lines with nothing on them.
    isComplete?: boolean | undefined; // Set by a structured parser that stopped early at 'byteLimit' or 'stopSignal'. Delimited text leaves the caller to tell.
    lineCount: number; // Lines read.
    nonUniformRecordCount: number; // Records with a different number of values from the first record.
}

// ── Structure ─ How an item is built, read from its start. A preview reads only the start, so its index covers only what
// it read, and a viewer reads further one page at a time.
export interface BuildStructureIndexOptions {
    abortSignal: AbortSignal;
    dataFormatId: DataFormatId;
    encodingId: string; // A parser that cannot read the encoding reports an issue rather than reading the item.
    isComplete: boolean; // Whether the stream holds the whole item. A preview stops part way, which is not an error.
    maxDepth: number | undefined; // Parts nested deeper are counted in their parent but not indexed. The parser's own default when undefined.
    onProgress: ((byteCount: number) => void) | undefined; // Bytes read so far, for a progress bar.
}

export interface StructureIndex {
    byteCount: number; // Bytes read.
    isComplete: boolean; // Whether the whole item was read.
    issues: SampleIssue[]; // Why reading stopped early, such as a syntax error. The nodes read before it are kept.
    nodes: StructureNode[]; // In the order they start, so a parent comes before its children. Only a list's first items are indexed, to show its shape.
    suggestedStructurePath: StructurePath | undefined; // The part to read as the table when only one reads naturally as rows. Undefined when there is none, or several to choose from.
    tableCandidateCount: number;
}

export interface StructureNode {
    checkpoints: StructureCheckpoint[]; // Where every so many items of a list start, so a later page can be read without the items before it. Empty for an object.
    childCount: number; // Those read so far, when the node is not complete.
    isComplete: boolean; // Whether the node ended within what was read.
    isTableCandidate: boolean; // A list whose items are all objects, which reads naturally as rows.
    keys: string[]; // An object's keys, or the keys found in a list's object items, in the order first found. Capped by the parser.
    kindId: StructureContainerKindId;
    locator: StructureLocator;
    path: StructurePath;
}

export interface StructureCheckpoint {
    itemIndex: number;
    locator: StructureLocator;
}

// Where to start reading a part of the item, made by the parser and handed back to it unchanged. A caller only fetches
// the bytes it names, so formats that need more than a byte range to carry on, such as XML namespaces or a workbook's
// shared strings, keep it in 'state'.
export interface StructureLocator {
    endOffset: number | undefined; // The byte after the part. Undefined when it did not end within what was read, so reading goes on to the end of the item.
    startOffset: number;
    state: string | undefined; // The parser's own context for carrying on from 'startOffset'. Undefined when the bytes alone are enough.
}

export type StructureContainerKindId = 'list' | 'object';
export type StructureKindId = StructureContainerKindId | 'boolean' | 'null' | 'number' | 'string';

// The keys and item indexes from the top of the item down to a part. An empty path is the top. Segments are kept apart
// rather than joined, because a key can hold any character, including a dot.
export type StructurePath = (number | string)[];

// Lists one page of the entries of a list or an object, for a viewer that opens one level at a time.
export interface ListStructureEntriesOptions {
    abortSignal: AbortSignal;
    dataFormatId: DataFormatId;
    entryCount: number; // The most entries to list.
    locator: StructureLocator; // The node's own locator, a checkpoint's, or the 'nextLocator' of the page before.
    maxValueLength: number | undefined; // Longer text values are cut short. The parser's own default when undefined.
    path: StructurePath; // The node being listed.
}

export interface ListStructureEntriesResult {
    entries: StructureEntry[];
    issues: SampleIssue[]; // Why listing stopped early, such as a syntax error. The entries read before it are kept.
    nextLocator: StructureLocator | undefined; // Where the next page starts. Undefined when the node has no more entries.
}

export interface StructureEntry {
    childCount: number | undefined; // For a list or an object only.
    isValueCut: boolean; // Whether 'value' was cut short at 'maxValueLength'.
    key: number | string; // An object entry's key, or a list item's index.
    kindId: StructureKindId;
    locator: StructureLocator;
    value: string | undefined; // A number as written, so a long one keeps every digit, and a string as decoded. Undefined for a list, an object or null.
}
