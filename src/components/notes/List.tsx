import React, { Component } from 'react';
import './List.css'
import { NoteComponent } from './NoteComponent';
import { Note } from '../../interfaces/Notes';
import { selectNote } from '../../store/actions/list';
import { any } from 'prop-types';

export interface ListProps {
    notes: Note[],
    onSelect:(id: number) => any,
    selected: number,
}

export class List extends React.Component<ListProps>{

  render() {
    const { notes, onSelect, selected } = this.props;
    return <div className={'list'}>
      {notes.map((note: Note, index: number) =>
          <NoteComponent
              key={index}
              index={index}
              note={note}
              onSelect={onSelect}
              isSelected={selected == index}
          />)}
    </div>
  }
}
