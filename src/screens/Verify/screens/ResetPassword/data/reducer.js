import {
  VERIFY_RESET_PASSWORD_START,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAIL,
  VERIFY_RESET_PASSWORD_CLEAN
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  done: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case VERIFY_RESET_PASSWORD_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case VERIFY_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        done: true,
        errors: null,
      }
    }
    case VERIFY_RESET_PASSWORD_FAIL: {
      return {
        ...state,
        inProgress: false,
        done: false,
        errors: action.errors,
      }
    }
    case VERIFY_RESET_PASSWORD_CLEAN: {
      return {
        ...initialState
      }
    }
    default: return state;
  }
}