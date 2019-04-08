import { notes } from '../../data/notes';
import { ActionWithPayLoad } from '../../interfaces/Redux';
import { Constants } from '../actions/constants';

export const initialNotesState = {
    notes: notes,
    selected: undefined,
}

export const notesReducer = (state = initialNotesState, action: ActionWithPayLoad) => {
    switch (action.type) {
        case Constants.ADD_NOTE_TO_LIST:
            return {
                ...state,
                notes: action.payload
            };

        case Constants.SELECT_NOTE:
            return {
                ...state,
                selected: action.payload
            };

        default:
            return state;
    }
}
