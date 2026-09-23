import { describe, expect, it } from 'vitest';

import { constructConnectorCategoryConfig, constructConnectorUsageConfig, determineConnectorUsageId, getConnectorActionsTable } from '@/component/module/connector';

describe('determineConnectorUsageId', () => {
    it('returns source when only source actions are implemented', () => {
        expect(determineConnectorUsageId(['getRecord', 'listNodes', 'retrieveRecords'])).toBe('source');
    });

    it('returns destination when only destination actions are implemented', () => {
        expect(determineConnectorUsageId(['createObject', 'dropObject', 'upsertRecords'])).toBe('destination');
    });

    it('returns bidirectional when both source and destination actions are implemented', () => {
        expect(determineConnectorUsageId(['retrieveRecords', 'upsertRecords'])).toBe('bidirectional');
    });

    it('returns source when the connector implements no source or destination actions', () => {
        expect(determineConnectorUsageId(['abortOperation', 'describeConnection'])).toBe('source');
    });

    it('returns source when no actions are implemented', () => {
        expect(determineConnectorUsageId([])).toBe('source');
    });
});

describe('constructConnectorCategoryConfig', () => {
    it('localizes a known category', () => {
        expect(constructConnectorCategoryConfig('fileStore')).toEqual({ label: 'File Store', description: '' });
        expect(constructConnectorCategoryConfig('fileStore', 'es')).toEqual({ label: 'Almacén de Archivos', description: '' });
    });

    it('uses the id as the label for an unknown category', () => {
        expect(constructConnectorCategoryConfig('nonsense')).toEqual({ label: 'nonsense', description: '' });
    });
});

describe('constructConnectorUsageConfig', () => {
    it('localizes a known usage', () => {
        expect(constructConnectorUsageConfig('bidirectional')).toEqual({ label: 'Bidirectional', description: '' });
        expect(constructConnectorUsageConfig('source', 'es')).toEqual({ label: 'Origen', description: '' });
    });

    it('uses the id as the label for an unknown usage', () => {
        expect(constructConnectorUsageConfig('nonsense')).toEqual({ label: 'nonsense', description: '' });
    });
});

describe('getConnectorActionsTable', () => {
    it('ticks only the supported actions and lists every action in a markdown table', () => {
        const table = getConnectorActionsTable(['getRecord', 'upsertRecords']);
        const rows = table.trimEnd().split('\n');

        expect(rows[0]).toBe('|Action|Supported|');
        expect(rows[1]).toBe('|:----|:-------:|');
        expect(rows).toHaveLength(17); // Two header rows, then one row per action.
        expect(table).toContain('| Get Record | ✓ |');
        expect(table).toContain('| Upsert Records | ✓ |');
        expect(table).toContain('| Abort Operation |  |');
    });
});
