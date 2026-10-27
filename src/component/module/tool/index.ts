// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';

// ── DPUse Framework
import { AppError } from '@/errors';
import type { Component } from '@/component';
import type { DataFormatId } from '@/component/dataView';
import type { parserConfigSchema, toolConfigSchema } from './toolConfig.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { toolConfigSchema } from './toolConfig.schema';

// ── Types - Interface ────────────────────────────────────────────────────────────────────────────────────────────────

type ToolInterface = Component;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type ToolConfig = InferOutput<typeof toolConfigSchema>;

export type ParserConfig = InferOutput<typeof parserConfigSchema>;

// ── Types - Parser ───────────────────────────────────────────────────────────────────────────────────────────────────

export type { ParserInterface, ParseStreamOptions, ParseTextOptions, ParseTextResult } from './parser';

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const LOAD_URL_PREFIX = 'https://engine-eu.dpuse.app/tools';

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// The tools that read the data format, sorted by id. The sort means the first is the same wherever the list came from.
export function listParserToolConfigs(toolConfigs: ToolConfig[], dataFormatId: DataFormatId): ToolConfig[] {
    return toolConfigs
        .filter((config) => config.parser?.dataFormatIds.some((id) => id === dataFormatId) === true)
        .toSorted((first, second) => first.id.localeCompare(second.id, 'en'));
}

// The tool that reads the data format: the one the user chose, or the first of those that read it when none is chosen or
// the chosen one no longer reads it. 'parserId' is the tool's config id, e.g. 'dpuse-tool-adaltas-csv-parser'.
export function resolveParserToolConfig(toolConfigs: ToolConfig[], dataFormatId: DataFormatId, parserId?: string): ToolConfig {
    const parserToolConfigs = listParserToolConfigs(toolConfigs, dataFormatId);
    const [firstParserToolConfig] = parserToolConfigs;
    if (firstParserToolConfig === undefined) {
        const data = { availableToolIds: toolConfigs.map((config) => config.id), dataFormatId };
        throw new AppError(`No tool reads the '${dataFormatId}' data format.`, 'dpuse-shared.component.module.tool.resolveParserToolConfig', data);
    }
    return parserToolConfigs.find((config) => config.id === parserId) ?? firstParserToolConfig;
}

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
