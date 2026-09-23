import { describe, expect, it } from 'vitest';

import { encodingConfigMap, getEncodingTypeConfigs } from '@/encoding';

describe('getEncodingTypeConfigs', () => {
    it('returns one config per entry in the encoding map', () => {
        expect(getEncodingTypeConfigs()).toHaveLength(Object.keys(encodingConfigMap).length);
    });

    it('sorts by group label, then by label, leaving the ungrouped encodings first', () => {
        const encodingTypeConfigs = getEncodingTypeConfigs();

        expect(encodingTypeConfigs.slice(0, 3).map((config) => [config.groupLabel, config.label])).toEqual([
            ['', 'ascii'],
            ['', 'utf8'],
            ['Arabic', 'Arabic (iso-8859-6)']
        ]);

        for (const [index, config] of encodingTypeConfigs.slice(1).entries()) {
            const previousConfig = encodingTypeConfigs[index];
            if (previousConfig == null) throw new TypeError('Expected a preceding config.');
            expect(previousConfig.groupLabel.localeCompare(config.groupLabel) || previousConfig.label.localeCompare(config.label)).toBeLessThanOrEqual(0);
        }
    });

    it('falls back to the id when an entry has no label', () => {
        const encodingTypeConfigs = getEncodingTypeConfigs();
        const unlabelled = Object.values(encodingConfigMap).filter((encodingConfig) => !encodingConfig.label);

        for (const encodingConfig of unlabelled) {
            expect(encodingTypeConfigs.find((candidate) => candidate.id === encodingConfig.id)?.label).toBe(encodingConfig.id);
        }
    });
});
