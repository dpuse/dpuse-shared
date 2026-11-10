// ── External Dependencies & Registrations
import { array, boolean, looseObject, number, optional, safeParse, string } from 'valibot';

// ── DPUse Framework
import { AppError } from '@/errors';
import { VALUE_DELIMITER_CONFIGS } from '@/component/dataView';
import type { DataSubtypeId, DeclaredColumnConfig, DeclaredReadingConfig } from '@/component/dataView';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

type DeclaredType = Pick<DeclaredColumnConfig, 'dataSubtypeId' | 'dataTypeId'>;

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

// Only the properties DPUse reads. Others, such as 'constraints', are allowed and left alone.
const TABLE_SCHEMA_FIELD_SCHEMA = looseObject({ format: optional(string()), name: string(), title: optional(string()), type: optional(string()) });
const TABLE_SCHEMA_SCHEMA = looseObject({ fields: array(TABLE_SCHEMA_FIELD_SCHEMA) });
const HEADER_ROWS_SCHEMA = optional(array(number()));
const TABLE_DIALECT_SCHEMA = looseObject({ delimiter: optional(string()), header: optional(boolean()), headerRows: HEADER_ROWS_SCHEMA });

// Table Schema types DPUse has a type for. The rest, such as 'object', 'geopoint' and 'any', the default, are inferred.
// A 'year' is a whole number, because DPUse has no year type.
const TABLE_SCHEMA_TYPES: Partial<Record<string, DeclaredType>> = {
    boolean: { dataSubtypeId: undefined, dataTypeId: 'boolean' },
    date: { dataSubtypeId: 'date', dataTypeId: 'temporal' },
    datetime: { dataSubtypeId: 'dateTime', dataTypeId: 'temporal' },
    integer: { dataSubtypeId: 'integer', dataTypeId: 'numeric' },
    number: { dataSubtypeId: 'decimal', dataTypeId: 'numeric' },
    string: { dataSubtypeId: 'plain', dataTypeId: 'string' },
    time: { dataSubtypeId: 'time', dataTypeId: 'temporal' },
    year: { dataSubtypeId: 'integer', dataTypeId: 'numeric' }
};

// The string formats that match a DPUse text subtype. Any other format is plain text.
const TABLE_SCHEMA_STRING_SUBTYPES: Partial<Record<string, DataSubtypeId>> = { email: 'email', uri: 'url', uuid: 'uuid' };

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Reads a Table Schema, with the Table Dialect and encoding of its data resource when given, into the columns and reading
// an audit takes as declared (https://datapackage.org/standard/table-schema/). The input takes the property names of a
// Data Package resource, so a resource can be passed as it is. Fields match the item's columns by position, the
// standard's default. A dialect that is not given takes the standard's defaults: a header row and a comma.
export function readTableSchema(resource: { dialect?: unknown; encoding?: string | undefined; schema: unknown }): {
    declaredColumnConfigs: DeclaredColumnConfig[];
    declaredReadingConfig: DeclaredReadingConfig;
} {
    const schemaResult = safeParse(TABLE_SCHEMA_SCHEMA, resource.schema);
    if (!schemaResult.success) throw new AppError('The table schema is not valid.', 'dpuse-shared.component.module.connector.tableSchema.readTableSchema');
    const dialectResult = safeParse(TABLE_DIALECT_SCHEMA, resource.dialect ?? {});
    if (!dialectResult.success) throw new AppError('The table dialect is not valid.', 'dpuse-shared.component.module.connector.tableSchema.readTableSchema');

    const declaredColumnConfigs = schemaResult.output.fields.map((field): DeclaredColumnConfig => {
        const declaredType = constructDeclaredType(field.type, field.format);
        return { name: field.name, label: field.title, dataTypeId: declaredType.dataTypeId, dataSubtypeId: declaredType.dataSubtypeId };
    });
    const { delimiter = ',', header = true, headerRows = [1] } = dialectResult.output;
    return {
        declaredColumnConfigs,
        declaredReadingConfig: {
            dataFormatId: 'dtv',
            encodingId: resource.encoding?.toLowerCase(), // Detected when the resource does not say, as the standard leaves it.
            hasHeaders: header && headerRows.length > 0,
            valueDelimiterId: VALUE_DELIMITER_CONFIGS.find(({ character }) => character === delimiter)?.id // A delimiter DPUse does not offer is detected.
        }
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function constructDeclaredType(type: string | undefined, format: string | undefined): DeclaredType {
    const declaredType = type == null ? undefined : TABLE_SCHEMA_TYPES[type];
    if (declaredType == null) return { dataSubtypeId: undefined, dataTypeId: undefined };
    if (format == null || declaredType.dataTypeId !== 'string') return declaredType;
    return { dataSubtypeId: TABLE_SCHEMA_STRING_SUBTYPES[format] ?? 'plain', dataTypeId: 'string' };
}
