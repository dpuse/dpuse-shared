// ── DPUse Framework
import { AppError } from '@/errors';
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
    // Carries a locator and the ids that were available for the same reason the import failure below does: this is
    // thrown out of a shared module into a caller that can only report what the error itself says.
    if (!toolModuleConfig) {
        const data = { availableToolIds: toolConfigs.map((config) => config.id), toolName };
        throw new AppError(`Tool '${toolId}' not found.`, 'dpuse-shared.component.module.tool.loadTool', data);
    }

    const url = `${LOAD_URL_PREFIX}/${toolId}_v${toolModuleConfig.version}/${toolName}.es.js`;
    try {
        const toolModule = (await import(/* @vite-ignore */ url)) as { Tool: new () => T };
        return new toolModule.Tool();
    } catch (error) {
        // A bare import rejection says only 'Failed to fetch dynamically imported module', which names neither the
        // tool nor the version. The caller reports and displays this error but has no other way to identify the
        // module that went missing, so the identifying detail has to be attached here.
        const data = { toolName, url, version: toolModuleConfig.version };
        throw new AppError(`Failed to load tool '${toolName}' v${toolModuleConfig.version}.`, 'dpuse-shared.component.module.tool.loadTool', data, { cause: error });
    }
}
