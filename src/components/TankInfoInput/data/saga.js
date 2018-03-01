import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  TANK_INPUT_SEARCH,
  TANK_INPUT_SEARCH_START,
  TANK_INPUT_SEARCH_SUCCESS,
  TANK_INPUT_SEARCH_FAIL,
  TANK_INPUT_FETCH,
  TANK_INPUT_FETCH_START,
  TANK_INPUT_FETCH_SUCCESS,
  TANK_INPUT_FETCH_FAIL
} from './actionTypes';

import { searchTanksApi, fetchTankApi } from './api';
import { getErrors } from 'app/services/error';
import { toClientFormat, toTankClientFormat } from './transform';

function* searchTanks ({ query }) {
  yield put({ type: TANK_INPUT_SEARCH_START });  
  try {
    const result = yield call(searchTanksApi, query);
    if (result) {
      const list = toClientFormat(result.data.data);
      yield put({ type: TANK_INPUT_SEARCH_SUCCESS, list })
    }
  } catch(err) {
    const errors = getErrors(err)
    yield put({ type: TANK_INPUT_SEARCH_FAIL, errors })
  }
}

function* fetchTank ({ id }) {
  yield put({ type: TANK_INPUT_FETCH_START });
  try {
    const result = yield call(fetchTankApi, id);
    if (result) {
      const data = result.data ? toTankClientFormat(result.data) : {};
      yield put({ type: TANK_INPUT_FETCH_SUCCESS, data, id });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_INPUT_FETCH_FAIL, id, errors });
  }
}

export default function* tankInputSaga() {
  yield [
    takeLatest(TANK_INPUT_SEARCH, searchTanks),
    takeEvery(TANK_INPUT_FETCH, fetchTank)
  ]
}