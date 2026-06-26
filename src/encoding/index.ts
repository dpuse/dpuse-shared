// ── Data
import encodingConfigData from './encodingConfigs.json';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

// TODO: Naming...
export interface EncodingConfig {
    id: string;
    confidenceLevel: number | undefined;
}

// ── Type Configuration ───────────────────────────────────────────────────────────────────────────────────────────────

// TODO: Naming...
export interface EncodingTypeConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

// ── Initialisation ───────────────────────────────────────────────────────────────────────────────────────────────────

export const encodingConfigMap = encodingConfigData as Record<string, EncodingTypeConfig>;

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export function getEncodingTypeConfigs(localeId = 'en'): EncodingTypeConfig[] {
    const encodingConfigs: EncodingTypeConfig[] = Array.from(Object.values(encodingConfigMap), (encodingConfig) => ({
        ...encodingConfig,
        label: encodingConfig.label || encodingConfig.id
    }));
    return encodingConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel) || left.label.localeCompare(right.label));
}
