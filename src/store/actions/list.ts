import { Note } from "../../interfaces/Notes";

export function addNoteToList(notes: Note[]) {
  return {
    type: 'ADD_NOTE_TO_LIST',
    payload: notes,
  }
}
