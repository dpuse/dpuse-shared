// Data dependencies.
import encodingConfigData from './encodingConfigs.json';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

// TODO: Naming...
export interface EncodingConfig {
    id: string;
    confidenceLevel: number | undefined;
}

// Type Configuration ──────────────────────────────────────────────────────────────────────────────────────────────────

// TODO: Naming...
export interface EncodingTypeConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

// Initialisation ──────────────────────────────────────────────────────────────────────────────────────────────────────

export const encodingConfigMap = encodingConfigData as Record<string, EncodingTypeConfig>;

// Actions ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

export function getEncodingTypeConfigs(localeId = 'en'): EncodingTypeConfig[] {
    const encodingConfigs: EncodingTypeConfig[] = [];
    for (const [, encodingConfig] of Object.entries(encodingConfigMap)) {
        encodingConfigs.push({ ...encodingConfig, label: encodingConfig.label || encodingConfig.id });
    }
    return encodingConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel) || left.label.localeCompare(right.label));
}
