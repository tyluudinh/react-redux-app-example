import { put, call, takeLatest } from 'redux-saga/effects';
import {
  TANK_LOGS_FETCH,
  TANK_LOGS_FETCH_START,
  TANK_LOGS_FETCH_SUCCESS,
  TANK_LOGS_FETCH_FAIL,
} from './actionTypes.js';

import { fetchLogsApi } from './api';
import { toClientFormat } from './transform';

import { getErrors } from 'app/services/error';

function* fetchLogs ({ id }) {
  yield put({ type: TANK_LOGS_FETCH_START })
  try {
    const result = yield call(fetchLogsApi, id);
    if (result) {
      const data = toClientFormat(result.data.data);
      yield put({ type: TANK_LOGS_FETCH_SUCCESS, data })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_LOGS_FETCH_FAIL, errors })
  }
}

export default function* tankLogSaga() {
  yield takeLatest(TANK_LOGS_FETCH, fetchLogs);
}