import React from 'react';
import { Note } from '../../interfaces/Notes';
import './Chart.css';
import { ChartBody } from './ChartBody';
import { ChartStyleProps } from '../../interfaces/Chart';
import { ChartHelper } from '../../app/chartHelper';

export interface ChartProps {
    notes: Note[];
    selectedDate: Date;
    chartStyleProps: ChartStyleProps;
    numberOfDashesOY: number;
    numberOfDashesOX: number;
}

export class Chart extends React.Component<ChartProps> {
    static ChartX = 1400;
    static ChartY = 1000;
    static percentOfX = (Chart.ChartX - ((Chart.ChartX) / 100) * ChartHelper.indent * 2) / 100;
    static percentOfY = (Chart.ChartY - ((Chart.ChartY) / 100) * ChartHelper.indent * 2) / 100;
    static viewX: number = 100 * Chart.percentOfX;
    static viewY: number = 100 * Chart.percentOfY;

    render() {
        const { chartStyleProps, numberOfDashesOY, numberOfDashesOX, notes, selectedDate } = this.props;
        const viewBoxPropsStr = '0 0 ' + Chart.ChartX + ' ' + Chart.ChartY;
        return (
            <div className={'chart'}>
                <div className={'chart__first-row'}>
                    <div className={'chart__oy-axis-dash-titles'}>
                        {this.getOYDaylyDashTitles()}
                    </div>
                    <div className={'chart__body-wrap'}>
                            <svg viewBox={viewBoxPropsStr} width="100%">
                                    <ChartBody
                                        selectedDate={selectedDate}
                                        chartStyleProps={chartStyleProps}
                                        numberOfDashesOY={numberOfDashesOY}
                                        numberOfDashesOX={numberOfDashesOX}
                                        polylinePoints={ChartHelper.getPointsFromNotes(notes, selectedDate)}
                                    />
                            </svg>
                    </div>
                </div>
                <div className={'chart__second-row'}>
                    <div className={'chart__ox-axis-dash-titles'}>
                        {this.getOXDaylyDashTitles()}
                    </div>
                </div>
            </div>
        )
    }

    private getOXDaylyDashTitles () {
        let res: JSX.Element[] = [];
            for (var iter = 0; iter <= this.props.numberOfDashesOX; iter++ ) {
                res.push(
                    <span
                        key={iter}
                        className={'chart__ox-dash-title'}
                    >
                        { iter * ( 24 / this.props.numberOfDashesOX) }
                    </span>
                )
            }
        return res;
    }

    private getNumberOfDashes() {
        const { notes, selectedDate } = this.props;
        const maxValue = ChartHelper.getMaxArrayValue(
            ChartHelper.getPointsFromNotes(notes, selectedDate).glucoseValues
        );
        let number = 1;
        for ( let iter = 3; iter <= maxValue; iter++ ) {
            number = maxValue % iter == 0 && number == 1 ?
                iter :
                number
        }
        return number;
    }

    private getOYDaylyDashTitles() {
        const { notes, selectedDate } = this.props;
        let res: JSX.Element[] = [];
        let tempArr = ChartHelper.getPointsFromNotes(notes, selectedDate).glucoseValues
        let max = Math.max(...tempArr);
        // let min = Math.min(...tempArr);
            for (let iter = 0; iter <= this.getNumberOfDashes(); iter++) {
                res.push(
                    <span
                        key={iter}
                        className={'chart__oy-dash-title'}
                    >
                        { iter * (max / this.getNumberOfDashes())}
                    </span>
                )
            }
        return res;
    }
}
