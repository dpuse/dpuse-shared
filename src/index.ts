// ── External Dependencies & Registrations
import type { InferOutput, strictObject } from 'valibot';

// ── DPUse Framework
import { baseConfigSchema } from './baseConfig.schema';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export type BaseConfig = InferOutput<ReturnType<typeof strictObject<typeof baseConfigSchema>>>;

// ── Exports ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// Everything is exported from this one entry point, so editors can suggest any of it and a bundler keeps only what
// is used.
export * from './component';
export * from './component/connection';
export * from './component/context';
export * from './component/context/model';
export * from './component/context/model/dimension';
export * from './component/context/model/dimension/hierarchy';
export * from './component/context/model/entity';
export * from './component/context/model/entity/dataItem';
export * from './component/context/model/entity/event';
export * from './component/context/model/entity/primaryMeasure';
export * from './component/context/model/secondaryMeasure';
export * from './component/dataView';
export * from './component/eventQuery';
export * from './component/module';
export * from './component/module/connector';
export * from './component/module/cookbook';
export * from './component/module/engine';
export * from './component/module/presenter';
export * from './component/module/tool';
export * from './component/presentation';
export * from './encoding';
export * from './errors';
export * from './locale';
export * from './utilities';
