import {
  TRANSACTION_LIST_FETCH,
  TRANSACTION_LIST_FETCH_CLEAN,
} from './actionTypes';

export const fetchListTransaction = (dispatch, params) => {
  dispatch({ type: TRANSACTION_LIST_FETCH, params });
};

export const clean = (dispatch) => {
  dispatch({ type: TRANSACTION_LIST_FETCH_CLEAN });
};
