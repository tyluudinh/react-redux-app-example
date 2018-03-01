import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ORDER_DETAIL_FETCH,
  ORDER_DETAIL_FETCH_START,
  ORDER_DETAIL_FETCH_SUCCESS,
  ORDER_DETAIL_FETCH_FAIL,
  ORDER_DETAIL_TANK_FETCH,
  ORDER_DETAIL_TANK_FETCH_START,
  ORDER_DETAIL_TANK_FETCH_SUCCESS,
  ORDER_DETAIL_TANK_FETCH_FAIL,
  ORDER_DETAIL_RESERVATION_FETCH,
  ORDER_DETAIL_RESERVATION_FETCH_START,
  ORDER_DETAIL_RESERVATION_FETCH_SUCCESS,
  ORDER_DETAIL_RESERVATION_FETCH_FAIL,
  ORDER_DETAIL_DELETE,
  ORDER_DETAIL_DELETE_START,
  ORDER_DETAIL_DELETE_SUCCESS,
  ORDER_DETAIL_DELETE_FAIL,
  ORDER_DETAIL_SET_COMPLETE_START,
  ORDER_DETAIL_SET_COMPLETE_SUCCESS,
  ORDER_DETAIL_SET_COMPLETE_FAIL,
  ORDER_DETAIL_SET_COMPLETE,
} from './actionTypes';
import { getErrors } from 'app/services/error';
import { toClientFormat, toTankClientFormat, toReservationClientFormat } from './transform';

import { fetchDetailApi, fetchTankApi, deleteApi, fetchReservationApi, completeApi } from './api';

function* fetchDetail({ id }) {
  yield put({ type: ORDER_DETAIL_FETCH_START });
  try {
    const result = yield call(fetchDetailApi, id);
    if (result) {
      const detail = (result.data) ? toClientFormat(result.data) : {};
      yield put({ type: ORDER_DETAIL_FETCH_SUCCESS, detail })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_DETAIL_FETCH_FAIL, errors })
  }
}

function* deleteOrder({ id }) {
  yield put({ type: ORDER_DETAIL_DELETE_START });
  try {
    const result = yield call(deleteApi, id);
    if (result) {
      yield put({ type: ORDER_DETAIL_DELETE_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_DETAIL_DELETE_FAIL, errors })
  }
}

function* completeOrder({ id }) {
  yield put({ type: ORDER_DETAIL_SET_COMPLETE_START });
  try {
    const result = yield call(completeApi, id);
    if (result) {
      yield put({ type: ORDER_DETAIL_SET_COMPLETE_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_DETAIL_SET_COMPLETE_FAIL, errors })
  }
}

function* fetchTank({ id }) {
  yield put({ type: ORDER_DETAIL_TANK_FETCH_START, id });
  try {
    const result = yield call(fetchTankApi, id);
    if (result) {
      const data = (result.data) ? toTankClientFormat(result.data) : {};
      yield put({ type: ORDER_DETAIL_TANK_FETCH_SUCCESS, data, id })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_DETAIL_TANK_FETCH_FAIL, errors, id })
  }
}

function* fetchReservation({ id }) {
  yield put({ type: ORDER_DETAIL_RESERVATION_FETCH_START, id });
  try {
    const result = yield call(fetchReservationApi, id);
    if (result) {
      const data = (result.data) ? toReservationClientFormat(result.data) : {};
      yield put({ type: ORDER_DETAIL_RESERVATION_FETCH_SUCCESS, data, id })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_DETAIL_RESERVATION_FETCH_FAIL, errors, id })
  }
}

export default function* reservationDetailSaga() {
  yield [
    takeLatest(ORDER_DETAIL_FETCH, fetchDetail),
    takeLatest(ORDER_DETAIL_DELETE, deleteOrder),
    takeLatest(ORDER_DETAIL_SET_COMPLETE, completeOrder),
    takeEvery(ORDER_DETAIL_TANK_FETCH, fetchTank),
    takeEvery(ORDER_DETAIL_RESERVATION_FETCH, fetchReservation)
  ]
}