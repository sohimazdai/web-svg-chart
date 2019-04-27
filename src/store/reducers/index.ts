import { combineReducers } from 'redux'
import { notesReducer } from './list';
import { userReducer } from './user';
import { chartReducer } from './chart';

export const rootReducer = combineReducers({
  list: notesReducer,
  user: userReducer,
  chart: chartReducer,
})
