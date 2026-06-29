// ── DPUse (Local) Framework
import { ComponentConfig } from '@/component';
import type { ContextModelEntityDataItemConfig } from './dataItem';
import type { ContextModelEntityEventConfig } from './event';
import type { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import type { LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityConfig extends ComponentConfig {
    typeId: 'contextModelEntity';
    labelPlural: LocaleLabel;
    groupId: string;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
