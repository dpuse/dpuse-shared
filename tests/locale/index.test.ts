import { describe, expect, it } from 'vitest';

import { createLabelMap, DEFAULT_LOCALE_ID, localiseConfig, localiseConfigs, resolveLabel } from '@/locale';

describe('createLabelMap', () => {
    it('builds a map from a plain record', () => {
        const labels = createLabelMap({ en: 'English', es: 'Español' });

        expect(labels.get('en')).toBe('English');
        expect(labels.get('es')).toBe('Español');
    });
});

describe('localiseConfig', () => {
    it('localizes label and description for the requested locale', () => {
        const config = {
            description: { en: 'English description', es: 'Descripción' },
            id: 'demo',
            label: { en: 'English label', es: 'Etiqueta' },
            other: 1
        };

        expect(localiseConfig(config, 'es')).toEqual({
            description: ['Descripción'],
            id: 'demo',
            label: 'Etiqueta',
            other: 1
        });
    });

    it('falls back to empty array when localized description is missing', () => {
        const config = { description: {}, id: 'demo', label: {}, other: 1 };

        expect(localiseConfig(config, 'en')).toEqual({
            description: [],
            id: 'demo',
            label: 'demo',
            other: 1
        });
    });
});

describe('localiseConfigs', () => {
    it('localizes every config in the collection', () => {
        const configs = [
            { description: { en: 'First description' }, id: 'first', label: { en: 'First' } },
            { description: {}, id: 'second', label: {} }
        ];

        expect(localiseConfigs(configs, 'en')).toEqual([
            { description: 'First description', id: 'first', label: 'First' },
            { description: '', id: 'second', label: 'second' }
        ]);
    });
});

describe('resolveLabel', () => {
    it('returns the requested locale when present', () => {
        const labels = createLabelMap({ en: 'English', es: 'Español' });

        expect(resolveLabel(labels, 'es')).toBe('Español');
    });

    it('falls back to the default locale when the requested locale is missing', () => {
        const labels = createLabelMap({ [DEFAULT_LOCALE_ID]: 'English' });

        expect(resolveLabel(labels, 'fr')).toBe('English');
    });

    it('returns undefined when neither requested nor fallback locales are present', () => {
        const labels = createLabelMap({ es: 'Español' });

        expect(resolveLabel(labels, 'fr')).toBeUndefined();
        expect(resolveLabel(labels, 'en', 'en')).toBeUndefined();
    });
});
