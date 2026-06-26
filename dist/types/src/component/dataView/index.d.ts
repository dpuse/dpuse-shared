import { FileTypeResult } from 'file-type';
import { Component, ComponentConfig } from '..';
import { ConnectionNodeConfig, ObjectColumnConfig } from '../connection';
type DataViewInterface = Component;
export interface DataViewConfig extends ComponentConfig {
    connectionId: string | undefined;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    previewConfig: PreviewConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined;
    relationshipsAuditConfig: RelationshipsAuditConfig | undefined;
}
interface PreviewConfig {
    asAt: number;
    commentMarkId?: string | undefined;
    commentMarkOtherCharSeq?: string | undefined;
    columnConfigs: ObjectColumnConfig[];
    dataFormatId: DataFormatId;
    duration: number;
    encodingConfidenceLevel: number | undefined;
    encodingId: string | undefined;
    errorMessage?: string | undefined;
    fileType: FileTypeResult | undefined;
    hasHeaders: boolean | undefined;
    inferenceRecords: InferenceRecord[];
    linesToSkipAtStart?: number | undefined;
    parsedRecords: ParsingRecord[];
    quoteEscapeChar?: string | undefined;
    quoteMarkId?: string | undefined;
    quoteMarkOtherCharSeq?: string | undefined;
    recordDelimiterId: RecordDelimiterId | undefined;
    recordDelimiterOtherCharSeq?: string | undefined;
    size: number | undefined;
    skipEmptyLines?: boolean | undefined;
    skipLinesWithEmptyValues?: boolean | undefined;
    skipLinesWithErrors?: boolean | undefined;
    text: string | undefined;
    valueDelimiterId: ValueDelimiterId | undefined;
    valueDelimiterOtherCharSeq?: string | undefined;
    valueTrimMethodId?: ValueTrimMethodId | undefined;
}
type ValueTrimMethodId = 'both' | 'left' | 'right' | 'none';
interface ContentAuditConfig {
    asAt: number;
    columns: ObjectColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}
interface RelationshipsAuditConfig {
    placeholder: string;
}
type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml' | 'unknown';
type RecordDelimiterId = '\n' | '\r' | '\r\n';
type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
type ParsingRecord = ParsingResult[];
interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}
type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';
type DataSubtypeId = NumericSubtypeId | StringSubtypeId | TemporalSubtypeId;
type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';
type NumericSignId = 'negative' | 'zero' | 'positive';
type NumericUnitsId = 'currency' | 'percentage' | 'plain';
type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';
type TemporalSubtypeId = 'date' | 'dateTime' | 'time';
/**
 *
 */
interface InferenceSummary {
    columnConfigs: ObjectColumnConfig[];
    hasHeaderRow: boolean;
    typedRecords: InferenceRecord[];
}
type InferenceRecord = InferenceResult[];
type InferenceResult = BooleanInferenceResult | NumericInferenceResult | StringInferenceResult | TemporalInferenceResult | UnknownInferenceResult;
interface BooleanInferenceResult {
    dataTypeId: 'boolean';
    dataSubtypeId: undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: boolean;
}
type NumericInferenceResult = BigIntInferenceResult | NumberInferenceResult;
interface BigIntInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'bigint';
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: bigint;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}
interface NumberInferenceResult {
    dataTypeId: 'numeric';
    dataSubtypeId: 'integer' | 'decimal';
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: number;
    currencySymbolId: string | undefined;
    decimalPlaces: number;
    signId: NumericSignId;
    unitsId: NumericUnitsId;
}
interface StringInferenceResult {
    dataTypeId: 'string';
    dataSubtypeId: StringSubtypeId;
    format: string | undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: string;
}
interface TemporalInferenceResult {
    dataTypeId: 'temporal';
    dataSubtypeId: TemporalSubtypeId;
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: Date;
}
interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    dataSubtypeId: undefined;
    inputValue: string | null;
    inputValueWasQuoted: boolean;
    inferredValue: null;
}
export { ORDERED_VALUE_DELIMITER_IDS };
export type { DataViewInterface, PreviewConfig, ContentAuditConfig, RelationshipsAuditConfig, DataFormatId, RecordDelimiterId, ValueDelimiterId, ParsingRecord, ParsingResult, DataTypeId, // Data type.
DataSubtypeId, NumericSubtypeId, // Numeric subtype and characteristics.
NumericSignId, NumericUnitsId, StringSubtypeId, // String subtype.
TemporalSubtypeId, // Temporal subtype.
InferenceSummary, InferenceRecord, InferenceResult, BooleanInferenceResult, // Boolean.
NumericInferenceResult, // Numeric.
BigIntInferenceResult, NumberInferenceResult, StringInferenceResult, // String.
TemporalInferenceResult, // Temporal.
UnknownInferenceResult };
