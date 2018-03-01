import {
  TANK_DETAIL_FETCH_START,
  TANK_DETAIL_FETCH_SUCCESS,
  TANK_DETAIL_FETCH_FAIL,
  TANK_DETAIL_DEREGISTER_START,
  TANK_DETAIL_DEREGISTER_SUCCESS,
  TANK_DETAIL_DEREGISTER_FAIL,
  TANK_DETAIL_CLEAN
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: [],
  detail: null,
  deregistered: false,
  deregisterErrors: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TANK_DETAIL_FETCH_START: {
      return { ...state, inProgress: true };
    }
    case TANK_DETAIL_FETCH_SUCCESS: {
      return { ...state, inProgress: false, detail: action.detail };
    }
    case TANK_DETAIL_FETCH_FAIL: {
      return { ...state, inProgress: false, errors: action.errors };
    }
    case TANK_DETAIL_DEREGISTER_START: {
      return { ...state, inProgress: true };
    }
    case TANK_DETAIL_DEREGISTER_SUCCESS: {
      return { ...state, inProgress: false, deregistered: true };
    }
    case TANK_DETAIL_DEREGISTER_FAIL: {
      return { ...state, inProgress: false, deregisterErrors: action.errors };
    }
    case TANK_DETAIL_CLEAN: {
      return initialState
    }
    default: return state;
  }
}