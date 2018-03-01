import { VERIFY_RESET_PASSWORD, VERIFY_RESET_PASSWORD_CLEAN } from './actionTypes';

export const resetPassword = (dispatch, token, password, confirmPassword) => {
  dispatch({ type: VERIFY_RESET_PASSWORD, token, password, confirmPassword })
}

export const clean = (dispatch) => {
  dispatch({ type: VERIFY_RESET_PASSWORD_CLEAN });
}