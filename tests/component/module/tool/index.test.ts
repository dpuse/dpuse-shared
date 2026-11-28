import { describe, expect, it, vi } from 'vitest';

import { AppError } from '@/errors';
import { constructTextDecoder, listParserToolConfigs, loadTool, resolveParserToolConfig } from '@/component/module/tool';
import type { ParserConfig, TextDecoderLike, ToolConfig } from '@/component/module/tool';

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

// Stands in for the decoder tool's module at the URL 'loadTool' imports it from. Its decoder only names the encoding it
// was asked for, which is all these tests need.
const decoderToolModule = vi.hoisted(() => {
    const constructedWith: unknown[] = [];
    const url = 'https://engine-eu.dpuse.app/tools/iconv-lite-decoder_v1.2.3/dpuse-tool-iconv-lite-decoder.es.js';
    class Tool {
        constructor(toolConfigs: unknown) {
            constructedWith.push(toolConfigs);
        }

        constructDecoder(encodingId: string): TextDecoderLike {
            return { decode: () => `decoded as ${encodingId}`, encoding: encodingId };
        }
    }
    return { constructedWith, Tool, url };
});
vi.mock(decoderToolModule.url, () => ({ Tool: decoderToolModule.Tool }));

describe('constructTextDecoder', () => {
    const toolConfigs = [buildToolConfig('dpuse-tool-iconv-lite-decoder', '1.2.3')];

    it("gives the browser's TextDecoder for an encoding it can read, without loading the decoder tool", async () => {
        const decoder = await constructTextDecoder('macroman', []);

        expect(decoder).toBeInstanceOf(TextDecoder);
        expect(decoder.decode(new Uint8Array([0x8a]))).toBe('ä');
    });

    it('gives a decoder from the decoder tool for an encoding the browser cannot read', async () => {
        const decoder = await constructTextDecoder('cp850', toolConfigs);

        expect(decoder.decode(new Uint8Array([0x84]))).toBe('decoded as cp850');
    });

    it('says the decoder tool was not found when it is not configured', async () => {
        await expect(constructTextDecoder('cp850', [])).rejects.toMatchObject({ message: "Tool 'iconv-lite-decoder' not found." });
    });

    it('hands an encoding neither can read, or a name the table does not know, to TextDecoder, which rejects it', async () => {
        await expect(constructTextDecoder('cp273', toolConfigs)).rejects.toThrow(RangeError);
        await expect(constructTextDecoder('not-an-encoding', toolConfigs)).rejects.toThrow(RangeError);
    });
});

describe('loadTool', () => {
    it('constructs the tool with the tool configs, so it can load another tool', async () => {
        const toolConfigs = [buildToolConfig('dpuse-tool-iconv-lite-decoder', '1.2.3')];

        await loadTool(toolConfigs, 'iconv-lite-decoder');

        expect(decoderToolModule.constructedWith.at(-1)).toBe(toolConfigs);
    });

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

    it('takes the format’s default tool when none is chosen', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv')).toBe(rust);
    });

    it('takes the first tool by id when the format has no default, or its default is not configured', () => {
        const otherJsonTool = buildToolConfig('dpuse-tool-another-json-parser', '1.0.0', ['json']);

        expect(resolveParserToolConfig([jsonTool, otherJsonTool], 'json')).toBe(otherJsonTool);
        expect(resolveParserToolConfig([adaltas, jsonTool], 'dtv')).toBe(adaltas);
    });

    it('takes the chosen tool, even when it is not the first', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv', 'dpuse-tool-rust-csv-core-parser')).toBe(rust);
    });

    it('takes the chosen tool over the default', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv', 'dpuse-tool-adaltas-csv-parser')).toBe(adaltas);
    });

    it('falls back to the default when the chosen one is no longer configured', () => {
        expect(resolveParserToolConfig([adaltas, rust], 'dtv', 'dpuse-tool-removed')).toBe(rust);
    });

    it('falls back to the default when the chosen one no longer reads the format', () => {
        expect(resolveParserToolConfig([adaltas, rust, jsonTool], 'dtv', 'dpuse-tool-json-parser')).toBe(rust);
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
