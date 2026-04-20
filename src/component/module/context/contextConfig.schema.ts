// External Dependencies
import { array, literal, number, object } from 'valibot';

// Local Framework
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';
import { componentConfigCoreFields, componentReferenceSchema } from '@/component/componentConfig.schema';

// Model Group ─────────────────────────────────────────────────────────────────────────────────────────────────────────

const contextModelGroupConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: literal('contextModelGroup'),
    modelRefs: array(componentReferenceSchema),
    order: number()
});

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

const contextOperationSchema = literalUnion(['list'] as const);

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export const contextConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('context'),
    models: array(contextModelGroupConfigSchema),
    operations: array(contextOperationSchema)
});
