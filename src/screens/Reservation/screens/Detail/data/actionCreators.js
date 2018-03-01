import {
  RESERVATION_DETAIL_FETCH,
  RESERVATION_DETAIL_CLEAN,
  RESERVATION_DETAIL_TANK_FETCH,
  RESERVATION_DETAIL_DELETE
} from './actionTypes';

export const fetchDetail = (dispatch, id) => {
  dispatch({ type: RESERVATION_DETAIL_FETCH, id })
}

export const fetchTank = (dispatch, id) => {
  dispatch({ type: RESERVATION_DETAIL_TANK_FETCH, id });
}

export const cleanDetail = (dispatch) => {
  dispatch({ type: RESERVATION_DETAIL_CLEAN })
}

export const deleteReservation = (dispatch, id) => {
  dispatch({ type: RESERVATION_DETAIL_DELETE, id })
}