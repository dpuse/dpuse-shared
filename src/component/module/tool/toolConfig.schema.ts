/**
 * Defines the configuration metadata for a tool. Used for validation of tool manifests.
 */

// ── External Dependencies & Registrations
import { array, literal, minLength, optional, pipe, strictObject, string } from 'valibot';

// ── DPUse Framework
import { literalUnion } from '@/schema';
import { moduleConfigCoreFields } from '@/component/module/moduleConfig.schema';

// ── Schemas - Parser ─────────────────────────────────────────────────────────────────────────────────────────────────

// The data formats a parser may read: every data format except 'unknown', which has no records to read.
export const parserDataFormatIdSchema = literalUnion(['arrow', 'avro', 'dtv', 'json', 'jsonl', 'markdown', 'ods', 'parquet', 'sav', 'sqlite', 'xlsx', 'xml']);

export const parserConfigSchema = strictObject({
    dataFormatIds: pipe(array(parserDataFormatIdSchema), minLength(1)) // Written by hand, because only the tool's author knows which formats it reads.
});

// ── Schemas - Configuration ──────────────────────────────────────────────────────────────────────────────────────────

const toolActionNamesSchema = array(string());

export const toolConfigSchema = strictObject({
    ...moduleConfigCoreFields,
    typeId: literal('tool'),
    actionNames: optional(toolActionNamesSchema), // Written by the build from the methods the tool's source implements.
    parser: optional(parserConfigSchema) // Only a tool that parses data records has one.
});
