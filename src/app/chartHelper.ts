import { AxisType, SvgLineProps, Points, SelectSectionDirectionType } from "../interfaces/Chart";
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

    static getPointsFromNotes(notes: Note[], selectedDate: Date) {
        let points: Points = {
            glucosePoints: [],
            breadPoints: [],
            insulinPoints: [],
            datePoints: [],
            glucoseValues: [],
            breadValues: [],
            insulinValues: [],
            dateValues: [],
        }
        for (var iter = 0; iter < notes.length; iter++) {
            points.dateValues.push(notes[iter].date.getTime());
        }
        let dateIndexes = this.getTodayIndexes(points.dateValues, selectedDate);
        points.dateValues = [];
        for (var iter = dateIndexes[0]; iter <= dateIndexes[dateIndexes.length - 1]; iter++) {
            points.glucoseValues.push(parseFloat(notes[iter].glucose));
            points.breadValues.push(parseFloat(notes[iter].bread));
            points.insulinValues.push(parseFloat(notes[iter].insulin));
            points.dateValues.push(notes[iter].date.getTime());
        }

        points.glucosePoints = this.transformArrayToAdapted(points.glucoseValues);
        points.breadPoints = this.transformArrayToAdapted(points.breadValues);
        points.insulinPoints = this.transformArrayToAdapted(points.insulinValues);
        points.datePoints = this.transformDateArrayToAdapted(points.dateValues, selectedDate);
        return points;
    }

    static transformArrayToAdapted(array: number[]) {
        let adapted: number[] = [];
        let max = ChartHelper.getMaxArrayValue(array)
        array.map((item, index) => {
            adapted[index] = (100 - item/max * 100 + this.min) * Chart.percentOfY;
        })
        return adapted;
    }

    static getMaxArrayValue( array: number[] ) {
        return Math.max.apply(null, array)
    }

    static getTodayIndexes(dates: number[], selectedDate: Date) {
        let notesOfSelectedDay: number[] = [];
        let day = selectedDate || new Date();
        let start = (new Date(day.toDateString())).getTime();
        let range = 1000 * 60 * 60 * 24; //24h
        dates.map((date, index) => {
            let receivedDateInMs = (new Date(date)).getTime() - start;
            if(receivedDateInMs < range && receivedDateInMs > 0){
                notesOfSelectedDay.push(index)
            }
        })
        return notesOfSelectedDay;
    }

    static transformDateArrayToAdapted(dates: number[], selectedDate: Date) {
        let adapted: number[] = [];
        let start = (new Date(selectedDate.toDateString())).getTime();
        let range = 1000 * 60 * 60 * 24;
        dates.map((date, index) => {
            let receivedDateInMs = (new Date(date)).getTime() - start;
            adapted.push(((receivedDateInMs / range) * 100 + ChartHelper.min) * Chart.percentOfX);
        })
        return adapted;
    }

    static makeAnotherDateWithDirection(direction: SelectSectionDirectionType, current: Date) {
        const diff = direction == SelectSectionDirectionType.NEXT ? 1 : -1;
        const year = current.getFullYear();
        const month = current.getMonth() - 1;
        const date = current.getDate();
        return new Date(current.getFullYear(), current.getMonth(), current.getDate() + diff)
    }
}
