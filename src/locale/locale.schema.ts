// External Dependencies
import { object, optional, string } from 'valibot';

// Label ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

export const localeLabelSchema = object({ en: string(), es: string() });
export const partialLocaleLabelSchema = object({ en: optional(string()), es: optional(string()) });
