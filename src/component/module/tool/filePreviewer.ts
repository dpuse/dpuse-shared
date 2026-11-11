// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { EncodingDetectionConfig } from '@/encoding';
import type { DataFormatId, DataFormatSourceId, EncodingSourceId } from '@/component/dataView';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What the file previewer tool implements. A connector loads it at run time to read the start of an item, and hands the
// result to 'buildPreviewObjectResult'.
export interface FilePreviewerInterface {
    // 'encodingId' is an encoding the user chose. It is used to decode the text, but detection still runs and is reported
    // unchanged.
    previewFile: (url: string, signal: AbortSignal, chunkSize?: number, mimeType?: string, encodingId?: string) => Promise<FilePreviewResult>;
}

export interface FilePreviewResult {
    bytes: Uint8Array;
    dataFormatId: DataFormatId | undefined; // The format detected.
    dataFormatSourceId: DataFormatSourceId | undefined; // Undefined when the file has no format, such as an empty file or a PDF.
    decodedEncodingId: string | undefined; // The encoding the text was decoded with: the chosen one, or the detected one when nothing was chosen. UTF-8 when that encoding cannot be decoded.
    encodingId: string | undefined; // The encoding detected, which may not be the first candidate, because the browser cannot decode them all.
    encodingConfidenceLevel: number | undefined; // From 0 to 1. Undefined when the encoding was assumed, not detected.
    encodingSourceId: EncodingSourceId | undefined; // Undefined when no text was decoded, such as from an empty or binary file.
    encodingCandidates: EncodingDetectionConfig[] | undefined; // Every encoding detected, best first. Empty when the text is all ASCII. Undefined for XML and binary files.
    replacementCharacterCount: number | undefined; // How many '\uFFFD' characters decoding put in place of bytes the decoded encoding cannot read. Undefined when no text was decoded.
    fileTypeConfig: FileTypeResult | undefined;
    isComplete: boolean; // Whether the preview holds the whole file rather than only its start.
    text: string | undefined;
}
