import { ComponentConfig } from '../../..';
export interface PresentationConfig extends ComponentConfig {
    typeId: 'presenterPresentation';
    content: string;
    order: number;
}
export interface PresentationVisualConfig {
    content: PresentationVisualContentConfig;
    views: PresentationVisualViewConfig[];
}
export interface PresentationVisualContentConfig {
    title: {
        text: string;
    };
    data: {
        label?: {
            text: string;
        };
        dimension: {
            label?: {
                text: string;
            };
            values: {
                label?: {
                    text: string;
                };
            }[];
        };
        measures: {
            id: string;
            name: string;
            values: number[][];
        }[];
    };
}
export interface PresentationVisualViewConfig {
    categoryId: PresentationCategoryId;
    default?: boolean;
}
export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';
export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
}
export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'spline';
export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}
export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}
export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: PresentationPolarTypeId;
}
export type PresentationPolarTypeId = 'areaLine' | 'areaRange' | 'areaSpline' | 'column' | 'columnRange' | 'line' | 'spline';
export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
}
export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';
export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}
export interface PresentationVisualStreamGraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamGraph';
}
export interface PresentationVisualValueTableViewConfig extends PresentationVisualViewConfig {
    categoryId: 'valueTable';
}
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
