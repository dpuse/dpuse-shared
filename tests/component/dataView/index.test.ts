import { describe, expect, it } from 'vitest';

import { getValueDelimiterCharacter } from '@/component/dataView';

describe('getValueDelimiterCharacter', () => {
    it.each([
        [',', ','],
        ['\t', '\t'],
        ['0x1E', '\u{1E}'],
        ['0x1F', '\u{1F}']
    ] as const)("gives '%s' the character it splits values with", (valueDelimiterId, character) => {
        expect(getValueDelimiterCharacter(valueDelimiterId)).toBe(character);
    });

    it('gives the placeholder no character', () => {
        expect(getValueDelimiterCharacter('')).toBe('');
    });
});
