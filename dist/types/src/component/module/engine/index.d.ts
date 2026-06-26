import { ComponentConfig } from '../..';
import { EncodingTypeConfig } from '../../../encoding';
import { LocalisedConfig } from '../../../locale';
import { ModuleConfig } from '..';
import { ToolConfig } from '../tool';
export interface EngineRuntime {
    getEncodingTypeConfigs: (localeId: string) => EncodingTypeConfig[];
    invokeWorker(errorEventCallback: (errorEvent: ErrorEvent) => void): EngineWorker;
}
export interface EngineWorker {
    initialise: (options: EngineInitialiseOptions) => Promise<void>;
    processRequest: (id: string, config: ComponentConfig | LocalisedConfig<ComponentConfig>, options: EngineAuthActionOptions | EngineConnectorActionOptions | EngineContextActionOptions, callback?: (callbackData: EngineCallbackData) => void) => Promise<unknown>;
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
export interface EngineConfig extends ModuleConfig {
    typeId: 'engine';
}
