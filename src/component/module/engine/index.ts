// ── DPUse (Local) Framework
import type { ComponentConfig } from '@/component';
import type { EncodingTypeConfig } from '@/encoding';
import type { LocalisedConfig } from '../../../locale';
import type { ModuleConfig } from '@/component/module';
import type { ToolConfig } from '@/component/module/tool';

// ── Types - Runtime ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface EngineRuntime {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}

// ── Types -  Worker ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface EngineWorker {
    initialise: (options: EngineInitialiseOptions) => Promise<void>;
    processRequest: (
        id: string,
        config: ComponentConfig | LocalisedConfig<ComponentConfig>,
        options: EngineAuthActionOptions | EngineConnectorActionOptions | EngineContextActionOptions,
        callback?: (callbackData: EngineCallbackData) => void
    ) => Promise<unknown>;
}

export interface EngineInitialiseOptions {
    connectorStorageURLPrefix: string;
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
    sessionAccessToken?: string;
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

// ── Types -  Configuration ───────────────────────────────────────────────────────────────────────────────────────────

export interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}
