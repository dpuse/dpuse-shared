import { describe, expect, it } from 'vitest';
import { safeParse } from 'valibot';

import { componentTypeIdSchema } from '@/component/componentConfig.schema';
import { localeLabelSchema, partialLocaleLabelSchema } from '@/locale/locale.schema';
import { literalUnion } from '@/schema';

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
