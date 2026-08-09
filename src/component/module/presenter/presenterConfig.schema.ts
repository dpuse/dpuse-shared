// ── External Dependencies & Registrations
import { array, literal, object } from 'valibot';

// ── DPUse (Local) Framework
import { componentReferenceSchema } from '@/component/config.schema';
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// ── Schemas - Action Name ────────────────────────────────────────────────────────────────────────────────────────────

export const presenterActionNameSchema = literalUnion(['list', 'render', 'setColorMode']);

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const presenterConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('presenter'),
    actionNames: array(presenterActionNameSchema),
    presentations: array(componentReferenceSchema)
});
