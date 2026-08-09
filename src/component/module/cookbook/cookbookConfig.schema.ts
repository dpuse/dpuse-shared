// ── External Dependencies & Registrations
import { array, literal, object } from 'valibot';

// ── DPUse Framework
import { componentReferenceConfigSchema } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// ── Schemas - Action Name ────────────────────────────────────────────────────────────────────────────────────────────

export const cookbookActionNameSchema = literalUnion(['list']);

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const cookbookConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('cookbook'),
    actionNames: array(cookbookActionNameSchema),
    recipes: array(componentReferenceConfigSchema)
});
