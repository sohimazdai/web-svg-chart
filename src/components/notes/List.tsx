import React, { Component } from 'react';
import './List.css'
import { Note } from '../user-input-block/UserInputBlock';
import { NoteComponent } from './NoteComponent';

export interface ListProps {
    notes: Note[]
}

export class List extends React.Component<ListProps>{

  render() {
    const { notes } = this.props;
    return <div className={'list'}>
      {notes.map((note: Note, index: number) => <NoteComponent key={index} note={note}/>)}
    </div>
  }
}
