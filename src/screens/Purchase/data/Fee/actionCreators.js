import {
  PURCHASE_FETCH_FEE, PURCHASE_FETCH_FEE_CLEAN
} from './actionTypes';

export const getFeePayment = (dispatch, params) => {
  dispatch({
    type: PURCHASE_FETCH_FEE,
    params
  })
};

export const cleanGetFee = (dispatch) => {
  dispatch({ type: PURCHASE_FETCH_FEE_CLEAN });
};