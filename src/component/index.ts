// External Dependencies
import type { InferOutput } from 'valibot';

// Local Framework
import { DEFAULT_LOCALE_ID } from '@/locale';
import type { componentConfigSchema, componentReferenceSchema, componentStatusColorIdSchema, componentStatusSchema } from '@/component/componentConfig.schema';
import type { LocaleId, LocaleLabel } from '@/locale';

// Schema ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Schema - Component Configuration

export { componentConfigSchema } from '@/component/componentConfig.schema';
export type { ModuleConfig, ModuleTypeId } from '@/component/module';

// Component Interfaces/Types
export interface Component {
    readonly config: ComponentConfig;
}

// Types ───────────────────────────────────────────────────────────────────────────────────────────────────────────────

// Interfaces/Types - Component Configuration
export type ComponentConfig = InferOutput<typeof componentConfigSchema>;
export type ComponentLocalisedConfig = Omit<ComponentConfig, 'label' | 'description'> & { label: string; description: string };

export type ComponentReference = InferOutput<typeof componentReferenceSchema>;

// Component Status

export type ComponentStatus = InferOutput<typeof componentStatusSchema>;
type ComponentStatusColorId = InferOutput<typeof componentStatusColorIdSchema>;
const componentStatuses: { id: string; color: ComponentStatusColorId; labels: LocaleLabel }[] = [
    { id: 'alpha', color: 'red', labels: { en: 'alpha' } },
    { id: 'beta', color: 'amber', labels: { en: 'beta' } },
    { id: 'generalAvailability', color: 'green', labels: { en: '' } },
    { id: 'notApplicable', color: 'green', labels: { en: 'not-applicable' } },
    { id: 'preAlpha', color: 'red', labels: { en: 'pre-alpha' } },
    { id: 'proposed', color: 'other', labels: { en: 'proposed' } },
    { id: 'releaseCandidate', color: 'green', labels: { en: 'release-candidate' } },
    { id: 'unavailable', color: 'other', labels: { en: 'unavailable' } },
    { id: 'underReview', color: 'other', labels: { en: 'under-review' } }
];
export function getComponentStatus(id: string, localeId: LocaleId = DEFAULT_LOCALE_ID): ComponentStatus {
    const componentStatus = componentStatuses.find((componentStatus) => componentStatus.id === id);
    if (componentStatus) {
        const label = componentStatus.labels[localeId] ?? componentStatus.labels[DEFAULT_LOCALE_ID] ?? componentStatus.id;
        return { id: componentStatus.id, color: componentStatus.color, label };
    }
    return { id, color: 'other', label: id };
}
