import { Note } from "../../interfaces/Notes";

export interface INotesState {
    notes: Note[],
    selected: string,
    isEditingMode: boolean,
}

export interface IUserState {
    name: string
}

export interface IState {
    list: INotesState,
    user: IUserState
}
