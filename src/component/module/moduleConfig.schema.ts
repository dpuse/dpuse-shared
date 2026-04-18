// External Dependencies
import { object, string } from 'valibot';

// Local Framework
import { componentConfigCoreFields } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';

// Schema - Type ───────────────────────────────────────────────────────────────────────────────────────────────────────

export const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'context', 'presenter', 'tool']);

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const moduleConfigCoreFields = {
    ...componentConfigCoreFields,
    version: string()
};

export const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});
