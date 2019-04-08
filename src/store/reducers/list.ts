import { notes } from '../../data/notes';
import { ActionWithPayLoad } from '../../interfaces/Redux';
import { Constants } from '../actions/constants';

export const initialNotesState = {
    notes: notes
}

export const notesReducer = (state = initialNotesState, action: ActionWithPayLoad) => {
    switch (action.type) {
        case Constants.ADD_NOTE_TO_LIST:
            return {
                ...state,
                notes: action.payload
            }

        default:
            return state;
    }
}
