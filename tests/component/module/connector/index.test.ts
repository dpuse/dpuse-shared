import { describe, expect, it } from 'vitest';

import { determineConnectorUsageId } from '@/component/module/connector';

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
