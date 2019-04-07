import { combineReducers } from 'redux'
import { notesReducer } from './list';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  list: notesReducer,
  user: userReducer,
})
