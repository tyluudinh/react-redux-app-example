import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  RESERVATION_INPUT_SEARCH,
  RESERVATION_INPUT_SEARCH_START,
  RESERVATION_INPUT_SEARCH_SUCCESS,
  RESERVATION_INPUT_SEARCH_FAIL,
  RESERVATION_INPUT_FETCH,
  RESERVATION_INPUT_FETCH_START,
  RESERVATION_INPUT_FETCH_SUCCESS,
  RESERVATION_INPUT_FETCH_FAIL
} from './actionTypes';

import { searchReservationsApi, fetchReservationApi } from './api';
import { getErrors } from 'app/services/error';
import { toClientFormat, toReservationClientFormat } from './transform';

function* searchReservations ({ query }) {
  yield put({ type: RESERVATION_INPUT_SEARCH_START });  
  try {
    const result = yield call(searchReservationsApi, query);
    if (result) {
      const list = toClientFormat(result.data.data);
      yield put({ type: RESERVATION_INPUT_SEARCH_SUCCESS, list })
    }
  } catch(err) {
    const errors = getErrors(err)
    yield put({ type: RESERVATION_INPUT_SEARCH_FAIL, errors })
  }
}

function* fetchReservation ({ id }) {
  yield put({ type: RESERVATION_INPUT_FETCH_START });
  try {
    const result = yield call(fetchReservationApi, id);
    console.log(result);
    if (result) {
      const data = result.data ? toReservationClientFormat(result.data) : {};
      yield put({ type: RESERVATION_INPUT_FETCH_SUCCESS, data, id });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_INPUT_FETCH_FAIL, id, errors });
  }
}

export default function* reservationInputSaga() {
  yield [
    takeLatest(RESERVATION_INPUT_SEARCH, searchReservations),
    takeEvery(RESERVATION_INPUT_FETCH, fetchReservation)
  ]
}