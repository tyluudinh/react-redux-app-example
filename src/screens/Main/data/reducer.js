import {
  MAIN_SEARCH_START,
  MAIN_SEARCH_SUCCESS,
  MAIN_SEARCH_FAIL,
  MAIN_SEARCH_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  found: false,
  tanks: [],
  reservations: [],
  orders: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MAIN_SEARCH_START: {
      return { ...state, inProgress: true, tanks: [], reservations: [], orders: [] }
    }
    case MAIN_SEARCH_SUCCESS: {
      return { ...state, inProgress: false, ...{ ...action.data }, found: true }
    }
    case MAIN_SEARCH_FAIL: {
      return { ...state, errors: [ ...state.errors, ...action.errors ], found: true }
    }
    case MAIN_SEARCH_CLEAN: {
      return initialState
    }
    default: return state;
  }
}