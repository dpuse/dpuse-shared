export interface SerialisedError {
    data: Record<string, unknown> | undefined;
    locator: string;
    message: string;
    name: string;
    stack: string | undefined;
}
export declare class DPUseError extends Error {
    readonly data: Record<string, unknown> | undefined;
    readonly locator: string;
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare class AppError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare class APIError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare class EngineError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare class ConnectorError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare class FetchError extends DPUseError {
    constructor(message: string, locator: string, data?: Record<string, unknown>, options?: ErrorOptions);
}
export declare function buildFetchError(response: {
    status: number;
    statusText: string;
    text: () => Promise<string>;
}, message: string, locator: string): Promise<FetchError>;
export declare function concatenateSerialisedErrorMessages(serialisedErrors: SerialisedError[]): string;
export declare function ignoreErrors(action: () => void): void;
export declare function normalizeToError(value: unknown): Error;
export declare function serialiseError(error?: unknown): SerialisedError[];
export declare function unserialiseError(serialisedErrors: SerialisedError[]): Error | undefined;
