import React from 'react';
import './ChartBody.css';
import { SvgLineProps, AxisType, ChartStyleProps } from '../../interfaces/SVG';
import { ChartHelper } from '../../app/chartHelper';

export interface ChartBodyProps {
    hasXAxis?: boolean;
    hasYAxis?: boolean;
    hasNet?: boolean;
    numberOfDashesOX?: number;
    numberOfDashesOY?: number;
    chartStyleProps: ChartStyleProps;
}

export class ChartBody extends React.Component<ChartBodyProps> {
    private numberOfDashesOX: number = this.numberOfDashesOX || 5;
    private numberOfDashesOY: number = this.numberOfDashesOY || 5;
    private dashesOY: JSX.Element[] = this.renderDash(AxisType.OY, this.numberOfDashesOY);
    private dashesOX: JSX.Element[] = this.renderDash(AxisType.OX, this.numberOfDashesOX);
    private net: JSX.Element[] = this.renderNet(AxisType.OX, AxisType.OY);

    render() {
        const { chartStyleProps } = this.props;
        return <>
            {this.dashesOY}
            {this.dashesOX}
            {this.net}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OX, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
            {this.renderLine(ChartHelper.drawAxis(AxisType.OY, chartStyleProps.axiosStrokeWidth, chartStyleProps.axiosStroke))}
        </>
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
        let lineArray = []
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
            }
        }
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
