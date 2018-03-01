import {
  ORDER_CREATE_DETAIL_VALIDATE,
  ORDER_CREATE_LOGISTIC_VALIDATE,
  ORDER_CREATE_CLEAN,
  ORDER_CREATE,
  ORDER_CREATE_RESET
} from "./actionTypes";

export const validateOrderDetail = (dispatch, data) => {
  dispatch({ type: ORDER_CREATE_DETAIL_VALIDATE, data });
};

export const validateOrderLogistic = (dispatch, data) => {
  dispatch({ type: ORDER_CREATE_LOGISTIC_VALIDATE, data });
};

export const cleanOrderCreateForm = dispatch => {
  dispatch({ type: ORDER_CREATE_CLEAN });
};

export const resetOrderCreateForm = dispatch => {
  dispatch({ type: ORDER_CREATE_RESET });
};

export const submitOrderCreate = (dispatch, data) => {
  dispatch({ type: ORDER_CREATE, data });
};
