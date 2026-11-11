// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { EncodingDetectionConfig } from '@/encoding';
import type { DataFormatId, DataFormatSourceId, EncodingSourceId } from '@/component/dataView';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What the file previewer tool implements. A connector loads it at run time to read the start of an item, and hands the
// result to 'buildPreviewObjectResult'.
export interface FilePreviewerInterface {
    previewFile: (url: string, signal: AbortSignal, chunkSize?: number, mimeType?: string, choices?: PreviewChoices) => Promise<FilePreviewResult>;
}

// What the user chose in place of what detection found. Either can be left to detection.
export interface PreviewChoices {
    dataFormatId: DataFormatId | undefined;
    encodingId: string | undefined;
}

export interface FilePreviewResult {
    bytes: Uint8Array;
    dataFormatId: DataFormatId | undefined;
    dataFormatSourceId: DataFormatSourceId | undefined; // Undefined when the file has no format, such as an empty file or a PDF.
    encodingId: string | undefined; // The encoding the text was decoded with, which may not be the first candidate.
    encodingConfidenceLevel: number | undefined; // From 0 to 1. Undefined when the encoding was assumed, not detected.
    encodingSourceId: EncodingSourceId | undefined; // Undefined when no text was decoded, such as from an empty or binary file.
    encodingCandidates: EncodingDetectionConfig[] | undefined; // Every encoding detected, best first. Empty when the text is all ASCII. Undefined for XML and binary files.
    replacementCharacterCount: number | undefined; // How many '\uFFFD' characters decoding put in place of bytes the encoding cannot read. Undefined when no text was decoded.
    fileTypeConfig: FileTypeResult | undefined;
    isComplete: boolean; // Whether the preview holds the whole file rather than only its start.
    text: string | undefined;
}
