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
    static percentOfX = (Chart.ChartX - ((Chart.ChartX) / 100) * ChartHelper.indent * 2) / 100;
    static percentOfY = (Chart.ChartY - ((Chart.ChartY) / 100) * ChartHelper.indent * 2) / 100;
    static viewX: number = 100 * Chart.percentOfX;
    static viewY: number = 100 * Chart.percentOfY;

    render() {
      const { chartStyleProps, numberOfDashesOY, numberOfDashesOX, notes } = this.props;
      const viewBoxPropsStr = '0 0 ' + Chart.ChartX + ' ' + Chart.ChartY;
      return <div className={'chart'}>
          <svg viewBox={viewBoxPropsStr} width="100%">
            <ChartBody
              chartStyleProps={chartStyleProps}
              numberOfDashesOY={numberOfDashesOY}
              numberOfDashesOX={numberOfDashesOX}
            //   polylinePoints={this.rewriteNotes()}
            />
          </svg>
      </div>
    }

    // public rewriteNotes() {
    //     const { notes } = this.props;
    //     let points: Points = {
    //         glucosePoints: [],
    //         breadPoints: [],
    //         insulinPoints: [],
    //         datePoints: [],
    //     }
    //     notes.map(item => {
    //         points.glucosePoints.push(parseFloat(item.glucose));
    //         points.breadPoints.push(parseFloat(item.bread));
    //         points.insulinPoints.push(parseFloat(item.insulin));
    //         points.datePoints.push(item.date.getTime());
    //     });

    //     let maxGlucose = 0;
    //     points.glucosePoints.map(i => {
    //         if (i > maxGlucose) maxGlucose = i;
    //     })

    //     points.glucosePoints = this.calculateToResizeableValue(points.glucosePoints, maxGlucose).reverse();
    //     points.breadPoints = this.calculateToResizeableValue(points.breadPoints, maxGlucose).reverse();
    //     points.insulinPoints = this.calculateToResizeableValue(points.insulinPoints, maxGlucose).reverse();
    //     console.log(points)
    //     return points;

    // }

    // public calculateToResizeableValue(array: number[], max: number) {
    //     let newArr: number[] = [];
    //     array.map(item => {
    //         newArr.push((item/max)*100*Chart.percentOfY)
    //     })
    //     return newArr;
    // }
}
