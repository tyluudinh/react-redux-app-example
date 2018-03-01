import {
  TANK_LOGS_FETCH_START,
  TANK_LOGS_FETCH_SUCCESS,
  TANK_LOGS_FETCH_FAIL,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: false,
  data: {},
};

export default (state = initialState, action) => {
  switch(action.type) {
    case TANK_LOGS_FETCH_START: {
      return {
        ...state,
        inProgress: true
      }
    }
    case TANK_LOGS_FETCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        data: action.data
      }
    }
    case TANK_LOGS_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors
      }
    }
    default: return state;
  }
};