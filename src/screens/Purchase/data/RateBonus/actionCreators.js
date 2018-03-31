import {
  PURCHASE_FETCH_RATE_BONUS, PURCHASE_FETCH_RATE_BONUS_CLEAN
} from './actionTypes';

export const getRatesBonusPayment = (dispatch) => {
  dispatch({
    type: PURCHASE_FETCH_RATE_BONUS,
  })
};

export const cleanGetRateBonus = (dispatch) => {
  dispatch({ type: PURCHASE_FETCH_RATE_BONUS_CLEAN });
};