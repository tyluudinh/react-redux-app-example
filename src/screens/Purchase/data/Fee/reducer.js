import {
  PURCHASE_FETCH_FEE_START,
  PURCHASE_FETCH_FEE_SUCCESS,
  PURCHASE_FETCH_FEE_FAIL,
  PURCHASE_FETCH_FEE_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  fetched: false,
  fee: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PURCHASE_FETCH_FEE_START: {
      return { ...state, inProgress: true }
    }
    case PURCHASE_FETCH_FEE_SUCCESS: {
      return { ...state, inProgress: false, fee: action.fee, fetched: true }
    }
    case PURCHASE_FETCH_FEE_FAIL: {
      return { ...state, inProgress: false,  errors: action.errors}
    }
    case PURCHASE_FETCH_FEE_CLEAN: {
      return initialState
    }
    default: return state;
  }
}