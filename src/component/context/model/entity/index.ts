// ── DPUse Framework
import { ComponentInstanceConfig } from '@/component';
import type { ContextModelEntityDataItemConfig } from './dataItem';
import type { ContextModelEntityEventsConfig } from './event';
import type { ContextModelEntityPrimaryMeasuresConfig } from './primaryMeasure';
import type { LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityConfig extends ComponentInstanceConfig {
    typeId: 'contextModelEntity';
    labelPlural: LocaleLabel;
    groupId: string;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventsConfig;
    parents?: string[];
    primaryMeasures: ContextModelEntityPrimaryMeasuresConfig;
}
