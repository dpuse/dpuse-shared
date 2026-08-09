// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';
import { object } from 'valibot';

// ── DPUse (Local) Framework
import { componentBaseSchema } from '@/component/config.schema';
import { DEFAULT_LOCALE_ID } from '@/locale';
import type { componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusConfigSchema } from '@/component/config.schema';
import type { LocaleId, LocaleLabel } from '@/locale';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { componentConfigSchema } from '@/component/config.schema';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface Component {
    readonly config: ComponentConfig;
}

// ── Types - Base ─────────────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentBase = InferOutput<ReturnType<typeof object<typeof componentBaseSchema>>>;

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentConfig = InferOutput<typeof componentConfigSchema>;

// ── Types - Reference ────────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentReference = InferOutput<typeof componentReferenceSchema>;

// ── Types - Status ───────────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentStatus = InferOutput<typeof componentStatusConfigSchema>;
export type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;

// ── Constants - Status ───────────────────────────────────────────────────────────────────────────────────────────────

const COMPONENT_STATUS_CONFIGS: { id: string; color: ComponentStatusColorId; labels: LocaleLabel }[] = [
    { id: 'alpha', color: 'red', labels: { en: 'alpha', es: 'alfa' } },
    { id: 'beta', color: 'amber', labels: { en: 'beta', es: 'beta' } },
    { id: 'generalAvailability', color: 'green', labels: { en: '', es: '' } },
    { id: 'notApplicable', color: 'green', labels: { en: 'not-applicable', es: 'no-aplicable' } },
    { id: 'preAlpha', color: 'red', labels: { en: 'pre-alpha', es: 'pre-alfa' } },
    { id: 'proposed', color: 'other', labels: { en: 'proposed', es: 'propuesto' } },
    { id: 'releaseCandidate', color: 'green', labels: { en: 'release-candidate', es: 'candidato-de-lanzamiento' } },
    { id: 'unavailable', color: 'other', labels: { en: 'unavailable', es: 'no-disponible' } },
    { id: 'underReview', color: 'other', labels: { en: 'under-review', es: 'en-revisión' } }
];

// ── Actions - Status ─────────────────────────────────────────────────────────────────────────────────────────────────

export function getComponentStatus(id: string, localeId: LocaleId = DEFAULT_LOCALE_ID): ComponentStatus {
    const componentStatus = COMPONENT_STATUS_CONFIGS.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) {
        const label = componentStatus.labels[localeId] ?? componentStatus.labels[DEFAULT_LOCALE_ID] ?? componentStatus.id;
        return { color: componentStatus.color, label };
    }
    return { color: 'other', label: id };
}
