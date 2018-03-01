import { put, call, takeEvery } from "redux-saga/effects";
import {
  RESOURCE_ADD,
  RESOURCE_ADD_START,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_FAIL,
  RESOURCE_FETCH,
  RESOURCE_FETCH_START,
  RESOURCE_FETCH_SUCCESS,
  RESOURCE_FETCH_FAIL,
} from "./actionTypes";
import { getErrors } from 'app/services/error';

import { fetchResourceApi, addResourceApi } from './api';

//Add new resource
function* addResource({ key, value }) {
  yield put({ type: RESOURCE_ADD_START, key, value });
  try {
    const result = yield call(addResourceApi, { key, value });
    if (result) {
      yield put({ type: RESOURCE_ADD_SUCCESS, key, value })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESOURCE_ADD_FAIL, key, value, errors })
  }
}

//Fetch the resource list
function* fetchResource({ key }) {
  yield put({ type: RESOURCE_FETCH_START, key });
  try {
    const result = yield call(fetchResourceApi, { key });
    if (result) {
      const list = (result.data) ? result.data.data : [];
      yield put({ type: RESOURCE_FETCH_SUCCESS, key, list })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESOURCE_FETCH_FAIL, key, errors })
  }
}

export default function* resourceSaga() {
  yield [
    takeEvery(RESOURCE_ADD, addResource),
    takeEvery(RESOURCE_FETCH, fetchResource)
  ];
}
