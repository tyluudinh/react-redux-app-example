import { put, call, takeLatest } from 'redux-saga/effects';
import {
  PURCHASE_STRIPE,
  PURCHASE_STRIPE_START,
  PURCHASE_STRIPE_SUCCESS,
  PURCHASE_STRIPE_FAIL,
} from './actionTypes';

import { submitPayment } from './api';
import { getErrors } from 'app/services/error';
import _ from 'lodash';
import i18n from 'app/languages/index';

function* payment({ data, history }) {
  yield put({ type: PURCHASE_STRIPE_START });
  try {
    const { amount, receiver_eth_address } = data;
    if (_.isEmpty(amount) || _.isEmpty(receiver_eth_address)) {
      yield put({ type: PURCHASE_STRIPE_FAIL, errors: i18n.purchaseScreen.errors.blank});
      return false;
    }
    const res = yield call(submitPayment, data);
    if (res) {
      yield put({ type: PURCHASE_STRIPE_SUCCESS });
      history.push('/transaction');
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: PURCHASE_STRIPE_FAIL, errors })
  }
}

export default function* mainPurchaseSaga() {
  yield takeLatest(PURCHASE_STRIPE, payment);
}