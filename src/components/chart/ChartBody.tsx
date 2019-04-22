import React from 'react';
import { SvgLineProps, AxisType, ChartStyleProps, Points, PolylineType, SvgDotProps } from '../../interfaces/SVG';
import { ChartHelper } from '../../app/chartHelper';
import { ChartColor } from '../../constants/Colors';
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
    radius = 5;

    render() {
        const { chartStyleProps, polylinePoints} = this.props;
        return <>
            {this.dashesOY}
            {this.dashesOX}
            {this.net}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OX, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OY, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
            {this.renderPolyline(polylinePoints, PolylineType.GLU)}
            {this.renderPoints(polylinePoints, PolylineType.GLU)}
        </>
    }

    renderPolyline(points: Points, type: PolylineType) {
        let path: string = '';
        let x: number;
        let y: number;
        if (type == PolylineType.GLU) {
            for (var iter = 0; iter < points.glucosePoints.length; iter++) {
                x = points.datePoints[iter];
                y = points.glucosePoints[iter];
                path += x + ',' + y + ' '
            }
        }
        console.log(path)
        return <polyline points={path} stroke="tomato" strokeWidth="5" fill="none" />
    }

    renderPoints(points: Points, type: PolylineType) {
        let pointsArr = []
        if (type == PolylineType.GLU) {
            for (var iter = 0; iter < points.glucosePoints.length; iter++) {
                pointsArr.push(this.renderDot({
                    cy: points.glucosePoints[iter],
                    cx: points.datePoints[iter],
                    r: 5,
                    stroke: "black",
                    strokeWidth: 4
                }))
            }
        }
        return pointsArr
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

    renderDot(params: SvgDotProps) {
        return (
            <circle
                cx={params.cx}
                cy={params.cy}
                r={params.r}
                stroke={params.stroke}
                strokeWidth={params.strokeWidth}
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
}
