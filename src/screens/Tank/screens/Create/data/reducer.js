import {
  TANK_CREATE_START,
  TANK_CREATE_SUCCESS,
  TANK_CREATE_FAIL,
  TANK_CREATE_CLEAN,
  TANK_CREATE_VALIDATE_START,
  TANK_CREATE_VALIDATE_PASS,
  TANK_CREATE_VALIDATE_FAIL,
  TANK_CREATE_RESET,
} from './actionTypes';

import { cleanFieldErrors } from 'app/services/error';

const initialState = {
  inProgress: false,
  errors: null,
  passed: false,
  submitted: false,
  submittedId: null,
  fields: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TANK_CREATE_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case TANK_CREATE_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        passed: true,
        fields: action.fields,
      }
    }
    case TANK_CREATE_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
        fields: action.fields,
      }
    }
    case TANK_CREATE_START: {
      return {
        ...state,
        inProgress: true,
        errors: false,
      }
    }
    case TANK_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submitted: true,
        submittedId: action.id,
      }
    }
    case TANK_CREATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors
      }
    }
    case TANK_CREATE_CLEAN: {
      return {
        ...state,
        passed: false,
        submitted: false,
        errors: null,
        submittedId: null,
        fields: cleanFieldErrors(state.fields)
      }
    }
    case TANK_CREATE_RESET: {
      return {...initialState}
    }
    default: return state
  }
}