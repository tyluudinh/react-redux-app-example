import { VERIFY_ACTIVATE_ACCOUNT, VERIFY_ACTIVATE_ACCOUNT_CLEAN } from './actionTypes';

export const activateAccount = (dispatch, token) => {
  dispatch({ type: VERIFY_ACTIVATE_ACCOUNT, token })
}

export const clean = (dispatch) => {
  dispatch({ type: VERIFY_ACTIVATE_ACCOUNT_CLEAN });
}