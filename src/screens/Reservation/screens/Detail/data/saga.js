import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  RESERVATION_DETAIL_FETCH,
  RESERVATION_DETAIL_FETCH_START,
  RESERVATION_DETAIL_FETCH_SUCCESS,
  RESERVATION_DETAIL_FETCH_FAIL,
  RESERVATION_DETAIL_TANK_FETCH,
  RESERVATION_DETAIL_TANK_FETCH_START,
  RESERVATION_DETAIL_TANK_FETCH_SUCCESS,
  RESERVATION_DETAIL_TANK_FETCH_FAIL,
  RESERVATION_DETAIL_DELETE,
  RESERVATION_DETAIL_DELETE_START,
  RESERVATION_DETAIL_DELETE_SUCCESS,
  RESERVATION_DETAIL_DELETE_FAIL,
} from './actionTypes';
import { getErrors } from 'app/services/error';
import { toClientFormat, toTankClientFormat } from './transform';

import { fetchDetailApi, fetchTankApi, deleteApi } from './api';

function* fetchDetail({ id }) {
  yield put({ type: RESERVATION_DETAIL_FETCH_START });
  try {
    const result = yield call(fetchDetailApi, id);
    if (result) {
      const detail = (result.data) ? toClientFormat(result.data) : {};
      yield put({ type: RESERVATION_DETAIL_FETCH_SUCCESS, detail })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_DETAIL_FETCH_FAIL, errors })
  }
}

function* deleteReservation({ id }) {
  yield put({ type: RESERVATION_DETAIL_DELETE_START });
  try {
    const result = yield call(deleteApi, id);
    if (result) {
      yield put({ type: RESERVATION_DETAIL_DELETE_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_DETAIL_DELETE_FAIL, errors })
  }
}

function* fetchTank({ id }) {
  yield put({ type: RESERVATION_DETAIL_TANK_FETCH_START, id });
  try {
    const result = yield call(fetchTankApi, id);
    if (result) {
      const data = (result.data) ? toTankClientFormat(result.data) : {};
      yield put({ type: RESERVATION_DETAIL_TANK_FETCH_SUCCESS, data, id })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_DETAIL_TANK_FETCH_FAIL, errors, id })
  }
}

export default function* reservationDetailSaga() {
  yield [
    takeLatest(RESERVATION_DETAIL_FETCH, fetchDetail),
    takeLatest(RESERVATION_DETAIL_DELETE, deleteReservation),
    takeEvery(RESERVATION_DETAIL_TANK_FETCH, fetchTank)
  ]
}