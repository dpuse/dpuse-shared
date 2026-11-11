// ── External Dependencies & Registrations
import type { FileTypeResult } from 'file-type';

// ── DPUse Framework
import type { DataFormatId } from '@/component/dataView';
import type { EncodingDetectionConfig } from '@/encoding';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// What the file previewer tool implements. A connector loads it at run time to read the start of an item, and hands the
// result to 'buildPreviewObjectResult'.
export interface FilePreviewerInterface {
    // 'minimumConfidenceLevel' (0 to 1) sets which encodings the candidate list includes. The best is always included.
    previewFile: (url: string, signal: AbortSignal, chunkSize?: number, mimeType?: string, minimumConfidenceLevel?: number, choices?: PreviewChoices) => Promise<FilePreviewResult>;
}

// What the user chose in place of what detection found. Either can be left to detection.
export interface PreviewChoices {
    dataFormatId: DataFormatId | undefined;
    encodingId: string | undefined;
}

export interface FilePreviewResult {
    bytes: Uint8Array;
    dataFormatId: DataFormatId | undefined;
    encodingId: string | undefined; // The encoding the text was decoded with, which may not be the first candidate.
    encodingConfidenceLevel: number | undefined; // From 0 to 1. Undefined when the encoding was assumed, not detected.
    encodingCandidates: EncodingDetectionConfig[] | undefined; // Every encoding scoring at least the minimum confidence, best first. Empty when the text is all ASCII.
    fileTypeConfig: FileTypeResult | undefined;
    isComplete: boolean; // Whether the preview holds the whole file rather than only its start.
    text: string | undefined;
}
