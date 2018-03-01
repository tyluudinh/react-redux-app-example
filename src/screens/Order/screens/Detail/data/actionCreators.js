import {
  ORDER_DETAIL_FETCH,
  ORDER_DETAIL_CLEAN,
  ORDER_DETAIL_TANK_FETCH,
  ORDER_DETAIL_RESERVATION_FETCH,
  ORDER_DETAIL_DELETE,
  ORDER_DETAIL_SET_COMPLETE,
} from './actionTypes';

export const fetchDetail = (dispatch, id) => {
  dispatch({ type: ORDER_DETAIL_FETCH, id })
}

export const fetchTank = (dispatch, id) => {
  dispatch({ type: ORDER_DETAIL_TANK_FETCH, id });
}

export const fetchReservation = (dispatch, id) => {
  dispatch({ type: ORDER_DETAIL_RESERVATION_FETCH, id });
}

export const cleanDetail = (dispatch) => {
  dispatch({ type: ORDER_DETAIL_CLEAN })
}

export const deleteOrder = (dispatch, id) => {
  dispatch({ type: ORDER_DETAIL_DELETE, id })
}

export const completeOrder = (dispatch, id) => {
  dispatch({ type: ORDER_DETAIL_SET_COMPLETE, id })
}