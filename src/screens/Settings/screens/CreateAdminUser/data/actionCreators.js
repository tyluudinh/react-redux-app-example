import {
  SETTING_ADMIN_USER_CREATE,
  SETTING_ADMIN_USER_CREATE_CLEAN,
  SETTING_ADMIN_USER_CREATE_VALIDATE
} from './actionTypes';

export const submitAdminCreate = (dispatch, data) => {
  dispatch({ type: SETTING_ADMIN_USER_CREATE, data })
}

export const validateAdminCreate = (dispatch, data) => {
  dispatch({ type: SETTING_ADMIN_USER_CREATE_VALIDATE, data });
}

export const cleanAdminCreate = (dispatch, data) => {
  dispatch({ type: SETTING_ADMIN_USER_CREATE_CLEAN })
}
