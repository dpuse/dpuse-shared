import { safeParse } from 'valibot';
import { describe, expect, it } from 'vitest';

import { literalUnion } from '@/schema';
import { componentInstanceConfigSchema, componentTypeIdSchema } from '@/component/componentConfig.schema';
import { localeLabelSchema, partialLocaleLabelSchema } from '@/locale/locale.schema';
import { moduleConfigSchema, moduleTypeIdSchema } from '@/component/module/moduleConfig.schema';

describe('literalUnion', () => {
    it('accepts configured literal values', () => {
        const schema = literalUnion(['alpha', 'beta'] as const);

        const result = safeParse(schema, 'alpha');

        expect(result.success).toBe(true);
        expect(result.output).toBe('alpha');
    });

    it('rejects values outside the configured literal set', () => {
        const schema = literalUnion(['alpha', 'beta'] as const);

        expect(safeParse(schema, 'gamma').success).toBe(false);
    });
});

describe('locale schemas', () => {
    it('requires all locales for localeLabelSchema', () => {
        expect(safeParse(localeLabelSchema, { en: 'English', es: 'Español' }).success).toBe(true);
        expect(safeParse(localeLabelSchema, { en: 'English' }).success).toBe(false);
    });

    it('allows partial locale objects for partialLocaleLabelSchema', () => {
        expect(safeParse(partialLocaleLabelSchema, { en: 'English' }).success).toBe(true);
        expect(safeParse(partialLocaleLabelSchema, {}).success).toBe(true);
    });
});

describe('componentTypeIdSchema', () => {
    it('accepts supported component type ids', () => {
        expect(safeParse(componentTypeIdSchema, 'app').success).toBe(true);
        expect(safeParse(componentTypeIdSchema, 'contextModelEntity').success).toBe(true);
    });

    it('rejects unsupported component type ids', () => {
        expect(safeParse(componentTypeIdSchema, 'unknownComponent').success).toBe(false);
    });
});

// Minimal object satisfying every core component field; the module schema adds the vendor and version fields on top.
const componentInstanceConfig = {
    description: { en: 'A demo component.' },
    firstCreatedAt: null,
    icon: null,
    iconDark: null,
    id: 'demo',
    label: { en: 'Demo' },
    lastUpdatedAt: null,
    status: null,
    statusId: null,
    typeId: 'tool'
};

describe('componentInstanceConfigSchema', () => {
    it('accepts a fully populated component instance', () => {
        expect(safeParse(componentInstanceConfigSchema, componentInstanceConfig).success).toBe(true);
    });

    it('accepts a populated status object', () => {
        const withStatus = { ...componentInstanceConfig, status: { color: 'success', label: 'stable' }, statusId: 'beta' };

        expect(safeParse(componentInstanceConfigSchema, withStatus).success).toBe(true);
    });

    it('rejects a component missing a required field', () => {
        const { id: _id, ...withoutId } = componentInstanceConfig;

        expect(safeParse(componentInstanceConfigSchema, withoutId).success).toBe(false);
    });

    it('rejects a status colour outside the supported set', () => {
        const withBadStatus = { ...componentInstanceConfig, status: { color: 'purple', label: 'stable' } };

        expect(safeParse(componentInstanceConfigSchema, withBadStatus).success).toBe(false);
    });
});

describe('moduleConfigSchema', () => {
    const moduleConfig = { ...componentInstanceConfig, vendorAccountURL: null, vendorDocumentationURL: null, vendorHomeURL: null, version: '1.0.0' };

    it('accepts a complete module configuration', () => {
        expect(safeParse(moduleConfigSchema, moduleConfig).success).toBe(true);
    });

    it('rejects a module without a version', () => {
        const { version: _version, ...withoutVersion } = moduleConfig;

        expect(safeParse(moduleConfigSchema, withoutVersion).success).toBe(false);
    });

    it('rejects a module type id that is not supported', () => {
        expect(safeParse(moduleTypeIdSchema, 'connector').success).toBe(true);
        expect(safeParse(moduleTypeIdSchema, 'dataView').success).toBe(false);
    });
});
