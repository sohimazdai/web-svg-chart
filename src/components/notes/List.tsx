import React from 'react';
import './List.css'
import { NoteComponent } from './NoteComponent';
import { Note } from '../../interfaces/Notes';

export interface ListProps {
    notes: Note[],
    onSelect:(id: string) => any,
    selected: string,
    onEditClick: () => void,
    onDeleteClick: () => void;
}

export class List extends React.Component<ListProps>{

  render() {
    const { notes, onSelect, selected, onEditClick, onDeleteClick } = this.props;
    console.log("NOTES", notes)
    return <div className={'list'}>
      {notes.map((note: Note) =>
          <NoteComponent
              key={note.id}
              index={note.id}
              note={note}
              onSelect={onSelect}
              isSelected={selected == note.id}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
          />)}
    </div>
  }
}
