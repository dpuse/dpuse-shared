import { describe, expect, it } from 'vitest';

import { ENCODING_GROUP_CONFIG_MAP, ENCODING_TYPE_CONFIG_MAP, getEncodingTypeConfigs } from '@/encoding';

// eslint-disable-next-line unicorn/text-encoding-identifier-case -- The encoding id is the standard 'utf-8' that TextDecoder and chardet use, not a Node Buffer encoding.
const UTF_8_ID = 'utf-8';

describe('ENCODING_GROUP_CONFIG_MAP', () => {
    it('keys every group by its own id', () => {
        for (const [key, encodingGroupConfig] of Object.entries(ENCODING_GROUP_CONFIG_MAP)) expect(key).toBe(encodingGroupConfig.id);
    });
});

describe('ENCODING_TYPE_CONFIG_MAP', () => {
    it('keys every encoding by its own id', () => {
        for (const [key, encodingTypeConfig] of Object.entries(ENCODING_TYPE_CONFIG_MAP)) expect(key).toBe(encodingTypeConfig.id);
    });

    // The JSON import types 'groupId' as a plain string, so a misspelt group would otherwise still compile.
    it('refers only to groups that exist', () => {
        for (const { groupId } of Object.values(ENCODING_TYPE_CONFIG_MAP)) if (groupId != null) expect(Object.keys(ENCODING_GROUP_CONFIG_MAP)).toContain(groupId);
    });

    // Ids are the standard names TextDecoder and chardet use, so an encoding offered for decoding must be one TextDecoder accepts.
    it('uses ids TextDecoder accepts for every decodable encoding', () => {
        for (const { id, isDecodable } of Object.values(ENCODING_TYPE_CONFIG_MAP)) if (isDecodable) expect(() => new TextDecoder(id)).not.toThrow();
    });
});

describe('getEncodingTypeConfigs', () => {
    it('returns one config per entry in the encoding map', () => {
        expect(getEncodingTypeConfigs()).toHaveLength(Object.keys(ENCODING_TYPE_CONFIG_MAP).length);
    });

    it('sorts by group label, then by label, leaving the ungrouped encodings first', () => {
        const encodingTypeConfigs = getEncodingTypeConfigs();

        expect(encodingTypeConfigs.slice(0, 3).map((config) => [config.groupLabel, config.label])).toEqual([
            ['', 'ascii'],
            ['', UTF_8_ID],
            ['Arabic', 'Arabic (iso-8859-6)']
        ]);

        for (const [index, config] of encodingTypeConfigs.slice(1).entries()) {
            const previousConfig = encodingTypeConfigs[index];
            if (previousConfig == null) throw new TypeError('Expected a preceding config.');
            expect(previousConfig.groupLabel.localeCompare(config.groupLabel, 'en') || previousConfig.label.localeCompare(config.label, 'en')).toBeLessThanOrEqual(0);
        }
    });

    it('translates the group but never the encoding id', () => {
        const koi8r = getEncodingTypeConfigs('es').find((config) => config.id === 'koi8-r');

        expect(koi8r).toMatchObject({ groupLabel: 'Cirílico', label: 'Cirílico (koi8-r)' });
    });

    it('labels an ungrouped encoding with its id alone', () => {
        expect(getEncodingTypeConfigs('es').find((config) => config.id === UTF_8_ID)).toMatchObject({ groupLabel: '', label: UTF_8_ID });
    });
});
