// Local Framework
import type { ContextModelEntityDataItemConfig } from './dataItem';
import type { ContextModelEntityEventConfig } from './event';
import type { ContextModelEntityPrimaryMeasureConfig } from './primaryMeasure';
import type { LocaleLabel } from '@/locale';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityConfig {
    id: string;
    label: LocaleLabel;
    labelPlural: LocaleLabel;
    dataItems: ContextModelEntityDataItemConfig[];
    events: ContextModelEntityEventConfig[];
    primaryMeasures: ContextModelEntityPrimaryMeasureConfig[];
}
