import { notes } from '../../data/notes';
import { ActionWithPayLoad } from '../../interfaces/Redux';
import { Constants } from '../actions/constants';
import { INotesState } from '../state/state';

export const initialNotesState: INotesState = {
    notes: notes,
    selected: -1,
    isEditingMode: false,
}

export const notesReducer = (state = initialNotesState, action: ActionWithPayLoad) => {
    switch (action.type) {
        case Constants.UPDATE_NOTES:
            return {
                ...state,
                notes: action.payload,
            };

        case Constants.SELECT_NOTE:
            return {
                ...state,
                selected: action.payload
            };

        case Constants.CHANGE_INPUTS_MODE:
            return {
                ...state,
                isEditingMode: !state.isEditingMode
            };

        case Constants.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((item, index) => index != action.payload)
            }

        default:
            return state;
    }
}
