/**
 * Presenter schema (drafted by Copilot).
 */

/** Dependencies - Vendor. */
import { array, literal, object } from 'valibot';

/** Dependencies - Framework. */
import { moduleConfigCoreFields } from '@/component/moduleConfig.schema';
import { componentReferenceSchema } from '@/component/componentConfig.schema';
import { literalUnion } from '~/src/schema';

const presenterOperationSchema = literalUnion(['list', 'render', 'setColorMode'] as const);

export const presenterConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('presenter'),
    presentations: array(componentReferenceSchema),
    operations: array(presenterOperationSchema)
});
