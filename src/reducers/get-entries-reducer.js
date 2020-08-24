import {
    DELETE_ENTRY_SUCCESS,
    EDIT_ENTRIES_SUCCESS,
    SET_SEARCH_TEXT,
    SUBMIT_ENTRY_SUCCESS
} from '../actions/constants';
import { concat } from 'lodash';

import findStringInArrayOfObject  from '../utils';

export const initialState = {
    entrieslist: [],
    entrieslistResponse: [],
    searchText: ''
};

const handlers = {
    [DELETE_ENTRY_SUCCESS]: (state, action) => {
        return {
            ...state,
            entrieslist: state.entrieslist.filter(item => item.id !== action.id)
        };
    },
    [SUBMIT_ENTRY_SUCCESS]: (state, action) => {
        const areaOfInterest = [];
        action.entry.areaOfInterest.forEach(item => {
            areaOfInterest.push(item.title);
        });
        const newArr = concat(state.entrieslist, { ...action.entry, areaOfInterestString: areaOfInterest.toString() });
        return {
            ...state,
            entrieslist: newArr,
            entrieslistResponse: newArr
        };
    },
    [EDIT_ENTRIES_SUCCESS]: (state, action) => {
        const matchedArr = [];
        state.entrieslist.forEach(item => {
            if (item.id === action.id) {
                matchedArr.push(item);
            }
        });
        const index = state.entrieslist.indexOf(matchedArr[0]);
        if (index !== -1) {
            const areaOfInterest = [];
            action.body.areaOfInterest.forEach(item => {
                areaOfInterest.push(item.title);
            });
            state.entrieslist[index] = { ...action.body, areaOfInterestString: areaOfInterest.toString()};
            state.entrieslistResponse[index] = { ...action.body, areaOfInterestString: areaOfInterest.toString()};
        }
        return {
            ...state,
            entrieslist: state.entrieslist,
            entriesentrieslistResponse: state.entrieslistResponse
        }
    },
    [SET_SEARCH_TEXT]: (state, action) => {
        if (action.searchText && action.searchText.length > 0) {
            return {
                ...state,
                entrieslist: findStringInArrayOfObject(
                    state.entrieslistResponse,
                    ['name', 'areaOfInterestString'],
                    action.searchText
                ),
                searchText: action.searchText
            };
        }
        return {
            ...state,
            entriesList: [...state.entrieslistResponse],
            searchtext: ''
        }
    }
};

export default function entriesReducer(state = initialState, action) {
    const handler = handlers[action.type];
    if (!handler) return state;
    return { ...state, ...handler(state, action) };
}