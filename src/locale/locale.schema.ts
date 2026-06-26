// External Dependencies
import { array, object, optional, string } from 'valibot';

// Label ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = object({ en: string(), es: string() });

export const partialLocaleLabelSchema = object({ en: optional(string()), es: optional(string()) });

// Description ─────────────────────────────────────────────────────────────────────────────────────────────────────────

export const partialLocaleDescriptionSchema = object({ en: optional(array(string())), es: optional(array(string())) });
