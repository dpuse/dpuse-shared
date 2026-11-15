// ── DPUse Framework
import { buildFetchError, ConnectorError } from '@/errors';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface FetchObjectContentStreamOptions {
    headers?: Record<string, string>; // Sent with every request, such as an authorisation header.
    locator: string; // Names where a failure is raised, e.g. 'dpuse-connector-file-store-emulator.fetchObjectStream'.
    path: string; // The object's path, as the user sees it in a failure message.
    signal: AbortSignal;
}

// The part of the User-Agent Client Hints API that names the browser's engine. Only Chromium has it.
interface UserAgentData {
    brands: { brand: string }[];
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const RANGE_BYTE_COUNT = 33_554_432; // An object is fetched 32 MiB at a time where the browser would otherwise hold all of it.
const RANGE_NOT_SATISFIABLE_STATUS = 416;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Fetches an object's content as a stream that holds no more of it in memory than the reader is about to use. Chromium
// pauses a download while the page is not reading it, so there the object is fetched in one request. Firefox and WebKit,
// which every browser on iOS uses, download a response as fast as the network allows and hold the unread bytes in
// memory, about 1.5 times the size of a 200 MB file in Safari. Elsewhere, then, the object is fetched a range at a time,
// and the next range only when the reader asks for more. The object ends at the first range that comes back short, or
// that starts past the end, so a server that does not let the page read 'Content-Range' still works. A server that
// ignores ranges sends the whole object in one response, which is read as it is. Aborting the signal stops the fetch and
// the reading of the stream it returns.
export async function fetchObjectContentStream(url: string, options: FetchObjectContentStreamOptions): Promise<ReadableStream<Uint8Array>> {
    if (doesFetchPauseUnreadDownloads()) {
        const response = await fetch(url, { headers: options.headers ?? {}, signal: options.signal });
        if (!response.ok) throw await buildFetchError(response, `Failed to fetch '${options.path}' file.`, options.locator);
        return establishResponseBody(response, options);
    }
    const firstResponse = await fetchObjectRange(url, 0, options);
    if (firstResponse.status !== 206 && firstResponse.status !== RANGE_NOT_SATISFIABLE_STATUS) return establishResponseBody(firstResponse, options);
    let nextResponse: Response | undefined = firstResponse;
    let nextOffset = 0;
    return new ReadableStream<Uint8Array>(
        {
            pull: async (controller): Promise<void> => {
                const response = nextResponse ?? (await fetchObjectRange(url, nextOffset, options));
                nextResponse = undefined;
                if (response.status === RANGE_NOT_SATISFIABLE_STATUS) {
                    controller.close();
                    return;
                }
                if (response.status !== 206) throw new ConnectorError(`Failed to fetch part of '${options.path}' file.`, `${options.locator}.range`);
                const bytes = new Uint8Array(await response.arrayBuffer());
                nextOffset += bytes.length;
                if (bytes.length > 0) controller.enqueue(bytes);
                if (bytes.length < RANGE_BYTE_COUNT) controller.close();
            }
        },
        { highWaterMark: 0 } // Fetches nothing until the reader asks.
    );
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Chromium's User-Agent Client Hints name it among the brands, in a page and in a worker alike. Firefox and WebKit have
// no 'userAgentData', and neither do Chrome and Edge on iOS, which are built on WebKit.
function doesFetchPauseUnreadDownloads(): boolean {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins -- The browser's 'navigator', not Node's.
    const { userAgentData } = globalThis.navigator as { userAgentData?: UserAgentData };
    return userAgentData?.brands.some(({ brand }) => brand === 'Chromium') === true;
}

function establishResponseBody(response: Response, options: FetchObjectContentStreamOptions): ReadableStream<Uint8Array> {
    if (response.body == null) throw new ConnectorError('Readable streams are not supported in this runtime.', `${options.locator}.unsupported`);
    return response.body;
}

// A range that starts past the end comes back as 'Range Not Satisfiable', which ends the object rather than failing. The
// browser cache is not used for ranges. A server may compress a whole file but not a range, and Chrome answers a later
// range from the compressed copy it keeps, which cannot be decoded.
async function fetchObjectRange(url: string, startOffset: number, options: FetchObjectContentStreamOptions): Promise<Response> {
    const range = `bytes=${String(startOffset)}-${String(startOffset + RANGE_BYTE_COUNT - 1)}`; // HTTP ranges include their last byte.
    const response = await fetch(url, { cache: 'no-store', headers: { ...options.headers, Range: range }, signal: options.signal });
    if (!response.ok && response.status !== RANGE_NOT_SATISFIABLE_STATUS) throw await buildFetchError(response, `Failed to fetch '${options.path}' file.`, options.locator);
    return response;
}
