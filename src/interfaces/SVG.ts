import { Color } from "csstype";

export interface SvgLineProps {
    id?: string;
    x1?: string | number;
    y1?: string | number;
    x2?: string | number;
    y2?: string | number;
    stroke?: Color;
    strokeWidth?: string | number;
}

export interface SvgDotProps {
    cx: number;
    cy: number;
    r?: number;
    stroke?: Color;
    strokeWidth?: number;
    id?: string;
}

export enum AxisType {
    OX = 'o-x',
    XO = 'x-o',
    OY = 'o-y',
    YO = 'y-o',
}

export interface ChartStyleProps {
    axiosStroke: Color;
    axiosStrokeWidth: number;
    dashStroke: Color;
    dashStrokeWidth: number;
    netStroke: Color;
    netStrokeWidth: number;
}

export interface Points {
    glucosePoints: number[],
    breadPoints: number[],
    insulinPoints: number[],
    datePoints: number[],
}

export enum PolylineType {
    GLU = 'glu',
    BRE = 'bre',
    INS = 'ins'
}

export interface ChartContentViewBox {
    vievX: number;
    viewY: number;
}
