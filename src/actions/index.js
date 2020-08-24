import {
    DELETE_ENTRY_SUCCESS,
    EDIT_ENTRIES_SUCCESS,
    GET_ENTRIES_SUCCESS,
    SET_SEARCH_TEXT,
    SUBMIT_ENTRY_SUCCESS
} from './constants';

const entries = []

export function createEntry(body) {
    return dispatch => {
        dispatch({ type: SUBMIT_ENTRY_SUCCESS, entry: body });
    }
}

export function getEntries() {
    return dispatch => {
        dispatch({ type: GET_ENTRIES_SUCCESS, entries })
    };
}

export function editEntry(id, body) {
    return dispatch => {
        dispatch({ type: EDIT_ENTRIES_SUCCESS, id, body })
    };
}

export function deleteEntry(id) {
    return dispatch => {
        dispatch({ type: DELETE_ENTRY_SUCCESS, id })
    }
}

export function setAppSearchText(searchText) {
    return {
        type: SET_SEARCH_TEXT,
        searchText
    };
}