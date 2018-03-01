import {
  RESERVATION_EDIT_VALIDATE,
  RESERVATION_EDIT_FETCH,
  RESERVATION_EDIT_CLEAN,
} from "./actionTypes";

export const submitReservationEdit = (dispatch, data) => {
  dispatch({
    type: RESERVATION_EDIT_VALIDATE,
    data
  });
};

export const cleanReservationEdit = dispatch => {
  dispatch({ type: RESERVATION_EDIT_CLEAN });
};

export const fetchReservationEdit = (dispatch, id) => {
  dispatch({ type: RESERVATION_EDIT_FETCH, id });
};