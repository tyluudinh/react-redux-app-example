import {
  ORDER_DETAIL_FETCH_START,
  ORDER_DETAIL_FETCH_SUCCESS,
  ORDER_DETAIL_FETCH_FAIL,
  ORDER_DETAIL_CLEAN,
  ORDER_DETAIL_TANK_FETCH_START,
  ORDER_DETAIL_TANK_FETCH_SUCCESS,
  ORDER_DETAIL_TANK_FETCH_FAIL,
  ORDER_DETAIL_RESERVATION_FETCH_START,
  ORDER_DETAIL_RESERVATION_FETCH_SUCCESS,
  ORDER_DETAIL_RESERVATION_FETCH_FAIL,
  ORDER_DETAIL_DELETE_START,
  ORDER_DETAIL_DELETE_SUCCESS,
  ORDER_DETAIL_DELETE_FAIL,
  ORDER_DETAIL_SET_COMPLETE_START,
  ORDER_DETAIL_SET_COMPLETE_SUCCESS,
  ORDER_DETAIL_SET_COMPLETE_FAIL
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  detail: {},
  tanks: {},
  reservations: {},
  deleted: false,
  deletesErrors: null,
}

const itemListMerge = (state, target, id, data) => {
  const list = {...state[target]};
  list[id] = data; 
  return {
    ...state,
    ...{ [target]: list }
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ORDER_DETAIL_FETCH_START: {
      return { ...state, inProgress: true };
    }
    case ORDER_DETAIL_FETCH_SUCCESS: {
      return { ...state, inProgress: false, detail: action.detail };
    }
    case ORDER_DETAIL_FETCH_FAIL: {
      return { ...state, inProgress: false, errors: action.errors };
    }
    case ORDER_DETAIL_CLEAN: {
      return initialState
    }
    case ORDER_DETAIL_TANK_FETCH_START: {
      return itemListMerge(state, 'tanks', action.id, {
        inProgress: true,
        errors: null,
        data: {}
      })
    }
    case ORDER_DETAIL_TANK_FETCH_SUCCESS: {
      return itemListMerge(state, 'tanks', action.id, {
        inProgress: false,
        errors: null,
        data: action.data,
      })
    }
    case ORDER_DETAIL_TANK_FETCH_FAIL: {
      return itemListMerge(state, 'tanks', action.id, {
        inProgress: false,
        errors: action.errors,
        data: {},
      })
    }
    case ORDER_DETAIL_RESERVATION_FETCH_START: {
      return itemListMerge(state, 'reservations', action.id, {
        inProgress: true,
        errors: null,
        data: {}
      })
    }
    case ORDER_DETAIL_RESERVATION_FETCH_SUCCESS: {
      return itemListMerge(state, 'reservations', action.id, {
        inProgress: false,
        errors: null,
        data: action.data,
      })
    }
    case ORDER_DETAIL_RESERVATION_FETCH_FAIL: {
      return itemListMerge(state, 'reservations', action.id, {
        inProgress: false,
        errors: action.errors,
        data: {},
      })
    }
    case ORDER_DETAIL_DELETE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_DETAIL_DELETE_SUCCESS: {
      return {
        ...state,
        deleted: true,
        inProgress: false,
      }
    }
    case ORDER_DETAIL_DELETE_FAIL: {
      return {
        ...state,
        inProgress: false,
        deletesErrors: action.errors,
      }
    }
    case ORDER_DETAIL_SET_COMPLETE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_DETAIL_SET_COMPLETE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        detail: {
          ...state.detail,
          status: 'COMPLETED',
        }
      }
    }
    case ORDER_DETAIL_SET_COMPLETE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }
    default: return state;
  }
}