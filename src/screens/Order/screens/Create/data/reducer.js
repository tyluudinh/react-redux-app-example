import {
  ORDER_CREATE_START,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_CLEAN,
  ORDER_CREATE_DETAIL_VALIDATE_START,
  ORDER_CREATE_DETAIL_VALIDATE_PASS,
  ORDER_CREATE_DETAIL_VALIDATE_FAIL,
  ORDER_CREATE_LOGISTIC_VALIDATE_START,
  ORDER_CREATE_LOGISTIC_VALIDATE_PASS,
  ORDER_CREATE_LOGISTIC_VALIDATE_FAIL,
  ORDER_CREATE_RESET,
} from './actionTypes';

import { cleanFieldErrors } from 'app/services/error';

const initialState = {
  inProgress: false,
  errors: null,
  detailPassed: false,
  logisticPassed: false,
  submittedId: null,
  fields: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ORDER_CREATE_DETAIL_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_CREATE_DETAIL_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        detailPassed: true,
        fields: {
          ...state.fields,
          ...action.fields,
        }
      }
    }
    case ORDER_CREATE_DETAIL_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        detailPassed: false,
        errors: action.errors,
        fields: {
          ...state.fields,
          ...action.fields,
        }
      }
    }
    case ORDER_CREATE_LOGISTIC_VALIDATE_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ORDER_CREATE_LOGISTIC_VALIDATE_PASS: {
      return {
        ...state,
        inProgress: false,
        logisticPassed: true,
        fields: {
          ...state.fields,
          ...action.fields,
        }
      }
    }
    case ORDER_CREATE_LOGISTIC_VALIDATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        logisticPassed: false,
        errors: action.errors,
        fields: {
          ...state.fields,
          ...action.fields,
        }
      }
    }
    case ORDER_CREATE_START: {
      return {
        ...state,
        inProgress: true,
        errors: false,
      }
    }
    case ORDER_CREATE_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        submittedId: action.id,
      }
    }
    case ORDER_CREATE_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors
      }
    }
    case ORDER_CREATE_CLEAN: {
      return {
        ...state,
        detailPassed: false,
        logisticPassed: false,
        errors: null,
        submittedId: null,
        fields: cleanFieldErrors(state.fields)
      }
    }
    case ORDER_CREATE_RESET: {
      return {...initialState}
    }
    default: return state
  }
}