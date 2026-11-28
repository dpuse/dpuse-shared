// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// The part of the browser's 'TextDecoder' that callers use. The decoder tool's decoders match it, so a caller decodes
// the same way whichever one reads the encoding.
export interface TextDecoderLike {
    readonly encoding: string;
    // eslint-disable-next-line unicorn/prefer-options-parameter -- The browser's 'TextDecoder.decode' takes these, and is returned as one.
    decode(input?: Uint8Array, options?: { stream?: boolean }): string;
}

// What the decoder tool implements. It reads the encodings the browser's 'TextDecoder' cannot, and is loaded only when a
// file is in one of them.
export interface DecoderInterface {
    constructDecoder: (encodingId: string) => TextDecoderLike;
}
