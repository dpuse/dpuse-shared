/**
 * Context schema.
 */

// Vendor dependencies.
import { array, literal, number, object } from 'valibot';

// Framework dependencies.
import { moduleConfigCoreFields } from '@/component/moduleConfig.schema';
import { componentConfigCoreFields, componentReferenceSchema } from '@/component/componentConfig.schema';
import { literalUnion } from '~/src/schema';

/**
 *
 */
const contextOperationSchema = literalUnion(['list'] as const);

/**
 *
 */
const contextModelGroupConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: literal('contextModelGroup'),
    modelRefs: array(componentReferenceSchema),
    order: number()
});

// Exposures.
export const contextConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('context'),
    models: array(contextModelGroupConfigSchema),
    operations: array(contextOperationSchema)
});
