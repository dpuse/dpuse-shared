// ── DPUse (Local) Framework
import type { ComponentConfig } from '@/component';

// ── Types - Configuration ────────────────────────────────────────────────────────────────────────────────────────────

export interface PresentationConfig extends ComponentConfig {
    typeId: 'presenterPresentation';
    content: string;
    order: number;
}

// ── Types - Visual Configuration ─────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualConfig {
    content: PresentationVisualContentConfig;
    views: PresentationVisualViewConfig[];
}

export interface PresentationVisualContentConfig {
    title: { text: string };
    data: {
        label?: { text: string };
        dimension: { label?: { text: string }; values: { label?: { text: string } }[] };
        measures: { id: string; name: string; values: number[][] }[];
    };
}

export interface PresentationVisualViewConfig {
    categoryId: PresentationCategoryId;
    default?: boolean;
}

export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';

// ── Types - Visual View Configuration - Cartesian Chart ──────────────────────────────────────────────────────────────

export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
}

export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'spline';

// ── Types - Visual View Configuration - Chord Diagram ────────────────────────────────────────────────────────────────

export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}

// ── Types - Visual View Configuration - Period Flow Boundaries Chart ─────────────────────────────────────────────────

export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}

// ── Types - Visual View Configuration - Polar Chart ──────────────────────────────────────────────────────────────────

export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: PresentationPolarTypeId;
}

// TODO: Implement 'areaRange' and 'columnRange' types (https://jsfiddle.net/BlackLabel/qsvLgjpe/, https://www.highcharts.com/demo/polar/sand-signika?utm_source=chatgpt.com).
// Maybe new categories cartesianRangeChart and polarRangeChart.
export type PresentationPolarTypeId = 'areaLine' | 'areaRange' | 'areaSpline' | 'column' | 'columnRange' | 'line' | 'spline';

// ── Types - Visual View Configuration - Range Chart ──────────────────────────────────────────────────────────────────

export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
}

export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';

// ── Types - Visual View Configuration - Sankey Diagram ───────────────────────────────────────────────────────────────

export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}

// ── Types - Visual View Configuration - Stream Graph ─────────────────────────────────────────────────────────────────

export interface PresentationVisualStreamGraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamGraph';
}

// ── Types - Visual View Configuration - Value Table ──────────────────────────────────────────────────────────────────

export interface PresentationVisualValueTableViewConfig extends PresentationVisualViewConfig {
    categoryId: 'valueTable';
}

// ── Types - View ─────────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
