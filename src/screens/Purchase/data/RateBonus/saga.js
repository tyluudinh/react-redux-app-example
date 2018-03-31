import { put, call, takeLatest } from 'redux-saga/effects';
import {
  PURCHASE_FETCH_RATE_BONUS,
  PURCHASE_FETCH_RATE_BONUS_START,
  PURCHASE_FETCH_RATE_BONUS_SUCCESS,
  PURCHASE_FETCH_RATE_BONUS_FAIL,
} from './actionTypes';

import { getRateBonusPayment } from './api';
import { getErrors } from 'app/services/error';

function* paymentRates() {
  yield put({ type: PURCHASE_FETCH_RATE_BONUS_START });
  try {
    const res = yield call(getRateBonusPayment);
    if (res) {
      yield put({ type: PURCHASE_FETCH_RATE_BONUS_SUCCESS, ...res.data })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: PURCHASE_FETCH_RATE_BONUS_FAIL, errors })
  }
}

export default function* mainPurchaseFeeSaga() {
  yield takeLatest(PURCHASE_FETCH_RATE_BONUS, paymentRates);
}