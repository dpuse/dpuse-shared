// External Dependencies
import { nullable, number, object, string } from 'valibot';

// Local Framework
import { literalUnion } from '@/schema';
import { partialLocalLabelSchema } from '@/locale';

// Schema - Literal Unions ─────────────────────────────────────────────────────────────────────────────────────────────

export const componentStatusColorIdSchema = literalUnion(['amber', 'green', 'red', 'other']);

export const componentStatusIdSchema = literalUnion([
    'alpha',
    'beta',
    'generalAvailability',
    'notApplicable',
    'preAlpha',
    'proposed',
    'releaseCandidate',
    'unavailable',
    'underReview'
]);

export const componentTypeIdSchema = literalUnion([
    'app',
    'connector',
    'connectorConnection',
    'context',
    'contextModelGroup',
    'contextModel',
    'contextModelDimensionGroup',
    'contextModelDimension',
    'contextModelDimensionHierarchy',
    'contextModelEntityGroup',
    'contextModelEntity',
    'contextModelEntityDataItem',
    'contextModelEntityEvent',
    'contextModelEntityPrimaryMeasure',
    'contextModelSecondaryMeasureGroup',
    'contextModelSecondaryMeasure',
    'dataView',
    'dimension',
    'engine',
    'eventQuery',
    'presenter',
    'presenterPresentation',
    'tool'
]);

// Schema - Objects ────────────────────────────────────────────────────────────────────────────────────────────────────

export const componentStatusSchema = object({
    id: string(),
    color: componentStatusColorIdSchema,
    label: string()
});

export const componentConfigCoreFields = {
    id: string(),
    label: partialLocalLabelSchema,
    description: partialLocalLabelSchema,
    firstCreatedAt: nullable(number()),
    icon: nullable(string()),
    iconDark: nullable(string()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusSchema),
    statusId: componentStatusIdSchema
};

export const componentConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: componentTypeIdSchema
});

export const componentReferenceSchema = object({
    id: string(),
    label: partialLocalLabelSchema,
    description: partialLocalLabelSchema,
    icon: nullable(string()),
    iconDark: nullable(string()),
    order: number(),
    path: string()
});
