import { describe, expect, it } from 'vitest';

import { DATA_FORMAT_ICON_CONFIGS } from '@/component/dataView';

// The app shows each icon as an image, which draws only standalone SVG markup and never runs a script.
describe('DATA_FORMAT_ICON_CONFIGS', () => {
    const icons = Object.entries(DATA_FORMAT_ICON_CONFIGS).flatMap(([id, { icon, iconDark }]) => [
        [id, icon],
        ...(iconDark == null ? [] : [[`${id} dark`, iconDark]])
    ]);

    it.each(icons)('gives %s an SVG that draws as an image', (_, svg) => {
        expect(svg).toMatch(/^<svg [^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
        expect(svg).toMatch(/\bviewBox="/);
        expect(svg).not.toMatch(/<script\b|\son\w+=|javascript:/i);
    });
});
