export interface EncodingConfig {
    id: string;
    confidenceLevel: number | undefined;
}
export interface EncodingTypeConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}
export declare const encodingConfigMap: Record<string, EncodingTypeConfig>;
export declare function getEncodingTypeConfigs(localeId?: string): EncodingTypeConfig[];
