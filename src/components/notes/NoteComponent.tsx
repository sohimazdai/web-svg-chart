import React, { Component } from 'react';
import './NoteComponent.css'
import { CustomNoteRow } from './CustomNoteRow';
import { Note } from '../../interfaces/Notes';

export interface NoteComponentProps {
    note: Note;
}

export class NoteComponent extends React.Component<NoteComponentProps>{

  render() {
    const { note } = this.props;
    const isAlertNeed = parseInt(note.glucose) > 8 || parseInt(note.bread) > 8
    return <div className={`note-component ${isAlertNeed ? 'alert' : 'good'}`}>
        <CustomNoteRow string={note.glucose} rowTitle='Glucose'/>
        <CustomNoteRow string={note.bread} rowTitle='Bread'/>
        <CustomNoteRow string={note.insulin} rowTitle='Insulin'/>
    </div>
  }
}
