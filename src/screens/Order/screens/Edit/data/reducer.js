import {
  ORDER_EDIT_START,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_EDIT_VALIDATE_START,
  ORDER_EDIT_VALIDATE_PASS,
  ORDER_EDIT_VALIDATE_FAIL,
  ORDER_EDIT_FETCH_START,
  ORDER_EDIT_FETCH_SUCCESS,
  ORDER_EDIT_FETCH_FAIL,
  ORDER_EDIT_CLEAN,
} from './actionTypes';

const initialState = {
  inProgress: false,
  errors: null,
  fetchErrors: null,
  submitted: false,
  fetched: false,
  fields: {},
  tanks: {},
  reservations: {},
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
    case ORDER_EDIT_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_EDIT_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        fields: action.fields,
      }
    }
    case ORDER_EDIT_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case ORDER_EDIT_START: {
      return {
        ...state,
        inProgress: true,
        errors: false,
      }
    }
    case ORDER_EDIT_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submitted: true 
      }
    }
    case ORDER_EDIT_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        submitted: false,
      }
    }
    case ORDER_EDIT_FETCH_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_EDIT_FETCH_SUCCESS: {
      return {
        ...state,
        fetched: true,
        fields: action.fields,
        inProgress: false,
      }
    }
    case ORDER_EDIT_FETCH_FAIL: {
      return {
        ...state,
        inProgress: false,
        fetchErrors: action.errors,
      }
    }
    case ORDER_EDIT_CLEAN: {
      return {
        ...state,
        submitted: false,
        errors: null,
        fetchErrors: null,
        fetched: false,
        fields: cleanErrors(state.fields),
        tanks: {},
        reservations: {},
      }
    }
    default: return state
  }
}