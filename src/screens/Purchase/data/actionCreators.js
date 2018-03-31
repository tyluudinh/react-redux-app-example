import {
  PURCHASE_STRIPE, PURCHASE_STRIPE_CLEAN
} from './actionTypes';

export const submitPayment = (dispatch, data, history) => {
  dispatch({
    type: PURCHASE_STRIPE,
    data,
    history
  })
};

export const clean = (dispatch) => {
  dispatch({ type: PURCHASE_STRIPE_CLEAN });
};