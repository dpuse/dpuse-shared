import { describe, expect, it } from 'vitest';

import { AppError } from '@/errors';
import { loadTool } from '@/component/module/tool';
import type { ToolConfig } from '@/component/module/tool';

// Only 'id' and 'version' are read by loadTool; the rest satisfies the shared module config shape.
function buildToolConfig(id: string, version: string): ToolConfig {
    return {
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
