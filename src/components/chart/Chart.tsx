import React from 'react';
import { Note } from '../../interfaces/Notes';
import './Chart.css';
import { ChartBody } from './ChartBody';
import { ChartStyleProps, Points } from '../../interfaces/SVG';
import { ChartHelper } from '../../app/chartHelper';

export interface ChartProps {
    notes: Note[],
    chartStyleProps: ChartStyleProps;
    numberOfDashesOY?: number;
    numberOfDashesOX?: number;
}

export class Chart extends React.Component<ChartProps> {
    static ChartX = 1400;
    static ChartY = 1000;

    render() {
      const { chartStyleProps, numberOfDashesOY, numberOfDashesOX, notes } = this.props;
      const viewBoxPropsStr = '0 0 ' + Chart.ChartX + ' ' + Chart.ChartY;
      return <div className={'chart'}>
          <svg viewBox={viewBoxPropsStr} width="100%">
            <ChartBody
              chartStyleProps={chartStyleProps}
              numberOfDashesOY={numberOfDashesOY}
              numberOfDashesOX={numberOfDashesOX}
              polylinePoints={this.rewriteNotes()}
            />
          </svg>
      </div>
    }

    public rewriteNotes() {
        const { notes } = this.props;
        const availableView = 100 - ChartHelper.indent * 2;
        let points: Points = {
            glucosePoints: [],
            breadPoints: [],
            insulinPoints: [],
            datePoints: [],
        }
        console.log("NOTES", notes);
        let nowMap = performance.now();
        notes.map(item => {
            points.glucosePoints.push(parseFloat(item.glucose));
            console.log(item.glucose);
            console.log(points.glucosePoints)
            points.breadPoints.push(parseFloat(item.bread));
            points.insulinPoints.push(parseFloat(item.insulin));
            points.datePoints.push(item.date.getTime());
        });
        console.log('POINTS', points);
        console.log('Перебор массива', performance.now() - nowMap)

        let nowMax = performance.now();
        let maxGlucose = 0;
        points.glucosePoints.map(i => {
            if (i > maxGlucose) maxGlucose = i;
        })
        console.log('Поиск большего',performance.now() - nowMax)

        let nowMin = performance.now();
        let minGlucose = 30;
        points.glucosePoints.map(j => {
            if (minGlucose > j) minGlucose = j;
        })
        console.log('Поиск меньшего',performance.now() - nowMin)

        let nowCalculate = performance.now();
        points.glucosePoints = this.calculateToPercent(points.glucosePoints, maxGlucose);
        points.breadPoints = this.calculateToPercent(points.breadPoints, maxGlucose);
        points.insulinPoints = this.calculateToPercent(points.insulinPoints, maxGlucose)
        console.log('Преобразование в процентный массив',performance.now() - nowCalculate)

        return points;
    }

    public calculateToPercent(array: number[], max: number) {
        let newArr: number[] = [];
        array.map(item => {
            newArr.push((item/max)*100)
        })
        return newArr;
    }

}
