import { put, call, takeLatest } from 'redux-saga/effects';
import {
  PURCHASE_FETCH_FEE,
  PURCHASE_FETCH_FEE_START,
  PURCHASE_FETCH_FEE_SUCCESS,
  PURCHASE_FETCH_FEE_FAIL,
} from './actionTypes';

import { getFeePayment } from './api';
import { getErrors } from 'app/services/error';

function* paymentFee({ params }) {
  yield put({ type: PURCHASE_FETCH_FEE_START });
  try {
    const res = yield call(getFeePayment, params);
    if (res) {
      yield put({ type: PURCHASE_FETCH_FEE_SUCCESS, ...res.data })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: PURCHASE_FETCH_FEE_FAIL, errors })
  }
}

export default function* mainPurchaseFeeSaga() {
  yield takeLatest(PURCHASE_FETCH_FEE, paymentFee);
}