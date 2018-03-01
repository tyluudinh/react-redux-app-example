import {
  RESERVATION_INPUT_SEARCH_START,
  RESERVATION_INPUT_SEARCH_SUCCESS,
  RESERVATION_INPUT_SEARCH_FAIL,
  RESERVATION_INPUT_CLEAN,
  RESERVATION_INPUT_FETCH_START,
  RESERVATION_INPUT_FETCH_SUCCESS,
  RESERVATION_INPUT_FETCH_FAIL,
  RESERVATION_INPUT_FETCH_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  completed: false,
  errors: null,
  list: [],
  fetchedReservations: {},
  fetchedReservationsCount: 0,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case RESERVATION_INPUT_SEARCH_START: {
      return {
        ...state,
        inProgress: true,
        list: [],
      }
    }
    case RESERVATION_INPUT_SEARCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        completed: true,
        list: action.list
      }
    }
    case RESERVATION_INPUT_SEARCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        completed: false,
      }
    }
    case RESERVATION_INPUT_CLEAN: {
      return initialState
    }
    case RESERVATION_INPUT_FETCH_START: {
      const fetchedReservations = {...state.fetchedReservations};
      fetchedReservations[action.id] = {
        inProgress: true,
        errors: null,
        data: {}
      }
      return {
        ...state,
        ...{ fetchedReservations }
      }
    }
    case RESERVATION_INPUT_FETCH_SUCCESS: {
      const fetchedReservations = {...state.fetchedReservations};
      fetchedReservations[action.id] = {
        data: action.data,
        inProgress: false,
        errors: false,
      }
      return {
        ...state,
        ...{ fetchedReservations },
        fetchedReservationsCount: state.fetchedReservationsCount + 1
      }
    }
    case RESERVATION_INPUT_FETCH_FAIL: {
      const fetchedReservations = {...state.fetchedReservations};
      fetchedReservations[action.id] = {
        inProgress: false,
        errors: action.errors,
      }
      return {
        ...state,
        ...{ fetchedReservations },
        fetchedReservationsCount: state.fetchedReservationsCount + 1
      }
    }
    case RESERVATION_INPUT_FETCH_CLEAN: {
      return {
        ...state,
        ...{ fetchedReservations: {} },
        fetchedReservationsCount: 0
      } 
    }
    default: return state;
  }
}