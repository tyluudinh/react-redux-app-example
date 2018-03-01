import { put, call, takeLatest } from 'redux-saga/effects';
import {
  TANK_DETAIL_FETCH,
  TANK_DETAIL_FETCH_START,
  TANK_DETAIL_FETCH_SUCCESS,
  TANK_DETAIL_FETCH_FAIL,
  TANK_DETAIL_DEREGISTER,
  TANK_DETAIL_DEREGISTER_START,
  TANK_DETAIL_DEREGISTER_SUCCESS,
  TANK_DETAIL_DEREGISTER_FAIL
} from './actionTypes';
import { getErrors } from 'app/services/error';
import { toClientFormat } from './transform';

import { fetchDetailApi, deregisterApi } from './api';

function* fetchDetail({ id }) {
  yield put({ type: TANK_DETAIL_FETCH_START });
  try {
    const result = yield call(fetchDetailApi, id);
    if (result) {
      const detail = (result.data) ? result.data : {};
      yield put({ type: TANK_DETAIL_FETCH_SUCCESS, detail: toClientFormat(detail) })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_DETAIL_FETCH_FAIL, errors })
  }
}

function* deregister({ id }) {
  yield put({ type: TANK_DETAIL_DEREGISTER_START });
  try {
    const result = yield call(deregisterApi, id);
    if (result) {
      const detail = (result.data) ? result.data : {};
      yield put({ type: TANK_DETAIL_DEREGISTER_SUCCESS, detail: toClientFormat(detail) })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_DETAIL_DEREGISTER_FAIL, errors })
  }
}

export default function* tankDetailSaga() {
  yield [
    takeLatest(TANK_DETAIL_FETCH, fetchDetail),
    takeLatest(TANK_DETAIL_DEREGISTER, deregister),
  ]
}