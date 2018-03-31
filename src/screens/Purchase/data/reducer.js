import {
  PURCHASE_STRIPE_START,
  PURCHASE_STRIPE_SUCCESS,
  PURCHASE_STRIPE_FAIL,
  PURCHASE_STRIPE_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  found: false,
  tanks: [],
  reservations: [],
  orders: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PURCHASE_STRIPE_START: {
      return { ...state, inProgress: true }
    }
    case PURCHASE_STRIPE_SUCCESS: {
      return { ...state, inProgress: false }
    }
    case PURCHASE_STRIPE_FAIL: {
      return { ...state, inProgress: false,  errors: action.errors}
    }
    case PURCHASE_STRIPE_CLEAN: {
      return initialState
    }
    default: return state;
  }
}