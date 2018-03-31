import {
  PROFILE_SETTING_USER_FETCH,
  PROFILE_SETTING_USER_UPDATE,
  PROFILE_SETTING_USER_CLEAN,
} from './actionTypes';

export const fetchProfile = (dispatch) => {
  dispatch({ type: PROFILE_SETTING_USER_FETCH });
};

export const updateProfile = (dispatch, data) => {
  dispatch({ type: PROFILE_SETTING_USER_UPDATE, data });
};

export const clean = (dispatch) => {
  dispatch({ type: PROFILE_SETTING_USER_CLEAN });
};
