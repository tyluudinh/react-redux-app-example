import {
  TANK_EDIT_START,
  TANK_EDIT_SUCCESS,
  TANK_EDIT_FAIL,
  TANK_EDIT_VALIDATE_START,
  TANK_EDIT_VALIDATE_PASS,
  TANK_EDIT_VALIDATE_FAIL,
  TANK_EDIT_FETCH_START,
  TANK_EDIT_FETCH_SUCCESS,
  TANK_EDIT_FETCH_FAIL,
  TANK_EDIT_CLEAN
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  fetchErrors: null,
  passed: false,
  submitted: false,
  fetched: false,
  fields: {}
}

const cleanErrors = (fields) => {
  const result = {};
  for (let key in fields) {
    const field = {...fields[key]}
    field.errors = [];
    result[key] = field;
  }
  return result;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TANK_EDIT_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case TANK_EDIT_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        passed: true,
        fields: action.fields,
      }
    }
    case TANK_EDIT_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case TANK_EDIT_START: {
      return {
        ...state,
        inProgress: true,
        errors: false,
      }
    }
    case TANK_EDIT_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submitted: true 
      }
    }
    case TANK_EDIT_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors
      }
    }
    case TANK_EDIT_FETCH_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case TANK_EDIT_FETCH_SUCCESS: {
      return {
        ...state,
        fetched: true,
        fields: action.fields,
        inProgress: false,
      }
    }
    case TANK_EDIT_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        fetchErrors: action.errors,
      }
    }

    case TANK_EDIT_CLEAN: {
      return {
        ...state,
        passed: false,
        submitted: false,
        errors: null,
        fetchErrors: null,
        fetched: false,
        fields: cleanErrors(state.fields)
      }
    }
    default: return state
  }
}