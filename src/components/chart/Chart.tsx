import React from 'react';
import { Note } from '../../interfaces/Notes';
import './Chart.css';
import { ChartBody } from './ChartBody';
import { ChartStyleProps } from '../../interfaces/SVG';

export interface ChartProps {
    notes: Note[],
    chartStyleProps: ChartStyleProps;
    numberOfDashesOY?: number;
    numberOfDashesOX?: number;

}

export class Chart extends React.Component<ChartProps> {
    static ChartXY = 1000;
    render() {
      const { chartStyleProps, numberOfDashesOY, numberOfDashesOX } = this.props;
      const viewBoxPropsStr = '0 0 ' + Chart.ChartXY + ' ' + Chart.ChartXY;
      return <div className={'chart'}>
          <svg viewBox={viewBoxPropsStr} width="100%">
            <ChartBody
              chartStyleProps={chartStyleProps}
              numberOfDashesOY={numberOfDashesOY}
              numberOfDashesOX={numberOfDashesOX}
            />
          </svg>
      </div>
    }
}
