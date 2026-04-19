// Local Framework
// import type { ConnectionConfig } from '@/component/connector/connection';
// import type { ContextConfig } from '@/component/context';
import type { EncodingTypeConfig } from '@/encoding';
import type { ModuleConfig } from '@/component/module';
import type { ObjectColumnConfig } from '@/component/module/connector';
import type { ToolConfig } from '@/component/module/tool';
import type { ComponentConfig, ComponentLocalisedConfig } from '@/component';
import type { InferenceRecord, InferenceSummary, ParsingRecord } from '@/component/dataView';

// Engine Runtime ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EngineRuntime {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}

// Engine Worker ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EngineWorker {
    initialise: (options: EngineInitialiseOptions) => Promise<void>;
    processRequest: (
        id: string,
        config: ComponentConfig | ComponentLocalisedConfig,
        options: EngineAuthActionOptions | EngineConnectorActionOptions | EngineContextActionOptions,
        callback?: (callbackData: EngineCallbackData) => void
    ) => Promise<unknown>;
}

// Engine ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
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

export interface EngineUtilities {
    hasReadableStreamTransferSupport(): boolean;
    inferValues: (parsedRecord: ParsingRecord, columnConfigs: ObjectColumnConfig[], leadingRecord: boolean) => InferenceRecord;
    inferDataTypes: (parsedRecords: ParsingRecord[]) => InferenceSummary;
}
