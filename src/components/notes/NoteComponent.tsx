import React, { Component } from 'react';
import './NoteComponent.css'
import { CustomNoteRow } from './CustomNoteRow';
import { Note } from '../../interfaces/Notes';
import { CustomSubmitButton } from '../custom-buttons/CustomSubmitButton';

export interface NoteComponentProps {
    index: string,
    note: Note,
    onSelect: (id: string) => void,
    isSelected: boolean,
    onEditClick: () => void,
    onDeleteClick: () => void,
}

export class NoteComponent extends React.Component<NoteComponentProps>{
  render() {
    const { note, onSelect, index, isSelected, onEditClick, onDeleteClick } = this.props;
    const isAlertNeed = parseInt(note.glucose) > 8 || parseInt(note.bread) > 8
    return <div
        className={`note-component ${isAlertNeed ? 'alert' : 'good'} ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(index)}
    >
        <div className={'note-component_left-column'}>
            <CustomNoteRow string={note.glucose} rowTitle='Glucose'/>
            <CustomNoteRow string={note.bread} rowTitle='Bread'/>
            <CustomNoteRow string={note.insulin} rowTitle='Insulin'/>
        </div>
        <div className={'note-component_right-column'}>
            {isSelected && <>
              <CustomSubmitButton buttonTitle="Edit" onClick={onEditClick} />
              <CustomSubmitButton buttonTitle="Delete" onClick={onDeleteClick} />
            </>}

            <div>
              {note.date.toDateString() + '  ' + note.date.toLocaleTimeString()}
            </div>
        </div>

    </div>
  }
}
