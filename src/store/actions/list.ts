import { Note } from "../../interfaces/Notes";
import { Constants } from "./constants";

export function addNoteToList(notes: Note[]) {
  return {
    type: Constants.ADD_NOTE_TO_LIST,
    payload: notes,
  }
}

export function selectNote(id: number) {
  return {
    type: Constants.SELECT_NOTE,
    payload: id,
  }
}
