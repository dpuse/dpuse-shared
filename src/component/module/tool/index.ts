// External Dependencies
import type { ModuleConfig } from '@/component/module';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}

// Helpers ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

export async function loadTool<T>(toolConfigs: ToolConfig[], toolId: string): Promise<T> {
    const toolName = `dpuse-tool-${toolId}`;
    const toolModuleConfig = toolConfigs.find((config) => config.id === toolName);
    if (!toolModuleConfig) throw new Error(`Connector could not load unknown tool '${toolId}'.`);

    const url = `https://engine-eu.dpuse.app/tools/${toolId}_v${toolModuleConfig.version}/${toolName}.es.js`;
    const toolModule = (await import(/* @vite-ignore */ url)) as { Tool: new () => T };
    return new toolModule.Tool();
}
