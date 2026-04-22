import { ComponentConfig } from '../component';
import { EncodingTypeConfig } from '../encoding';
import { LocalisedConfig } from '../locale';
import { ModuleConfig } from '../component/module';
import { ObjectColumnConfig } from '../component/connection';
import { ToolConfig } from '../component/module/tool';
import { InferenceRecord, InferenceSummary, ParsingRecord } from '../component/dataView';
export interface EngineRuntime {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}
export interface EngineWorker {
    initialise: (options: EngineInitialiseOptions) => Promise<void>;
    processRequest: (id: string, config: ComponentConfig | LocalisedConfig<ComponentConfig>, options: EngineAuthActionOptions | EngineConnectorActionOptions | EngineContextActionOptions, callback?: (callbackData: EngineCallbackData) => void) => Promise<unknown>;
}
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
