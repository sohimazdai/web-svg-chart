import React, { Component } from 'react';
import './CustomNoteRow.css'

export interface CustomNoteRowProps {
    string: string;
    rowTitle: string;
}

export class CustomNoteRow extends React.Component<CustomNoteRowProps>{

  render() {
    const { string, rowTitle } = this.props;

    return <div className={'custom-note-row'}>
            {rowTitle}: {string}
        </div>
  }
}
