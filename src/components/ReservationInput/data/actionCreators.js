import {
  RESERVATION_INPUT_SEARCH,
  RESERVATION_INPUT_FETCH,
  RESERVATION_INPUT_CLEAN
} from './actionTypes';

export const searchReservation = (dispatch, query) => {
  dispatch({ type: RESERVATION_INPUT_SEARCH, query });
}

export const fetchReservation = (dispatch, id) => {
  dispatch({ type: RESERVATION_INPUT_FETCH, id });
}

export const cleanResult = (dispatch) => {
  dispatch({ type: RESERVATION_INPUT_CLEAN });
}