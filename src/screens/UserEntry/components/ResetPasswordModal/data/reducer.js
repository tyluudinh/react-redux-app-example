import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CLEAN
} from "./actionTypes";

const initialState = {
  errors: null,
  inProgress: false,
  completed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_START: {
      return { ...state, inProgress: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        completed: true,
        inProgress: false,
      };
    }
    case RESET_PASSWORD_FAIL: {
      return {
        ...state,
        errors: action.errors,
        inProgress: false,
      };
    }
    case RESET_PASSWORD_CLEAN: {
      return initialState;
    }
    default:
      return state;
  }
};
