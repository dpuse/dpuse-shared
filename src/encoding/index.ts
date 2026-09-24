// ── DPUse Framework
import { DEFAULT_LOCALE_ID, type LocaleId, type LocaleLabel } from '@/locale/label';

// ── Data
import encodingGroupConfigData from './encodingGroupConfigs.json';
import encodingTypeConfigData from './encodingTypeConfigs.json';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type EncodingGroupId = keyof typeof encodingGroupConfigData;
export type EncodingTypeId = keyof typeof encodingTypeConfigData;

export interface EncodingGroupConfig {
    id: EncodingGroupId;
    label: LocaleLabel;
}

export interface EncodingTypeConfig {
    id: EncodingTypeId;
    groupId: EncodingGroupId | null; // Null for encodings that belong to no group, e.g. 'ascii' and 'utf-8'.
    isDetectable: boolean;
    isDecodable: boolean;
}
export interface EncodingTypeConfigLocalised {
    id: EncodingTypeId;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

export interface EncodingDetectionConfig {
    id: EncodingTypeId;
    confidenceLevel: number | undefined;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

export const ENCODING_GROUP_CONFIG_MAP = encodingGroupConfigData as Record<EncodingGroupId, EncodingGroupConfig>;
export const ENCODING_TYPE_CONFIG_MAP = encodingTypeConfigData as Record<string, EncodingTypeConfig>; // Keyed by string, not 'EncodingTypeId', because it is looked up with names detected at runtime.

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export function getEncodingTypeConfigs(localeId: LocaleId = DEFAULT_LOCALE_ID): EncodingTypeConfigLocalised[] {
    const encodingTypeConfigs: EncodingTypeConfigLocalised[] = Array.from(Object.values(ENCODING_TYPE_CONFIG_MAP), ({ groupId, id, isDecodable, isDetectable }) => {
        const groupLabel = groupId == null ? '' : resolveGroupLabel(groupId, localeId);
        return { id, groupLabel, label: groupLabel ? `${groupLabel} (${id})` : id, isDetectable, isDecodable };
    });
    return encodingTypeConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel, localeId) || left.label.localeCompare(right.label, localeId));
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function resolveGroupLabel(groupId: EncodingGroupId, localeId: LocaleId): string {
    const labels = ENCODING_GROUP_CONFIG_MAP[groupId].label;
    return labels[localeId] ?? labels[DEFAULT_LOCALE_ID] ?? groupId;
}
