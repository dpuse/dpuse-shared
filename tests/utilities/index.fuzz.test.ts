import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { extractExtensionFromPath, extractNameFromPath } from '@/utilities';

// Property-based tests: fast-check generates many random paths per property, including dotfiles, trailing dots and
// dots in parent folders.

const pathArbitrary = fc.array(fc.stringMatching(/^[\w .-]{0,12}$/), { minLength: 1, maxLength: 5 }).map((segments) => segments.join('/'));

describe('path extraction (property-based)', () => {
    it('rebuilds the original path from its name and extension', () => {
        fc.assert(
            fc.property(pathArbitrary, (itemPath) => {
                const name = extractNameFromPath(itemPath);
                const extension = extractExtensionFromPath(itemPath);

                expect(extension === undefined ? name : `${String(name)}.${extension}`).toBe(itemPath === '' ? undefined : itemPath);
            })
        );
    });

    it('never returns an extension containing a folder separator', () => {
        fc.assert(
            fc.property(pathArbitrary, (itemPath) => {
                expect(extractExtensionFromPath(itemPath) ?? '').not.toContain('/');
            })
        );
    });
});
