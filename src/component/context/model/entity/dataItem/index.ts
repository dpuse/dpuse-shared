// ── DPUse Framework
import type { BaseConfig } from '@/index';
import type { LocaleDescription } from '@/locale';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

// Lighter than 'ComponentInstanceConfig': no icon, status, or timestamps populated for a data item — 'description' is
// also optional here, unlike the base, since a formula- or lookup-derived item ('content'/'lookup') rarely carries
// one.
export interface ContextModelEntityDataItemConfig extends Omit<BaseConfig, 'description'> {
    description?: LocaleDescription;
    type?: string;
    entityTypeId?: string;
    // A formula expression the item is computed from, e.g. 'ageYears(bthDate)'.
    content?: string;
    // The id of the dimension or lookup list this item's value resolves against, e.g. 'core.geographic.geoCountry'.
    lookup?: string;
}
