// ── External Dependencies & Registrations
import { array, literal, number, object } from 'valibot';

// ── DPUse (Local) Framework
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';
import { componentConfigCoreFields, componentReferenceSchema } from '@/component/componentConfig.schema';

// ── Schemas - Area Configuration ─────────────────────────────────────────────────────────────────────────────────────

const contextAreaConfig = object({
    typeId: literal('contextArea'),
    ...componentConfigCoreFields,
    modelRefs: array(componentReferenceSchema),
    order: number()
});

// ── Schemas - Action Name ────────────────────────────────────────────────────────────────────────────────────────────

export const contextActionNameSchema = literalUnion(['listContextFocuses']); // Names of the actions a context may implement.

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const contextConfigSchema = object({
    typeId: literal('context'),
    ...moduleConfigCoreFields,
    actionNames: array(contextActionNameSchema),
    models: array(contextAreaConfig)
});
