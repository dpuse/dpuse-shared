// DPUse (Local) Framework
import type { LocaleLabel } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface ContextModelEntityEventConfig {
    id: string;
    labelAction: LocaleLabel;
    labelState: LocaleLabel;
}

// TODO:
// interface Event {
//     id?: number;
//     entityId: string;
//     effDate: number;
//     typeId: string;
// }
