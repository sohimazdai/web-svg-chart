import { AxisType, SvgLineProps } from "../interfaces/SVG";
import { Chart } from "../components/chart/Chart";
import { Color } from "csstype";

export class ChartHelper {

    static indent = 2;

    static get min() {
        return (100 - (100 - ChartHelper.indent));
    }

    static get max() {
        return 100 - ChartHelper.indent;
    }

    static drawAxis(axis: AxisType, strokeWidth: number, stroke: Color) {
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                x1: ChartHelper.min,
                x2: ChartHelper.max,
            };
        } else if (axis == AxisType.OY) {
            params = {
                y1: ChartHelper.max,
                y2: ChartHelper.min,
            }
        }
        params.strokeWidth = strokeWidth;
        params.stroke = stroke;
        return params;
    }

    static drawDash(
        iter: number,
        axis: AxisType,
        numberOfDashes: number,
        strokeWidth?: string | number,
        stroke?: Color
    ) {
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                x1: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * (iter + 1) + ChartHelper.min,
                y1: ChartHelper.max,
                x2: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * (iter + 1) + ChartHelper.min,
                y2: Chart.ChartY,
            }
        } else if(axis == AxisType.OY) {
            params = {
                x1: ChartHelper.min,
                y1: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * iter + ChartHelper.min,
                x2: '0',
                y2: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * iter + ChartHelper.min,
            }
        }
        params.strokeWidth = strokeWidth;
        params.stroke = stroke;
        return params;
    }

    static drawNet(
        iter: number,
        axis: AxisType,
        numberOfDashes: number,
        strokeWidth?: string | number,
        stroke?: Color
    ){
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                x1: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * (iter + 1) + ChartHelper.min,
                y1: ChartHelper.max,
                x2: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * (iter + 1) + ChartHelper.min,
                y2: ChartHelper.min,
            }
        }
        if(axis == AxisType.OY) {
            params = {
                x1: ChartHelper.min,
                y1: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * iter + ChartHelper.min,
                x2: ChartHelper.max,
                y2: ((100 - 2 * ChartHelper.indent)/numberOfDashes) * iter + ChartHelper.min,
            }
        }
        params.strokeWidth = strokeWidth;
        params.stroke = stroke;
        return params;
    }
}
