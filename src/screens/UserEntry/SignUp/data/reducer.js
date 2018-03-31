import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_CLEAN
} from "./actionTypes";

const initialState = {
  errors: null,
  inProgress: false,
  completed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_START: {
      return { ...state, inProgress: true };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        completed: true,
        inProgress: false,
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        errors: action.errors,
        inProgress: false,
      };
    }
    case SIGNUP_CLEAN: {
      return initialState;
    }
    default:
      return state;
  }
};
