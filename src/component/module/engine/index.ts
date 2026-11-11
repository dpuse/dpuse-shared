// ── DPUse Framework
import type { ComponentInstanceConfig } from '@/component';
import type { EncodingTypeConfigLocalised } from '@/encoding';
import type { LocaleId } from '@/locale/label';
import type { LocalisedConfig } from '@/locale';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/module/tool';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ── Runtime
// TODO: Should this be interface?
export interface EngineRuntime {
    getEncodingTypeConfigs: (localeId: LocaleId) => EncodingTypeConfigLocalised[];
    // eslint-disable-next-line n/no-unsupported-features/node-builtins -- The browser's 'ErrorEvent', not Node's.
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}

// ── Worker
export interface EngineWorker {
    initialise: (options: EngineInitialiseOptions) => Promise<void>;
    processRequest: (
        id: string,
        config: ComponentInstanceConfig | LocalisedConfig<ComponentInstanceConfig>,
        options: EngineAuthActionOptions | EngineConnectorActionOptions | EngineContextActionOptions,
        callback?: (callbackData: EngineCallbackData) => void
    ) => Promise<unknown>;
}

export interface EngineInitialiseOptions {
    connectorStorageURLPrefix: string;
    isLogged: boolean; // Informational console messages. The engine is prebuilt, so it cannot tell a dev app from a prod one.
    toolConfigs: ToolConfig[];
}

export interface EngineAuthActionOptions {
    accountId?: string;
    windowCenterX: number;
    windowCenterY: number;
}

export interface EngineConnectorActionOptions {
    accountId?: string;
    appCheckToken?: string;
    requestId?: string; // Names the request, so the app can stop it with an 'abort' request naming the same id.
    sessionAccessToken?: string;
    signal?: AbortSignal | undefined; // Stops the action when the app aborts its request. The engine adds it, because a signal cannot cross into the worker.
}

export interface EngineContextActionOptions {
    accountId?: string;
    appCheckToken?: string;
    sessionAccessToken?: string;
}

export interface EngineCallbackData {
    typeId: string;
    properties: Record<string, unknown>;
}

// ── Configuration
export interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The signal that stops an action. A request the app did not name has none, so its action gets one that never fires.
export function resolveRequestSignal(options: Pick<EngineConnectorActionOptions, 'signal'>): AbortSignal {
    return options.signal ?? new AbortController().signal;
}
