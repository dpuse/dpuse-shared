// ── External Dependencies & Registrations
import { optional, strictObject, string } from 'valibot';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = strictObject({ en: string(), es: string() });

export const partialLocaleDescriptionSchema = strictObject({ en: optional(string()), es: optional(string()) });

export const partialLocaleLabelSchema = strictObject({ en: optional(string()), es: optional(string()) });
