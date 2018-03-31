import {
  TRANSACTION_LIST_FETCH_START,
  TRANSACTION_LIST_FETCH_SUCCESS,
  TRANSACTION_LIST_FETCH_FAIL,
  TRANSACTION_LIST_FETCH_CLEAN
} from './actionTypes';

const initialState = {
  inProgress: false,
  fetchErrors: null,
  fetched: false,
  list: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case TRANSACTION_LIST_FETCH_START: {
      return {
        ...state,
        inProgress: true,
        fetched: false,
      }
    }
    case TRANSACTION_LIST_FETCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        fetched: true,
        ...action
      }
    }
    case TRANSACTION_LIST_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        ...action,
      }
    }
    case TRANSACTION_LIST_FETCH_CLEAN: {
      return {
        ...initialState,
      }
    }
    
    default: return state;
  }
}