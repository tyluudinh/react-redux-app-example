import {
  PROFILE_SETTING_USER_FETCH_START,
  PROFILE_SETTING_USER_FETCH_SUCCESS,
  PROFILE_SETTING_USER_FETCH_FAIL,
  PROFILE_SETTING_USER_CLEAN,

  PROFILE_SETTING_USER_UPDATE_START,
  PROFILE_SETTING_USER_UPDATE_SUCCESS,
  PROFILE_SETTING_USER_UPDATE_FAIL
  
} from './actionTypes';

const initialState = {
  inProgress: false,
  fetchErrors: null,
  updateErrors: null,
  errors: null,
  fetched: false,
  updated: false,
  info: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PROFILE_SETTING_USER_FETCH_START: {
      return {
        ...state,
        inProgress: true,
        fetched: false,
      }
    }
    case PROFILE_SETTING_USER_FETCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        fetched: true,
        updated: false,
        ...action
      }
    }
    case PROFILE_SETTING_USER_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        fetchErrors: action.errors,
      }
    }
    case PROFILE_SETTING_USER_CLEAN: {
      return {
        ...initialState,
        updated: false
      } 
    }
  
    case PROFILE_SETTING_USER_UPDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case PROFILE_SETTING_USER_UPDATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        fetched: true,
        updated: true,
        ...action
      }
    }
    case PROFILE_SETTING_USER_UPDATE_FAIL: {
      console.log(action);
      return {
        ...state,
        inProgress: false,
        fetched: true,
        updateErrors: action.errors,
      }
    }
    
    default: return state;
  }
}