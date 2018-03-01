import {
  ME_LOGIN_START,
  ME_LOGIN_SUCCESS,
  ME_LOGIN_FAIL,
  ME_LOGOUT_START,
  ME_LOGOUT_SUCCESS,
  ME_LOGOUT_FAIL,
  ME_LOGIN_RESET,
} from "./actionTypes";

const initialState = {
  authenticated: false,
  inProgress: false,
  token: null,
  errors: null,
  info: {},
};

const initialResetState = {
  errors: null,
  info: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ME_LOGIN_START:
    case ME_LOGOUT_START: {
      return { ...state, inProgress: true };
    }
    case ME_LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.token,
        inProgress: false,
        authenticated: true,
        info: action.info,
      };
    }
    case ME_LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        inProgress: false,
        authenticated: false,
        errors: null,
        info: {},
      };
    }
    case ME_LOGIN_FAIL:
    case ME_LOGOUT_FAIL: {
      return { 
        ...state, 
        errors: action.errors, 
        inProgress: false 
      };
    }
    case ME_LOGIN_RESET: {
      // Reset fields and errors
      return {
        ...state,
        ...initialResetState,
      }
    }
    default:
      return state;
  }
};
