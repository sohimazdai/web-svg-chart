import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers';
import { IState } from './state/state';
import { createLogger } from 'redux-logger';


const logger = createLogger({});

export const store = createStore(rootReducer, applyMiddleware(logger))
