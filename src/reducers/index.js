import { combineReducers } from 'redux';
import entriesReducer from './get-entries-reducer';

const reducers = combineReducers({
    entriesReducer
});

export default reducers;