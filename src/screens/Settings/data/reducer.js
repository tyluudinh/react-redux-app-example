import {
  SETTING_USER_LIST_FETCH_START,
  SETTING_USER_LIST_FETCH_SUCCESS,
  SETTING_USER_LIST_FETCH_FAIL,
  SETTING_USER_LIST_CLEAN,
  SETTING_USER_SET_PERMISSION_START,
  SETTING_USER_SET_PERMISSION_SUCCESS,
  SETTING_USER_SET_PERMISSION_FAIL,
} from './actionTypes';

const initialState = {
  inProgress: false,
  fetchErrors: null,
  permissionsErrors: null,
  errors: null,
  fetched: false,
  list: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SETTING_USER_LIST_FETCH_START: {
      return {
        ...state,
        inProgress: true,
        fetched: false,
      }
    }
    case SETTING_USER_LIST_FETCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        fetched: true,
        list: action.list
      }
    }
    case SETTING_USER_LIST_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        fetchErrors: action.errors,
      }
    }
    case SETTING_USER_SET_PERMISSION_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case SETTING_USER_SET_PERMISSION_SUCCESS: {
      return {
        ...state,
        inProgress: false,
      }
    }
    case SETTING_USER_SET_PERMISSION_FAIL: {
      return {
        ...state,
        inProgress: false,
        permissionsErrors: action.errors,
      }
    }
    case SETTING_USER_LIST_CLEAN: {
      return {
        ...initialState,
        list: [...state.list]
      } 
    }
    default: return state;
  }
}