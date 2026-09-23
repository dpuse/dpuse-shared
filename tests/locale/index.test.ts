import { describe, expect, it } from 'vitest';

import { createLabelMap, DEFAULT_LOCALE_ID, localiseConfig, localiseConfigs, localiseReference, resolveLabel } from '@/locale';

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
            description: 'Descripción',
            id: 'demo',
            label: 'Etiqueta',
            other: 1
        });
    });

    it('falls back to an empty string when the localized description is missing', () => {
        const config = { description: {}, id: 'demo', label: {}, other: 1 };

        expect(localiseConfig(config, 'en')).toEqual({
            description: '',
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

describe('localiseConfigs sorting', () => {
    it('sorts by label, falling back to the id when two labels match', () => {
        const configs = [
            { description: {}, id: 'zulu', label: { en: 'Same' } },
            { description: {}, id: 'alpha', label: { en: 'Same' } },
            { description: {}, id: 'first', label: { en: 'Another' } }
        ];

        expect(localiseConfigs(configs, 'en', true).map((config) => config.id)).toEqual(['first', 'alpha', 'zulu']);
    });

    it('preserves the original order when sorting is not requested', () => {
        const configs = [
            { description: {}, id: 'zulu', label: { en: 'Zulu' } },
            { description: {}, id: 'alpha', label: { en: 'Alpha' } }
        ];

        expect(localiseConfigs(configs, 'en').map((config) => config.id)).toEqual(['zulu', 'alpha']);
    });
});

describe('localiseReference', () => {
    it('localizes label and description for the requested locale', () => {
        const reference = { description: { en: 'English description', es: 'Descripción' }, id: 'demo', label: { en: 'English label', es: 'Etiqueta' } };

        expect(localiseReference(reference, 'es')).toEqual({ description: 'Descripción', id: 'demo', label: 'Etiqueta' });
    });

    it('falls back to the id for the label and to an empty string for the description', () => {
        expect(localiseReference({ description: {}, id: 'demo', label: {} }, 'en')).toEqual({ description: '', id: 'demo', label: 'demo' });
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
