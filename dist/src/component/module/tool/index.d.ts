import { ModuleConfig } from '..';
export interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}
export declare function loadTool<T>(toolConfigs: ToolConfig[], toolId: string): Promise<T>;
