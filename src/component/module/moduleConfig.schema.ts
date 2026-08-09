// ── External Dependencies & Registrations
import { object, string } from 'valibot';

// ── DPUse Framework
import { componentCoreFieldsConfig } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';

// ── Schemas - Type Identifier ────────────────────────────────────────────────────────────────────────────────────────

// We include 'app' here so we can monitor updates in 'dpuse-app'.
export const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'cookbook', 'presenter', 'tool']);

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

export const moduleConfigCoreFields = {
    ...componentCoreFieldsConfig,
    version: string()
};

export const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});
