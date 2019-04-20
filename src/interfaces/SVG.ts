import { Color } from "csstype";

export interface SvgLineProps {
    x1?: string | number;
    y1?: string | number;
    x2?: string | number;
    y2?: string | number;
    stroke?: Color;
    strokeWidth?: string | number;
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
