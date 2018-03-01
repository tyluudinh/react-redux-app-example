import {
  SETTING_USER_LIST_FETCH,
  SETTING_USER_LIST_CLEAN,
  SETTING_USER_SET_PERMISSION,
} from './actionTypes';

export const fetchUserList = (dispatch) => {
  dispatch({ type: SETTING_USER_LIST_FETCH });
}

export const clean = (dispatch) => {
  dispatch({ type: SETTING_USER_LIST_CLEAN });
}

export const setUserPermission = (dispatch, acc) => {
  dispatch({ type: SETTING_USER_SET_PERMISSION, acc })
}