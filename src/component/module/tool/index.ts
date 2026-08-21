// ── DPUse Framework
import type { Component } from '@/component';
import type { ModuleConfig } from '@/component/module';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type ToolInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ToolConfig extends ModuleConfig {
    typeId: 'tool';
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const LOAD_URL_PREFIX = 'https://engine-eu.dpuse.app/tools';

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Dynamically load tool.
export async function loadTool<T>(toolConfigs: ToolConfig[], toolId: string): Promise<T> {
    const toolName = `dpuse-tool-${toolId}`;
    const toolModuleConfig = toolConfigs.find((config) => config.id === toolName);
    if (!toolModuleConfig) throw new Error(`Tool '${toolId} not found'.`);

    const url = `${LOAD_URL_PREFIX}/${toolId}_v${toolModuleConfig.version}/${toolName}.es.js`;
    const toolModule = (await import(/* @vite-ignore */ url)) as { Tool: new () => T };
    return new toolModule.Tool();
}
