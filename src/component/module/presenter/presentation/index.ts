// Local Framework
import type { ComponentConfig } from '@/component';

// Configuration ───────────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresentationConfig extends ComponentConfig {
    content: string;
    order: number;
    typeId: 'presenterPresentation';
}

// Visual Configuration ────────────────────────────────────────────────────────────────────────────────────────────────

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

// Cartesian Chart View Configuration ──────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
}
export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'spline';

// Chord Diagram View Configuration ────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}

// Period Flow Boundaries Chart View Configuration ─────────────────────────────────────────────────────────────────────

export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}

// Polar Chart View Configuration ──────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: PresentationPolarTypeId;
}
// TODO: Implement 'areaRange' and 'columnRange' types (https://jsfiddle.net/BlackLabel/qsvLgjpe/, https://www.highcharts.com/demo/polar/sand-signika?utm_source=chatgpt.com).
// Maybe new categories cartesianRangeChart and polarRangeChart.
export type PresentationPolarTypeId = 'areaLine' | 'areaRange' | 'areaSpline' | 'column' | 'columnRange' | 'line' | 'spline';

// Range Chart View Configuration ──────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
}
export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';

// Sankey Diagram View Configuration ───────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}

// Stream Graph View Configuration ─────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualStreamGraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamGraph';
}

// Value Table View Configuration ──────────────────────────────────────────────────────────────────────────────────────

export interface PresentationVisualValueTableViewConfig extends PresentationVisualViewConfig {
    categoryId: 'valueTable';
}

// View ────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
