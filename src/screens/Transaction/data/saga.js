import { put, call, takeLatest } from 'redux-saga/effects';
import {
  TRANSACTION_LIST_FETCH,
  TRANSACTION_LIST_FETCH_START,
  TRANSACTION_LIST_FETCH_SUCCESS,
  TRANSACTION_LIST_FETCH_FAIL,
} from './actionTypes';

import { fetchListTransaction } from './api';
import { getErrors } from 'app/services/error';

function* fetchList(payload) {
  yield put({ type: TRANSACTION_LIST_FETCH_START });
  try {
    const { params } = payload;
    const result = yield call(fetchListTransaction, params);
    if (result) {
      const list = (result.data);
      yield put({ type: TRANSACTION_LIST_FETCH_SUCCESS, list })
    }
  } catch(err) {
    const fetchErrors = getErrors(err);
    yield put({ type: TRANSACTION_LIST_FETCH_FAIL, fetchErrors })
  }
}

export default function* transactionSaga() {
  yield [
    takeLatest(TRANSACTION_LIST_FETCH, fetchList),
  ]
}
