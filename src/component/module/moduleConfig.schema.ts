// ── External Dependencies & Registrations
import { object, string } from 'valibot';

// ── DPUse (Local) Framework
import { componentConfigCoreFields } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';

// ── Schemas - Type Identifier ────────────────────────────────────────────────────────────────────────────────────────

export const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'context', 'presenter', 'tool']);

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const moduleConfigCoreFields = {
    ...componentConfigCoreFields,
    version: string()
};

export const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});
