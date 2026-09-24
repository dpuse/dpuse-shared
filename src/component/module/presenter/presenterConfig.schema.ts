// ── External Dependencies & Registrations
import { array, literal, strictObject } from 'valibot';

// ── DPUse Framework
import { componentReferenceConfigSchema } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// ── Schemas - Action Name ────────────────────────────────────────────────────────────────────────────────────────────

export const presenterActionNameSchema = literalUnion(['list', 'render', 'setColorMode']);

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const presenterConfigSchema = strictObject({
    ...moduleConfigCoreFields,
    typeId: literal('presenter'),
    actionNames: array(presenterActionNameSchema),
    presentations: array(componentReferenceConfigSchema)
});
