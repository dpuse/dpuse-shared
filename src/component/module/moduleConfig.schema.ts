// External Dependencies
import { object, string } from 'valibot';

// Local Framework
import { componentConfigCoreFields } from '@/component/componentConfig.schema';
import { literalUnion } from '@/schema';

// Type ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'context', 'presenter', 'tool']);

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export const moduleConfigCoreFields = {
    ...componentConfigCoreFields,
    version: string()
};

export const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});
