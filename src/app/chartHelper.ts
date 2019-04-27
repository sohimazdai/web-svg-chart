import { AxisType, SvgLineProps, Points } from "../interfaces/Chart";
import { Chart } from "../components/chart/Chart";
import { Color } from "csstype";
import { Note } from "../interfaces/Notes";

export class ChartHelper {

    static indent = 2;

    static get min() {
        return (100 - (100 - this.indent));
    }

    static get max() {
        return 100 - this.indent;
    }

    static get minX() {
        return this.min * Chart.percentOfX;
    }

    static get minY() {
        return this.min * Chart.percentOfY;
    }

    static get maxX() {
        return this.max * Chart.percentOfX;
    }

    static get maxY() {
        return this.max * Chart.percentOfY;
    }

    static drawAxis(axis: AxisType, strokeWidth: number, stroke: Color) {
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                x1: this.min,
                x2: this.max,
            };
        } else if (axis == AxisType.OY) {
            params = {
                y1: this.max,
                y2: this.min,
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
        stroke?: Color,
        id?: string,
    ) {
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                id: iter.toString() + AxisType.OX,
                x1: ((100 - 2 * this.indent)/numberOfDashes) * (iter + 1) + this.min,
                y1: this.max,
                x2: ((100 - 2 * this.indent)/numberOfDashes) * (iter + 1) + this.min,
                y2: Chart.ChartY,
            }
        } else if(axis == AxisType.OY) {
            params = {
                id: iter.toString() + AxisType.OY,
                x1: this.min,
                y1: ((100 - 2 * this.indent)/numberOfDashes) * iter + this.min,
                x2: '0',
                y2: ((100 - 2 * this.indent)/numberOfDashes) * iter + this.min,
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
        stroke?: Color,
        id?: string,
    ){
        let params: SvgLineProps = {};
        if (axis == AxisType.OX) {
            params = {
                id: iter.toString() + AxisType.OX + numberOfDashes,
                x1: ((100 - 2 * this.indent)/numberOfDashes) * (iter + 1) + this.min,
                y1: this.max,
                x2: ((100 - 2 * this.indent)/numberOfDashes) * (iter + 1) + this.min,
                y2: this.min,
            }
        }
        if(axis == AxisType.OY) {
            params = {
                id: iter.toString() + AxisType.OY + numberOfDashes,
                x1: this.min,
                y1: ((100 - 2 * this.indent)/numberOfDashes) * iter + this.min,
                x2: this.max,
                y2: ((100 - 2 * this.indent)/numberOfDashes) * iter + this.min,
            }
        }
        params.strokeWidth = strokeWidth;
        params.stroke = stroke;
        return params;
    }

    static getPointsFromNotes(notes: Note[]) {
        console.log('CH NOTES', notes);
        let points: Points = {
            glucosePoints: [],
            breadPoints: [],
            insulinPoints: [],
            datePoints: []
        }
        for (var iter = 0; iter < notes.length; iter++) {
            points.datePoints.push(notes[iter].date.getTime());
        }
        let todays = this.getTodayIndex(points.datePoints);
        points.datePoints = [];
        for (var iter = todays[0]; iter < todays[todays.length - 1]; iter++) {
            points.glucosePoints.push(parseFloat(notes[iter].glucose));
            points.breadPoints.push(parseFloat(notes[iter].bread));
            points.insulinPoints.push(parseFloat(notes[iter].insulin));
            points.datePoints.push(notes[iter].date.getTime());
        }

        points.glucosePoints = this.transformArrayToAdapted(points.glucosePoints);
        points.breadPoints = this.transformArrayToAdapted(points.breadPoints);
        points.insulinPoints = this.transformArrayToAdapted(points.insulinPoints);
        points.datePoints = this.transformDateArrayToAdapted(points.datePoints);
        console.log('CH points', points);
        return points;
    }

    static transformArrayToAdapted(array: number[]) {
        let adapted: number[] = [];
        let max = Math.max.apply(null, array) + 1;
        array.map((item, index) => {
            adapted[index] = (100 - item/max * 100 + this.min) * Chart.percentOfY;
        })
        return adapted;
    }

    static getTodayIndex(dates: number[]) {
        let todays: number[] = [];
        let today = new Date();
        let start = (new Date(today.toDateString())).getTime();
        let range = 1000 * 60 * 60 * 24;
        dates.map((date, index) => {
            let receivedDateInMs = (new Date(date)).getTime() - start;
            if(receivedDateInMs < range && receivedDateInMs > 0){
                todays.push(index)
            }
        })
        return todays;
    }

    static transformDateArrayToAdapted(dates: number[]) {
        let adapted: number[] = [];
        let start = (new Date(new Date().toDateString())).getTime();
        let range = 1000 * 60 * 60 * 24;
        dates.map((date, index) => {
            let receivedDateInMs = (new Date(date)).getTime() - start;
            adapted.push((receivedDateInMs / range) * 100 * Chart.percentOfX);
        })
        return adapted;
    }
}
