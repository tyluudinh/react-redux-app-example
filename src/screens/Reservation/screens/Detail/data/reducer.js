import {
  RESERVATION_DETAIL_FETCH_START,
  RESERVATION_DETAIL_FETCH_SUCCESS,
  RESERVATION_DETAIL_FETCH_FAIL,
  RESERVATION_DETAIL_CLEAN,
  RESERVATION_DETAIL_TANK_FETCH_START,
  RESERVATION_DETAIL_TANK_FETCH_SUCCESS,
  RESERVATION_DETAIL_TANK_FETCH_FAIL,
  RESERVATION_DETAIL_DELETE_START,
  RESERVATION_DETAIL_DELETE_SUCCESS,
  RESERVATION_DETAIL_DELETE_FAIL
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  detail: {},
  tanks: {},
  deleted: false,
  deletesErrors: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case RESERVATION_DETAIL_FETCH_START: {
      return { ...state, inProgress: true };
    }
    case RESERVATION_DETAIL_FETCH_SUCCESS: {
      return { ...state, inProgress: false, detail: action.detail };
    }
    case RESERVATION_DETAIL_FETCH_FAIL: {
      return { ...state, inProgress: false, errors: action.errors };
    }
    case RESERVATION_DETAIL_CLEAN: {
      return initialState
    }
    case RESERVATION_DETAIL_TANK_FETCH_START: {
      const tanks = {...state.tanks};
      tanks[action.id] = {
        inProgress: true,
        errors: null,
        data: {}
      }
      return {
        ...state,
        ...{ tanks }
      }
    }
    case RESERVATION_DETAIL_TANK_FETCH_SUCCESS: {
      const tanks = {...state.tanks};
      tanks[action.id] = {
        inProgress: false,
        errors: null,
        data: action.data,
      }
      return {
        ...state,
        ...{ tanks }
      }
    }
    case RESERVATION_DETAIL_TANK_FETCH_FAIL: {
      const tanks = {...state.tanks};
      tanks[action.id] = {
        inProgress: false,
        errors: action.errors,
        data: {},
      }
      return {
        ...state,
        ...{ tanks }
      }
    }
    case RESERVATION_DETAIL_DELETE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case RESERVATION_DETAIL_DELETE_SUCCESS: {
      return {
        ...state,
        deleted: true,
        inProgress: false,
      }
    }
    case RESERVATION_DETAIL_DELETE_FAIL: {
      return {
        ...state,
        inProgress: false,
        deletesErrors: action.errors,
      }
    }
    default: return state;
  }
}