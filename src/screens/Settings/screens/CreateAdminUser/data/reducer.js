import {
  SETTING_ADMIN_USER_CREATE_START,
  SETTING_ADMIN_USER_CREATE_SUCCESS,
  SETTING_ADMIN_USER_CREATE_FAIL,
  SETTING_ADMIN_USER_CREATE_VALIDATE_START,
  SETTING_ADMIN_USER_CREATE_VALIDATE_SUCCESS,
  SETTING_ADMIN_USER_CREATE_VALIDATE_FAIL,
  SETTING_ADMIN_USER_CREATE_CLEAN
} from './actionTypes';

import { cleanFieldErrors } from 'app/services/error';

const initialState = {
  inProgress: false,
  errors: null,
  submitted: false,
  fields: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SETTING_ADMIN_USER_CREATE_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case SETTING_ADMIN_USER_CREATE_VALIDATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        passed: true,
        fields: action.fields,
      }
    }
    case SETTING_ADMIN_USER_CREATE_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        passed: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case SETTING_ADMIN_USER_CREATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case SETTING_ADMIN_USER_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submitted: true,
      }
    }
    case SETTING_ADMIN_USER_CREATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors
      }
    }
    case SETTING_ADMIN_USER_CREATE_CLEAN: {
      return {
        ...initialState,
        fields: cleanFieldErrors(state.fields),
      }
    }
    default: return state;
  }
}