// ── External Dependencies & Registrations
import { array, object, optional, string } from 'valibot';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = object({ en: string(), es: string() });

export const partialLocaleDescriptionSchema = object({ en: optional(array(string())), es: optional(array(string())) });

export const partialLocaleLabelSchema = object({ en: optional(string()), es: optional(string()) });
