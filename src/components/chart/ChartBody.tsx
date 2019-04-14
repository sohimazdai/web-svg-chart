import React from 'react';
import { Note } from '../../interfaces/Notes';
import './ChartBody.css';
import { Color, WidthProperty } from 'csstype';

export interface ChartBodyProps {
    hasXAxis?: boolean;
    hasYAxis?: boolean;
    hasNet?: boolean;
}

export class ChartBody extends React.Component<ChartBodyProps> {
    render() {
      return <div className={'chart-body'}>
          {this.props.children}
      </div>
    }
}
