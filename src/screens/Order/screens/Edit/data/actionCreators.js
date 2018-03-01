import {
  ORDER_EDIT_VALIDATE,
  ORDER_EDIT_FETCH,
  ORDER_EDIT_CLEAN,
} from "./actionTypes";

export const submitOrderEdit = (dispatch, data) => {
  dispatch({
    type: ORDER_EDIT_VALIDATE,
    data
  });
};

export const cleanOrderEdit = dispatch => {
  dispatch({ type: ORDER_EDIT_CLEAN });
};

export const fetchOrderEdit = (dispatch, id) => {
  dispatch({ type: ORDER_EDIT_FETCH, id });
};