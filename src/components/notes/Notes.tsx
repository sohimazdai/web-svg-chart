import React, { Component } from 'react';
import './Notes.css'
import { Note } from '../user-input-block/UserInputBlock';

export interface NotesProps {
    notes: Note[]
}

export class notes extends React.Component<NotesProps>{

  render() {
    const { notes } = this.props;
    return <div className={'notes'}>
      {notes.map((item: Note) => <div className={'note'}>
            g: {item.glucose}
            b: {item.bread}
            i: {item.insulin}
        </div>)}
    </div>
  }
}
