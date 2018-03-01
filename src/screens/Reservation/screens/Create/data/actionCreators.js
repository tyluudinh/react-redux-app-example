import {
  RESERVATION_CREATE,
  RESERVATION_CREATE_VALIDATE,
  RESERVATION_CREATE_CLEAN,
  RESERVATION_CREATE_RESET,
} from './actionTypes';

export const validateReservation = (dispatch, data) => {
  dispatch({ type: RESERVATION_CREATE_VALIDATE, data });
}

export const createReservation = (dispatch, data) => {
  dispatch({ type: RESERVATION_CREATE, data });
}

export const cleanReservation = (dispatch) => {
  dispatch({ type: RESERVATION_CREATE_CLEAN });
}

export const resetReservation = (dispatch) => {
  dispatch({ type: RESERVATION_CREATE_RESET });
}