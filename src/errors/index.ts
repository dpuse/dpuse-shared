// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Serializable representation of an error; used for transporting errors across api and worker boundaries
export interface SerialisedError {
    data: Record<string, unknown> | undefined;
    locator: string; // Error locator 'package.module.method'
    message: string; // Human-readable error message
    name: string; // Error class or type name
    stack: string | undefined; // Stack trace if available
}

// ── Constants  ───────────────────────────────────────────────────────────────────────────────────────────────────────

const RESPONSE_ERROR_BODY_LIMIT = 2048;

// ── Errors ───────────────────────────────────────────────────────────────────────────────────────────────────────────

// Base class for all DPUse  errors; includes a locator for the error; never thrown directly
export class DPUseError extends Error {
    readonly data: Record<string, unknown> | undefined;
    readonly locator: string; // Error locator 'package.module.method'
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, options);
        this.name = 'DPUseError';
        this.data = data;
        this.locator = locator;
    }
}

// Thrown when an app (workbench/knowledge) error occurs
export class AppError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, locator, data, options);
        this.name = 'AppError';
    }
}

// Thrown when an API request fails
export class APIError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, locator, data, options);
        this.name = 'APIError';
    }
}

// Thrown when an engine request fails
export class EngineError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, locator, data, options);
        this.name = 'EngineError';
    }
}

// Thrown when an connector operation fails; will always be wrapped in an engine error
export class ConnectorError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, locator, data, options);
        this.name = 'ConnectorError';
    }
}

// Thrown when an HTTP request fails; may include a sanitized portion of the response body for diagnostic purposes
export class FetchError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions) {
        super(message, locator, data, options);
        this.name = 'FetchError';
    }
}

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Builds a fetch error from an HTTP response; includes a text copy of the response body
export async function buildFetchError(response: { status: number; statusText: string; text: () => Promise<string> }, message: string, locator: string): Promise<FetchError> {
    const responseStatusStuff = ` - ${response.statusText}`;
    const fetchMessage = `${message} Response status '${String(response.status)}${response.statusText ? responseStatusStuff : ''}' received.`;
    let bodyText: string;
    try {
        bodyText = await response.text();
    } catch (error) {
        const normalised = normalizeToError(error);
        bodyText = `<body unavailable: ${normalised.message}>`;
    }
    return new FetchError(fetchMessage, locator, { body: sanitizeResponseErrorBody(bodyText) });
}

// Concatenates serialized error messages into a single string
export function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string {
    return serialisedErrors.map((serialisedError) => serialisedError.message).join(' ');
}

// Ignore best-effort cleanup errors to keep teardown noise-free
export function ignoreErrors(action: () => void): void {
    try {
        action();
    } catch {
        // Intentionally ignore errors
    }
}

// Normalizes an unknown thrown value into an error
export function normalizeToError(value: unknown): Error {
    if (value instanceof Error) return value;
    if (typeof value === 'string') return new Error(value);
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return new Error(String(value));
    if (typeof value === 'symbol') return new Error(value.description ?? 'Unknown error');
    if (typeof value === 'object') {
        try {
            return new Error(JSON.stringify(value));
        } catch {
            return new Error('Unknown error');
        }
    }
    return new Error('Unknown error');
}

// Serializes an error and its cause chain into a array of serialised error objects;
// errors are ordered from outermost to root cause;
// cycles in the cause chain are safely ignored;
// messages are normalized to end with punctuation
export function serialiseError(error?: unknown): SerialisedError[] {
    const seenCauses = new Set();
    const serialisedErrors: SerialisedError[] = [];
    let cause: Error | null = normalizeToError(error);
    while (cause != null && !seenCauses.has(cause)) {
        seenCauses.add(cause);
        const [serialisedError, nextCause] = serialiseSingleError(cause);
        if (!/(?:\.{3}|[.!?])$/.test(serialisedError.message)) serialisedError.message += '.';
        serialisedErrors.push(serialisedError);
        cause = nextCause;
    }
    return serialisedErrors;
}

// Unserialises an array of serialised error objects back into an error with a cause chain;
// reconstructs the appropriate error class based on serialized properties;
// chains errors from outermost to root cause using the `cause` option;
// returns `undefined` if the input array is empty
export function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined {
    if (serialisedErrors.length === 0) return undefined;

    // Build the error chain from root cause (end) to outermost (start)
    let rebuiltError: Error | undefined;
    for (const serialised of serialisedErrors.toReversed()) {
        const error = reconstructError(serialised, rebuiltError);
        if (serialised.stack !== undefined) error.stack = serialised.stack; // Restore stack trace if available
        rebuiltError = error;
    }
    return rebuiltError;
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Builds a fallback message for non-error throwables
function buildFallbackMessage(cause: unknown): string {
    let fallbackMessage: string;
    try {
        fallbackMessage = JSON.stringify(cause);
    } catch {
        if (typeof cause === 'symbol') fallbackMessage = cause.description ?? 'Unknown error';
        else if (typeof cause === 'bigint') fallbackMessage = cause.toString();
        else fallbackMessage = 'Unknown error';
    }
    if (fallbackMessage === '') fallbackMessage = 'Unknown error';
    return fallbackMessage;
}

function reconstructError(serialised: SerialisedError, cause: Error | undefined): Error {
    switch (serialised.name) {
        case 'APIError':
            return new APIError(serialised.message, serialised.locator, serialised.data, { cause });
        case 'AppError':
            return new AppError(serialised.message, serialised.locator, serialised.data, { cause });
        case 'ConnectorError':
            return new ConnectorError(serialised.message, serialised.locator, serialised.data, { cause });
        case 'EngineError':
            return new EngineError(serialised.message, serialised.locator, serialised.data, { cause });
        case 'FetchError':
            return new FetchError(serialised.message, serialised.locator, serialised.data, { cause });
        default: {
            const name = serialised.name;
            return new (class extends Error {
                override name = name;
            })(serialised.message, { cause });
        }
    }
}

// Sanitizes a response body; limits body size to avoid excessive payloads when logging
function sanitizeResponseErrorBody(body?: string): string | undefined {
    if (body == null || body === '') return undefined;
    return body.length > RESPONSE_ERROR_BODY_LIMIT ? `${body.slice(0, RESPONSE_ERROR_BODY_LIMIT)}... [truncated]` : body;
}

function serialiseSingleError(cause: Error): [SerialisedError, Error | null] {
    const nextCause = cause.cause == null ? null : normalizeToError(cause.cause);
    if (cause instanceof DPUseError) {
        return [{ data: cause.data, locator: cause.locator, message: cause.message, name: cause.name, stack: cause.stack }, nextCause];
    }
    const customProperties = Object.fromEntries(Object.entries(cause).filter(([k]) => k !== 'cause'));
    if (cause.name) {
        return [{ data: customProperties, locator: '', message: cause.message, name: cause.name, stack: cause.stack }, nextCause];
    }
    return [{ data: customProperties, locator: '', message: buildFallbackMessage(cause), name: 'Error', stack: undefined }, null];
}
