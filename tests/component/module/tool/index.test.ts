import { describe, expect, it } from 'vitest';

import { AppError } from '@/errors';
import { listParserToolConfigs, loadTool, resolveParserToolConfig } from '@/component/module/tool';
import type { ParserConfig, ToolConfig } from '@/component/module/tool';

// Only 'id', 'version' and 'parser' are read; the rest satisfies the shared module config shape.
function buildToolConfig(id: string, version: string, dataFormatIds?: ParserConfig['dataFormatIds']): ToolConfig {
    return {
        ...(dataFormatIds && { parser: { dataFormatIds } }),
        description: {},
        firstCreatedAt: null,
        icon: null,
        iconDark: null,
        id,
        label: {},
        lastUpdatedAt: null,
        status: null,
        statusId: null,
        typeId: 'tool',
        vendorAccountURL: null,
        vendorDocumentationURL: null,
        vendorHomeURL: null,
        version
    };
}

describe('loadTool', () => {
    it('reports the tool ids that were available when the tool is not configured', async () => {
        const toolConfigs = [buildToolConfig('dpuse-tool-d3-visualiser', '1.0.0')];

        await expect(loadTool(toolConfigs, 'missing-tool')).rejects.toThrow(AppError);
        await expect(loadTool(toolConfigs, 'missing-tool')).rejects.toMatchObject({
            data: { availableToolIds: ['dpuse-tool-d3-visualiser'], toolName: 'dpuse-tool-missing-tool' },
            locator: 'dpuse-shared.component.module.tool.loadTool',
            message: "Tool 'missing-tool' not found."
        });
    });

    it('names the tool and version when the module cannot be imported', async () => {
        const toolConfigs = [buildToolConfig('dpuse-tool-broken', '9.9.9')];

        await expect(loadTool(toolConfigs, 'broken')).rejects.toMatchObject({
            data: { toolName: 'dpuse-tool-broken', version: '9.9.9' },
            locator: 'dpuse-shared.component.module.tool.loadTool',
            message: "Failed to load tool 'dpuse-tool-broken' v9.9.9."
        });
    });
});

describe('listParserToolConfigs', () => {
    const adaltas = buildToolConfig('dpuse-tool-adaltas-csv-parser', '1.0.0', ['dtv']);
    const jsonTool = buildToolConfig('dpuse-tool-json-parser', '1.0.0', ['json', 'jsonl']);
    const rust = buildToolConfig('dpuse-tool-rust-csv-core-parser', '1.0.0', ['dtv']);
    const visualiser = buildToolConfig('dpuse-tool-d3-visualiser', '1.0.0');

    it('lists the tools that read the format, sorted by id whatever order they arrive in', () => {
        expect(listParserToolConfigs([rust, jsonTool, visualiser, adaltas], 'dtv')).toEqual([adaltas, rust]);
        expect(listParserToolConfigs([adaltas, visualiser, jsonTool, rust], 'dtv')).toEqual([adaltas, rust]);
    });

    it('lists a tool for each format it reads', () => {
        expect(listParserToolConfigs([adaltas, jsonTool], 'json')).toEqual([jsonTool]);
        expect(listParserToolConfigs([adaltas, jsonTool], 'jsonl')).toEqual([jsonTool]);
    });

    it('lists nothing for a format no tool reads, or for a tool that has no parser', () => {
        expect(listParserToolConfigs([adaltas, visualiser], 'xlsx')).toEqual([]);
        expect(listParserToolConfigs([visualiser], 'dtv')).toEqual([]);
    });
});

describe('resolveParserToolConfig', () => {
    const adaltas = buildToolConfig('dpuse-tool-adaltas-csv-parser', '1.0.0', ['dtv']);
    const rust = buildToolConfig('dpuse-tool-rust-csv-core-parser', '1.0.0', ['dtv']);
    const jsonTool = buildToolConfig('dpuse-tool-json-parser', '1.0.0', ['json']);

    it('takes the first tool by id when none is chosen', () => {
        expect(resolveParserToolConfig([rust, adaltas], 'dtv')).toBe(adaltas);
    });

    it('takes the chosen tool, even when it is not the first', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv', 'dpuse-tool-rust-csv-core-parser')).toBe(rust);
    });

    it('falls back to the first tool when the chosen one is no longer configured', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv', 'dpuse-tool-removed')).toBe(adaltas);
    });

    it('falls back to the first tool when the chosen one no longer reads the format', () => {
        expect(resolveParserToolConfig([adaltas, rust, jsonTool], 'dtv', 'dpuse-tool-json-parser')).toBe(adaltas);
    });

    it('fails, naming the format and the tools available, when no tool reads the format', () => {
        const toolConfigs = [adaltas, jsonTool];

        expect(() => resolveParserToolConfig(toolConfigs, 'xlsx')).toThrow(AppError);
        expect(() => resolveParserToolConfig(toolConfigs, 'xlsx')).toThrow(
            expect.objectContaining({
                data: { availableToolIds: ['dpuse-tool-adaltas-csv-parser', 'dpuse-tool-json-parser'], dataFormatId: 'xlsx' },
                locator: 'dpuse-shared.component.module.tool.resolveParserToolConfig',
                message: "No tool reads the 'xlsx' data format."
            }) as Error
        );
    });
});
