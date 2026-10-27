import { safeParse } from 'valibot';
import { describe, expect, it } from 'vitest';

import { DATA_FORMAT_ICON_CONFIGS } from '@/component/dataView';
import { parserConfigSchema, parserDataFormatIdSchema, toolConfigSchema } from '@/component/module/tool/toolConfig.schema';

const TOOL_CONFIG = {
    description: {},
    firstCreatedAt: null,
    icon: null,
    iconDark: null,
    id: 'dpuse-tool-example',
    label: {},
    lastUpdatedAt: null,
    status: null,
    statusId: null,
    typeId: 'tool',
    vendorAccountURL: null,
    vendorDocumentationURL: null,
    vendorHomeURL: null,
    version: '1.0.0'
};

describe('toolConfigSchema', () => {
    it('accepts a tool with no parser or action names, as every existing tool is', () => {
        expect(safeParse(toolConfigSchema, TOOL_CONFIG).success).toBe(true);
    });

    it('accepts a parser that reads several data formats, and the actions the build recorded', () => {
        const config = { ...TOOL_CONFIG, actionNames: ['parseStream', 'parseText'], parser: { dataFormatIds: ['json', 'jsonl'] } };
        expect(safeParse(toolConfigSchema, config).success).toBe(true);
    });

    it('rejects a field it does not know', () => {
        expect(safeParse(toolConfigSchema, { ...TOOL_CONFIG, parsers: [] }).success).toBe(false);
    });

    it('rejects a type other than tool', () => {
        expect(safeParse(toolConfigSchema, { ...TOOL_CONFIG, typeId: 'connector' }).success).toBe(false);
    });
});

describe('parserConfigSchema', () => {
    it('rejects a parser that lists no data format', () => {
        expect(safeParse(parserConfigSchema, { dataFormatIds: [] }).success).toBe(false);
    });

    it('rejects a data format that does not exist', () => {
        expect(safeParse(parserConfigSchema, { dataFormatIds: ['csv'] }).success).toBe(false);
    });

    it("rejects 'unknown', which has no records to read", () => {
        expect(safeParse(parserConfigSchema, { dataFormatIds: ['unknown'] }).success).toBe(false);
    });
});

describe('parserDataFormatIdSchema', () => {
    // Every data format has an icon except 'unknown', and the icons are typed to cover them all, so a format added to
    // 'DataFormatId' without being added to the schema fails here.
    it('lists exactly the data formats that have an icon', () => {
        const schemaIds = parserDataFormatIdSchema.options.map((option) => option.literal);
        expect(schemaIds.toSorted((first, second) => first.localeCompare(second))).toEqual(
            Object.keys(DATA_FORMAT_ICON_CONFIGS).toSorted((first, second) => first.localeCompare(second))
        );
    });
});
