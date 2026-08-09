// ── External Dependencies & Registrations
import type { InferOutput } from 'valibot';
import { object } from 'valibot';

// ── DPUse Framework
import { componentBaseConfigSchema } from '@/component/componentConfig.schema';
import { DEFAULT_LOCALE_ID } from '@/locale';
import type { componentInstanceConfigSchema, componentReferenceConfigSchema, componentStatusColorIdSchema, componentStatusConfigSchema } from '@/component/componentConfig.schema';
import type { LocaleId, LocaleLabel } from '@/locale';

// ── Schemas ──────────────────────────────────────────────────────────────────────────────────────────────────────────

export { componentInstanceConfigSchema } from '@/component/componentConfig.schema';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface Component {
    readonly config: ComponentInstanceConfig;
}

// ── Types - Base ─────────────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentBaseConfig = InferOutput<ReturnType<typeof object<typeof componentBaseConfigSchema>>>;

// ── Types - Instance Configuration ───────────────────────────────────────────────────────────────────────────────────

export type ComponentInstanceConfig = InferOutput<typeof componentInstanceConfigSchema>;

// ── Types - Reference Configuration ──────────────────────────────────────────────────────────────────────────────────

export type ComponentReferenceConfig = InferOutput<typeof componentReferenceConfigSchema>;

// ── Types - Status ───────────────────────────────────────────────────────────────────────────────────────────────────

export type ComponentStatus = InferOutput<typeof componentStatusConfigSchema>;
export type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;

// ── Constants - Status ───────────────────────────────────────────────────────────────────────────────────────────────

const COMPONENT_STATUS_CONFIGS: { id: string; color: ComponentStatusColorId; labels: LocaleLabel }[] = [
    { id: 'alpha', color: 'red', labels: { en: 'alpha', es: 'alfa' } },
    { id: 'beta', color: 'amber', labels: { en: 'beta', es: 'beta' } },
    { id: 'releaseCandidate', color: 'green', labels: { en: 'release-candidate', es: 'candidato-de-lanzamiento' } },
    { id: 'generalAvailability', color: 'green', labels: { en: '', es: '' } }
];

// ── Actions - Status ─────────────────────────────────────────────────────────────────────────────────────────────────

export function getComponentStatus(id: string, localeId: LocaleId = DEFAULT_LOCALE_ID): ComponentStatus {
    const componentStatus = COMPONENT_STATUS_CONFIGS.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) {
        const label = componentStatus.labels[localeId] ?? componentStatus.labels[DEFAULT_LOCALE_ID] ?? componentStatus.id;
        return { color: componentStatus.color, label };
    }
    return { color: 'red', label: id };
}
