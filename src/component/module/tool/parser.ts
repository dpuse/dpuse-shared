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

// A parser for a nested format, such as JSON, also maps the item's structure. The user browses the map and chooses the
// list that becomes a data view's table, so one item can give several data views.
export interface StructuredParserInterface extends ParserInterface {
    buildStructureIndex: (stream: ReadableStream<Uint8Array>, options: BuildStructureIndexOptions) => Promise<StructureIndex>;
    listStructureEntries: (stream: ReadableStream<Uint8Array>, options: ListStructureEntriesOptions) => Promise<ListStructureEntriesResult>;
}

// ── Parse Text ─ Reads the text of a preview.
export interface ParseTextOptions {
    dataFormatId: DataFormatId;
    isComplete: boolean; // Whether the text is the whole item. A quote left open at the end of cut-off text is a value the preview stopped in, not an error.
    structurePath?: StructurePath | undefined; // The list to read as the table, in a nested format. The parser's own choice when undefined. Other formats ignore it.
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
    structurePath?: StructurePath | undefined; // The list to read as the table, in a nested format. The parser's own choice when undefined. Other formats ignore it.
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

// ── Structure ─ Offsets count bytes from the start of the item, so a node can be read again on its own from its range.
export interface BuildStructureIndexOptions {
    abortSignal: AbortSignal;
    dataFormatId: DataFormatId;
    maxDepth: number | undefined; // Lists and objects nested deeper are counted in their parent but not indexed. The parser's own default when undefined.
    onProgress: ((byteCount: number) => void) | undefined; // Bytes read so far, for a progress bar.
}

export interface StructureIndex {
    byteCount: number;
    nodes: StructureNode[]; // In the order they start in the item, so a parent comes before its children. Only a list's first items are indexed, to show their shape, and its checkpoints locate the rest.
}

export interface StructureNode {
    checkpoints: StructureCheckpoint[]; // Where every so many items of a list start, so a page of a long list can be read without reading the items before it. Empty for an object.
    childCount: number;
    endOffset: number; // The byte after the node's last byte.
    isTableCandidate: boolean; // A list whose items are all objects, which reads naturally as rows.
    keys: string[]; // An object's keys, or the keys found in a list's object items, in the order first found. Capped by the parser.
    kindId: StructureContainerKindId;
    path: StructurePath;
    startOffset: number;
}

export interface StructureCheckpoint {
    itemIndex: number;
    offset: number;
}

export type StructureContainerKindId = 'list' | 'object';
export type StructureKindId = StructureContainerKindId | 'boolean' | 'null' | 'number' | 'string';

// The keys and item indexes from the top of the item down to a node. An empty path is the top. Segments are kept apart
// rather than joined, because a key can hold any character, including a dot.
export type StructurePath = (number | string)[];

// Lists the entries of one list or object, for a viewer that opens one level at a time. The stream starts at the node,
// or at a checkpoint inside a list to read a later page.
export interface ListStructureEntriesOptions {
    abortSignal: AbortSignal;
    dataFormatId: DataFormatId;
    entryCount: number; // The most entries to list.
    firstItemIndex: number | undefined; // The index of the list item the stream starts at, when it starts at a checkpoint rather than at the node itself.
    maxValueLength: number | undefined; // Longer text values are cut short. The parser's own default when undefined.
    path: StructurePath; // The node being listed. In JSON Lines the top is the list of lines, while a node inside a line is plain JSON.
    startOffset: number; // Where the stream starts in the item, so the entries' offsets count from the start of the item.
}

export interface ListStructureEntriesResult {
    entries: StructureEntry[];
    isMore: boolean; // Whether the node holds more entries than were listed.
}

export interface StructureEntry {
    childCount: number | undefined; // For a list or an object only.
    endOffset: number;
    isValueCut: boolean; // Whether 'value' was cut short at 'maxValueLength'.
    key: number | string; // An object entry's key, or a list item's index.
    kindId: StructureKindId;
    startOffset: number;
    value: string | undefined; // A number as written, so a long one keeps every digit, and a string as decoded. Undefined for a list, an object or null.
}
