import {
  PURCHASE_FETCH_RATE_BONUS_START,
  PURCHASE_FETCH_RATE_BONUS_SUCCESS,
  PURCHASE_FETCH_RATE_BONUS_FAIL,
  PURCHASE_FETCH_RATE_BONUS_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  fetched: false,
  rates: [],
  bonus: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PURCHASE_FETCH_RATE_BONUS_START: {
      return { ...state, inProgress: true }
    }
    case PURCHASE_FETCH_RATE_BONUS_SUCCESS: {
      return { ...state, inProgress: false, ...action }
    }
    case PURCHASE_FETCH_RATE_BONUS_FAIL: {
      return { ...state, inProgress: false,  errors: action.errors}
    }
    case PURCHASE_FETCH_RATE_BONUS_CLEAN: {
      return initialState
    }
    default: return state;
  }
}