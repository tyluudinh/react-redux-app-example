import {
  RESERVATION_CREATE_START,
  RESERVATION_CREATE_SUCCESS,
  RESERVATION_CREATE_FAIL,
  RESERVATION_CREATE_VALIDATE_START,
  RESERVATION_CREATE_VALIDATE_SUCCESS,
  RESERVATION_CREATE_VALIDATE_FAIL,
  RESERVATION_CREATE_CLEAN,
  RESERVATION_CREATE_RESET
} from './actionTypes'

import { cleanFieldErrors } from 'app/services/error';

const initialState = {
  inProgress: false,
  errors: null,
  passed: false,
  submittedId: null,
  fields: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case RESERVATION_CREATE_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case RESERVATION_CREATE_VALIDATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        errors: false,
        passed: true,
        fields: action.fields,
      }
    }
    case RESERVATION_CREATE_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case RESERVATION_CREATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case RESERVATION_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        fields: action.fields,
        submittedId: action.id,
      }
    }
    case RESERVATION_CREATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }
    case RESERVATION_CREATE_CLEAN: {
      return {
        ...state,
        inProgress: false,
        errors: null,
        passed: false,
        submittedId: null,
        fields: cleanFieldErrors(state.fields)
      }
    }
    case RESERVATION_CREATE_RESET: {
      return {...initialState}
    }
    default: return state;
  }
}