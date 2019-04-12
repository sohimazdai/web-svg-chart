import { Note } from "../../interfaces/Notes";
import { Constants } from "./constants";

export function updateNotes(notes: Note[]) {
  return {
    type: Constants.UPDATE_NOTES,
    payload: notes,
  }
}

export function selectNote(id: number) {
  return {
    type: Constants.SELECT_NOTE,
    payload: id,
  }
}

export function changeInputsMode() {
  return {
    type: Constants.CHANGE_INPUTS_MODE,
  }
}

export function deleteNote(id: number) {
  return {
    type: Constants.DELETE_NOTE,
  }
}
