import React from 'react';
import { Note } from '../../interfaces/Notes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './Chart.css';

export interface ChartProps {
    notes: Note[],
}

export class Chart extends React.Component<ChartProps> {


private renderLineChart = (
  <LineChart width={document.body.offsetWidth*0.7} height={400} data={this.props.notes.slice(0, 10)}>
    <Line type="monotone" dataKey="glucose" stroke="tomato" />
    <CartesianGrid stroke="yellow" strokeDasharray="5 5" />
    <XAxis />
    <YAxis dataKey="glucose"/>
    <Tooltip />
  </LineChart>
);
    render() {
        return <div className={'chart'}>{this.renderLineChart}</div>
    }
}
