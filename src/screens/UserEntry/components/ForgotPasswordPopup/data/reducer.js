import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_CLEAN
} from "./actionTypes";

const initialState = {
  errors: null,
  inProgress: false,
  completed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_START: {
      return { ...state, inProgress: true };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        completed: true,
        inProgress: false,
      };
    }
    case FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        errors: action.errors,
        inProgress: false,
      };
    }
    case FORGOT_PASSWORD_CLEAN: {
      return initialState;
    }
    default:
      return state;
  }
};
