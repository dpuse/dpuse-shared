// ── External Dependencies & Registrations
import { afterEach, describe, expect, it, vi } from 'vitest';

// ── DPUse Framework
import { fetchObjectContentStream } from '@/component/module/connector';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const LOCATOR = 'dpuse-test.fetchObjectStream';
const OBJECT_PATH = '/World Bank Data/WDICSV.csv';
const OBJECT_URL = 'https://example.com/WDICSV.csv';
const RANGE_BYTE_COUNT = 16_777_216; // The most of an object fetched at a time where the browser does not pause a download.

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('fetchObjectContentStream', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('fetches the whole object in one request where Chromium pauses unread downloads', async () => {
        vi.stubGlobal('navigator', { userAgentData: { brands: [{ brand: 'Chromium' }, { brand: 'Google Chrome' }] } });
        const body = new ReadableStream<Uint8Array>();
        const fetchMock = vi.fn().mockResolvedValue({ body, ok: true });
        vi.stubGlobal('fetch', fetchMock);

        expect(await fetchObjectContentStream(OBJECT_URL, buildOptions({ headers: { Authorization: 'Bearer token' } }))).toBe(body);
        expect(fetchMock).toHaveBeenCalledExactlyOnceWith(OBJECT_URL, { headers: { Authorization: 'Bearer token' }, signal: expect.any(AbortSignal) as AbortSignal });
    });

    it('fetches a range at a time elsewhere, and the next one as the reader takes each', async () => {
        const fetchMock = stubRangeFetch(RANGE_BYTE_COUNT * 2 + 3);
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions({ headers: { Authorization: 'Bearer token' } }));
        const reader = stream.getReader();

        expect(fetchMock).toHaveBeenCalledOnce();
        expect(fetchMock).toHaveBeenLastCalledWith(OBJECT_URL, {
            cache: 'no-store',
            headers: { Authorization: 'Bearer token', Range: 'bytes=0-16777215' },
            signal: expect.any(AbortSignal) as AbortSignal
        });
        const firstRead = await reader.read();
        expect(firstRead.value?.length).toBe(RANGE_BYTE_COUNT);
        expect(fetchMock).toHaveBeenCalledTimes(2); // The second range is fetched while the reader works on the first.
        expect(fetchMock).toHaveBeenLastCalledWith(OBJECT_URL, expect.objectContaining({ headers: { Authorization: 'Bearer token', Range: 'bytes=16777216-33554431' } }));
        const secondRead = await reader.read();
        expect(secondRead.value?.length).toBe(RANGE_BYTE_COUNT);
        expect(fetchMock).toHaveBeenLastCalledWith(OBJECT_URL, expect.objectContaining({ headers: { Authorization: 'Bearer token', Range: 'bytes=33554432-50331647' } }));
        const thirdRead = await reader.read();
        expect(thirdRead.value?.length).toBe(3);
        const lastRead = await reader.read();
        expect(lastRead.done).toBe(true);
        expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('fetches no more than one range ahead of the reader', async () => {
        const fetchMock = stubRangeFetch(RANGE_BYTE_COUNT * 4);
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        await reader.read();
        await new Promise((resolve) => {
            setTimeout(resolve, 0); // Time for a further range to be fetched, were one going to be.
        });

        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('stops the range being fetched ahead when the stream is cancelled', async () => {
        const fetchMock = stubRangeFetch(RANGE_BYTE_COUNT * 4);
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        await reader.read();
        const aheadSignal = (fetchMock.mock.lastCall?.[1] as RequestInit).signal;
        expect(aheadSignal?.aborted).toBe(false);
        await reader.cancel();

        expect(aheadSignal?.aborted).toBe(true);
    });

    it('raises a failure in a range fetched ahead only when the reader asks for that range', async () => {
        const firstResponse = new Response(new Uint8Array(RANGE_BYTE_COUNT), { status: 206 });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(firstResponse).mockRejectedValueOnce(new Error('The connection was lost.')));
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        const firstRead = await reader.read();
        expect(firstRead.value?.length).toBe(RANGE_BYTE_COUNT);
        await expect(reader.read()).rejects.toThrow('The connection was lost.');
    });

    it('ends an object that fills its last range exactly when the next range starts past the end', async () => {
        const fetchMock = stubRangeFetch(RANGE_BYTE_COUNT);
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        const firstRead = await reader.read();
        expect(firstRead.value?.length).toBe(RANGE_BYTE_COUNT);
        const lastRead = await reader.read();
        expect(lastRead.done).toBe(true);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('ends an empty object at once', async () => {
        stubRangeFetch(0);
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        const lastRead = await reader.read();
        expect(lastRead.done).toBe(true);
    });

    it('reads the whole object from a server that ignores ranges', async () => {
        const body = new ReadableStream<Uint8Array>();
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ body, ok: true, status: 200 }));

        expect(await fetchObjectContentStream(OBJECT_URL, buildOptions())).toBe(body);
    });

    it('fails when a later range comes back as the whole object', async () => {
        const firstResponse = new Response(new Uint8Array(RANGE_BYTE_COUNT), { status: 206 });
        const wholeResponse = new Response('whole object');
        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(firstResponse).mockResolvedValueOnce(wholeResponse));
        const stream = await fetchObjectContentStream(OBJECT_URL, buildOptions());
        const reader = stream.getReader();

        await reader.read();
        await expect(reader.read()).rejects.toThrow(`Failed to fetch part of '${OBJECT_PATH}' file.`);
    });

    it('fails with the response status when the object cannot be fetched', async () => {
        const notFoundResponse = new Response('Not found.', { status: 404, statusText: 'Not Found' });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(notFoundResponse));

        await expect(fetchObjectContentStream(OBJECT_URL, buildOptions())).rejects.toThrow(`Failed to fetch '${OBJECT_PATH}' file. Response status '404 - Not Found' received.`);
    });

    it('fails when the response has no body', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ body: null, ok: true, status: 200 }));

        await expect(fetchObjectContentStream(OBJECT_URL, buildOptions())).rejects.toThrow('Readable streams are not supported in this runtime.');
    });
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function buildOptions(overrides: Partial<Parameters<typeof fetchObjectContentStream>[1]> = {}): Parameters<typeof fetchObjectContentStream>[1] {
    return { locator: LOCATOR, path: OBJECT_PATH, signal: new AbortController().signal, ...overrides };
}

// Answers each range request as a server does for an object of the size given, without 'Content-Range', which a server
// need not let the page read.
function stubRangeFetch(totalByteCount: number): ReturnType<typeof vi.fn> {
    const fetchMock = vi.fn((_url: string, init: RequestInit) => {
        const range = /bytes=(\d+)-(\d+)/u.exec((init.headers as { Range: string }).Range);
        const startOffset = Number(range?.[1]);
        if (startOffset >= totalByteCount) return Promise.resolve(new Response(null, { status: 416 }));
        const lastOffset = Math.min(Number(range?.[2]), totalByteCount - 1);
        return Promise.resolve(new Response(new Uint8Array(lastOffset - startOffset + 1), { status: 206 }));
    });
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
}
