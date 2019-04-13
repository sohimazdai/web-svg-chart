import React from 'react';
import { Note } from '../../interfaces/Notes';
import './Chart.css';

export interface ChartProps {
    notes: Note[],
}

export class Chart extends React.Component<ChartProps> {
    render() {
        return <div className={'chart'}></div>
    }
}
