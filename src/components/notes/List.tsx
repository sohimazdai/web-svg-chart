import React from 'react';
import './List.css'
import { NoteComponent } from './NoteComponent';
import { Note } from '../../interfaces/Notes';

export interface ListProps {
    notes: Note[],
    onSelect:(id: number) => any,
    selected: number,
    onEditClick: () => void,
}

export class List extends React.Component<ListProps>{

  render() {
    const { notes, onSelect, selected, onEditClick } = this.props;
    return <div className={'list'}>
      {notes.map((note: Note, index: number) =>
          <NoteComponent
              key={index}
              index={index}
              note={note}
              onSelect={onSelect}
              isSelected={selected == index}
              onEditClick={onEditClick}
          />)}
    </div>
  }
}
