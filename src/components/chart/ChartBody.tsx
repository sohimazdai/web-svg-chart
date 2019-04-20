import React from 'react';
import './ChartBody.css';
import { SvgLineProps, AxisType, ChartStyleProps, Points, PolylineType } from '../../interfaces/SVG';
import { ChartHelper } from '../../app/chartHelper';
import { AppColor } from '../../constants/Colors';
import { Chart } from './Chart';

export interface ChartBodyProps {
    numberOfDashesOX?: number;
    numberOfDashesOY?: number;
    chartStyleProps: ChartStyleProps;
    polylinePoints: Points;
}

export class ChartBody extends React.Component<ChartBodyProps> {
    private numberOfDashesOX: number = this.props.numberOfDashesOX || 5;
    private numberOfDashesOY: number = this.props.numberOfDashesOY || 5;
    private dashesOY: JSX.Element[] = this.renderDash(AxisType.OY, this.numberOfDashesOY);
    private dashesOX: JSX.Element[] = this.renderDash(AxisType.OX, this.numberOfDashesOX);
    private net: JSX.Element[] = this.renderNet(AxisType.OX, AxisType.OY);

    render() {
        const { chartStyleProps, polylinePoints } = this.props;
        return <>
            {this.dashesOY}
            {this.dashesOX}
            {this.net}
            {this.renderPolyline(polylinePoints, PolylineType.GLU)}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OX, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OY, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
        </>
    }

    renderPolyline(pointsArray: Points, type: PolylineType) {
        let tempArr = pointsArray.glucosePoints.slice(this.getFirstTodayArrayItemNumber(pointsArray.datePoints));
        let dateArr = pointsArray.datePoints.slice(this.getFirstTodayArrayItemNumber(pointsArray.datePoints));
        let points = "";
        let x = ChartHelper.min * Chart.percentOfX;
        let y = tempArr[0] + Chart.percentOfY * ChartHelper.min;
        if (type == PolylineType.GLU) {
            for (var iter = 0; iter <= tempArr.length; ++iter) {
                points += '' + x + ',' + y + ' ';
                x = this.calculateDateToResizeable(dateArr[iter]) * Chart.percentOfX;
                console.log(x);
                y = (Chart.viewY - tempArr[iter] + Chart.percentOfY * ChartHelper.min);
            }
        }
        return <polyline points={points} stroke={AppColor.DARK_GRAY} strokeWidth={5} fill="none" />
    }

    renderDash(AxisType: AxisType, numberOfDashes: number) {
        const { chartStyleProps } = this.props;
        let newArray = [];
        for (let i = 0; i < numberOfDashes; i++) {
            newArray.push(this.renderLine(
                ChartHelper.drawDash(i, AxisType, numberOfDashes, chartStyleProps.dashStrokeWidth, chartStyleProps.dashStroke)
            ));
        }
        return newArray;
    }

    renderLine(params: SvgLineProps) {
        return (
            <line
                x1={(params.x1 || ChartHelper.min) + '%'}
                x2={(params.x2 || ChartHelper.min) + '%'}
                y1={(params.y1 || ChartHelper.max) + '%'}
                y2={(params.y2 || ChartHelper.max) + '%'}
                stroke={params.stroke || 'black'}
                strokeWidth={params.strokeWidth || 5}
            />
        )
    }

    renderNet(ox: AxisType.OX, oy: AxisType.OY) {
        const { chartStyleProps } = this.props;
        let lineArray = [];
        if (ox) {
            for (let i = 0; i < this.numberOfDashesOX; i++) {
                lineArray.push(this.renderLine(
                    ChartHelper.drawNet(
                        i,
                        ox,
                        this.numberOfDashesOX,
                        chartStyleProps.netStrokeWidth,
                        chartStyleProps.netStroke
                    )
                ));
            };
        };
        if (oy) {
            for (let i = 0; i < this.numberOfDashesOY; i++) {
                lineArray.push(this.renderLine(
                    ChartHelper.drawNet(
                        i,
                        oy,
                        this.numberOfDashesOY,
                        chartStyleProps.netStrokeWidth,
                        chartStyleProps.netStroke
                    )
                ));
            }
        }
        return lineArray;
    }

    public calculateDateToResizeable(propDate: number) {
        let dayStart = new Date((new Date()).toDateString()).getTime();
        let dayEnd = (new Date('1970-01-02')).getTime() + dayStart;
        let date = (new Date(propDate)).getTime();
        let dayRange = dayEnd - dayStart;
        console.log((date/dayRange)*100)
        return ((date - dayStart)/dayRange)*100;
    }

    public getFirstTodayArrayItemNumber(array: number[]) {
        let today = (new Date()).toDateString();
        let res = array.length;
        array.map((item, index) => {
            let itemDate = (new Date(item)).toDateString();
            if (itemDate == today && res == array.length){
                res = index;
            }
        })
        return res;

    }

}
