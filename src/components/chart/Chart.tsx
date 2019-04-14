import React from 'react';
import { Note } from '../../interfaces/Notes';
import './Chart.css';
import { ChartBody } from './ChartBody';

export interface ChartProps {
    notes: Note[],
}

export class Chart extends React.Component<ChartProps> {
    render() {
      return <p>here will be a chart</p>
    }
}
