import {
  TANK_INPUT_SEARCH_START,
  TANK_INPUT_SEARCH_SUCCESS,
  TANK_INPUT_SEARCH_FAIL,
  TANK_INPUT_CLEAN,
  TANK_INPUT_FETCH_START,
  TANK_INPUT_FETCH_SUCCESS,
  TANK_INPUT_FETCH_FAIL,
  TANK_INPUT_FETCH_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  completed: false,
  errors: null,
  list: [],
  fetchedTanks: {},
  fetchedTanksCount: 0,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TANK_INPUT_SEARCH_START: {
      return {
        ...state,
        inProgress: true,
        list: [],
      }
    }
    case TANK_INPUT_SEARCH_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        completed: true,
        list: action.list
      }
    }
    case TANK_INPUT_SEARCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        completed: false,
      }
    }
    case TANK_INPUT_CLEAN: {
      return initialState
    }
    case TANK_INPUT_FETCH_START: {
      const fetchedTanks = {...state.fetchedTanks};
      fetchedTanks[action.id] = {
        inProgress: true,
        errors: null,
        data: {}
      }
      return {
        ...state,
        ...{ fetchedTanks }
      }
    }
    case TANK_INPUT_FETCH_SUCCESS: {
      const fetchedTanks = {...state.fetchedTanks};
      fetchedTanks[action.id] = {
        data: action.data,
        inProgress: false,
        errors: false,
      }
      return {
        ...state,
        ...{ fetchedTanks },
        fetchedTanksCount: state.fetchedTanksCount + 1
      }
    }
    case TANK_INPUT_FETCH_FAIL: {
      const fetchedTanks = {...state.fetchedTanks};
      fetchedTanks[action.id] = {
        inProgress: false,
        errors: action.errors,
      }
      return {
        ...state,
        ...{ fetchedTanks },
        fetchedTanksCount: state.fetchedTanksCount + 1
      }
    }
    case TANK_INPUT_FETCH_CLEAN: {
      return {
        ...state,
        ...{ fetchedTanks: {} },
        fetchedTanksCount: 0
      } 
    }
    default: return state;
  }
}