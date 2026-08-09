import { FileTypeResult } from 'file-type';
import { ComponentInstanceConfig } from '..';
import { ConnectionNodeConfig, ObjectColumnConfig } from '../connection';
export interface DataViewConfig extends ComponentInstanceConfig {
    typeId: 'dataView';
    connectionId: string | undefined;
    connectionNodeConfig: ConnectionNodeConfig | undefined;
    previewConfig: PreviewConfig | undefined;
    contentAuditConfig: ContentAuditConfig | undefined;
    relationshipsAuditConfig: RelationshipsAuditConfig | undefined;
}
export interface PreviewConfig {
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
export type DataFormatId = 'dpe' | 'dtv' | 'json' | 'spss' | 'xlsx' | 'xml' | 'unknown';
export type ParsingRecord = ParsingResult[];
export interface ParsingResult {
    value: string | null;
    valueWasQuoted: boolean;
}
export type RecordDelimiterId = '\n' | '\r' | '\r\n';
export type ValueDelimiterId = '' | ':' | ',' | '!' | '0x1E' | ';' | ' ' | '\t' | '_' | '0x1F' | '|';
export type ValueTrimMethodId = 'both' | 'left' | 'right' | 'none';
export interface ContentAuditConfig {
    asAt: number;
    columns: ObjectColumnConfig[];
    commentLineCount: number;
    emptyLineCount: number;
    invalidFieldLengthCount: number;
    duration: number;
    lineCount: number;
    recordCount: number;
}
export interface RelationshipsAuditConfig {
    placeholder: string;
}
export type DataTypeId = 'boolean' | 'numeric' | 'string' | 'temporal' | 'unknown';
export type DataSubtypeId = NumericSubtypeId | StringSubtypeId | TemporalSubtypeId;
export type NumericSubtypeId = 'bigint' | 'integer' | 'decimal';
export type StringSubtypeId = 'email' | 'ipv4' | 'ipv6' | 'ulid' | 'uuid' | 'url' | 'plain';
export type TemporalSubtypeId = 'date' | 'dateTime' | 'time';
export interface InferenceSummary {
    columnConfigs: ObjectColumnConfig[];
    hasHeaderRow: boolean;
    typedRecords: InferenceRecord[];
}
export type InferenceRecord = InferenceResult[];
export type InferenceResult = BooleanInferenceResult | NumericInferenceResult | StringInferenceResult | TemporalInferenceResult | UnknownInferenceResult;
export interface BooleanInferenceResult {
    dataTypeId: 'boolean';
    dataSubtypeId: undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: boolean;
}
export type NumericInferenceResult = BigIntInferenceResult | NumberInferenceResult;
export interface BigIntInferenceResult {
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
export interface NumberInferenceResult {
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
export type NumericSignId = 'negative' | 'zero' | 'positive';
export type NumericUnitsId = 'currency' | 'percentage' | 'plain';
export interface StringInferenceResult {
    dataTypeId: 'string';
    dataSubtypeId: StringSubtypeId;
    format: string | undefined;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: string;
}
export interface TemporalInferenceResult {
    dataTypeId: 'temporal';
    dataSubtypeId: TemporalSubtypeId;
    format: string;
    inputValue: string;
    inputValueWasQuoted: boolean;
    inferredValue: Date;
}
export interface UnknownInferenceResult {
    dataTypeId: 'unknown';
    dataSubtypeId: undefined;
    inputValue: string | null;
    inputValueWasQuoted: boolean;
    inferredValue: null;
}
export declare const ORDERED_VALUE_DELIMITER_IDS: ValueDelimiterId[];
