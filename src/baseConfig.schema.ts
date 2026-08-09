// ── External Dependencies & Registrations
import { nullable, string } from 'valibot';

// ── DPUse Framework
import { partialLocaleDescriptionSchema, partialLocaleLabelSchema } from '@/locale/locale.schema';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export const baseConfigSchema = {
    id: string(),
    label: partialLocaleLabelSchema,
    description: partialLocaleDescriptionSchema,
    icon: nullable(string()),
    iconDark: nullable(string())
};
