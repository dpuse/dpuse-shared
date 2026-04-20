// External Dependencies
import { array, literal, object } from 'valibot';

// Local Framework
import { componentReferenceSchema } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// Operations ──────────────────────────────────────────────────────────────────────────────────────────────────────────

const presenterOperationNameSchema = literalUnion(['list', 'render', 'setColorMode']);

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export const presenterConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('presenter'),
    presentations: array(componentReferenceSchema),
    operations: array(presenterOperationNameSchema)
});
