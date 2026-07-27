// ── External Dependencies & Registrations
import { object, optional, string } from 'valibot';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = object({ en: string(), es: string() });

export const partialLocaleDescriptionSchema = object({ en: optional(string()), es: optional(string()) });

export const partialLocaleLabelSchema = object({ en: optional(string()), es: optional(string()) });
