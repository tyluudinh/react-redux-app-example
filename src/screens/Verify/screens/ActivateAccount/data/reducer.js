import {
  VERIFY_ACTIVATE_ACCOUNT_START,
  VERIFY_ACTIVATE_ACCOUNT_SUCCESS,
  VERIFY_ACTIVATE_ACCOUNT_FAIL,
  VERIFY_ACTIVATE_ACCOUNT_CLEAN
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  done: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case VERIFY_ACTIVATE_ACCOUNT_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case VERIFY_ACTIVATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        done: true,
        errors: null,
      }
    }
    case VERIFY_ACTIVATE_ACCOUNT_FAIL: {
      return {
        ...state,
        inProgress: false,
        done: false,
        errors: action.errors,
      }
    }
    case VERIFY_ACTIVATE_ACCOUNT_CLEAN: {
      return {
        ...initialState
      }
    }
    default: return state;
  }
}