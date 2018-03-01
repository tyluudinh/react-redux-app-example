import {
  RESERVATION_EDIT_START,
  RESERVATION_EDIT_SUCCESS,
  RESERVATION_EDIT_FAIL,
  RESERVATION_EDIT_VALIDATE_START,
  RESERVATION_EDIT_VALIDATE_PASS,
  RESERVATION_EDIT_VALIDATE_FAIL,
  RESERVATION_EDIT_FETCH_START,
  RESERVATION_EDIT_FETCH_SUCCESS,
  RESERVATION_EDIT_FETCH_FAIL,
  RESERVATION_EDIT_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  fetchErrors: null,
  submitted: false,
  fetched: false,
  fields: {},
  tanks: {},
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
    case RESERVATION_EDIT_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case RESERVATION_EDIT_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        fields: action.fields,
      }
    }
    case RESERVATION_EDIT_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case RESERVATION_EDIT_START: {
      return {
        ...state,
        inProgress: true,
        errors: false,
      }
    }
    case RESERVATION_EDIT_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submitted: true 
      }
    }
    case RESERVATION_EDIT_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        submitted: false,
      }
    }
    case RESERVATION_EDIT_FETCH_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case RESERVATION_EDIT_FETCH_SUCCESS: {
      return {
        ...state,
        fetched: true,
        fields: action.fields,
        inProgress: false,
      }
    }
    case RESERVATION_EDIT_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        fetchErrors: action.errors,
      }
    }
    case RESERVATION_EDIT_CLEAN: {
      return {
        ...state,
        submitted: false,
        errors: null,
        fetchErrors: null,
        fetched: false,
        fields: cleanErrors(state.fields),
        tanks: {},
      }
    }
    default: return state
  }
}