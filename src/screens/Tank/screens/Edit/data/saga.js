import { call, put, takeLatest } from 'redux-saga/effects';

import validate from './validate';
import { getErrors } from 'app/services/error';
import { toServerFormat, toClientFormat } from './transform';

import {
  TANK_EDIT,
  TANK_EDIT_START,
  TANK_EDIT_SUCCESS,
  TANK_EDIT_FAIL,
  TANK_EDIT_VALIDATE,
  TANK_EDIT_VALIDATE_START,
  TANK_EDIT_VALIDATE_FAIL,
  TANK_EDIT_VALIDATE_PASS,
  TANK_EDIT_FETCH,
  TANK_EDIT_FETCH_START,
  TANK_EDIT_FETCH_SUCCESS,
  TANK_EDIT_FETCH_FAIL,
} from './actionTypes';

import { editTankApi, fetchTankDetailApi } from './api';

function* tankEdit({ data }) {
  yield put({ type: TANK_EDIT_START });
  try {
    const requestData = toServerFormat(data);
    const result = yield call(editTankApi, requestData.id, requestData)
    if (result) {
      yield put({ type: TANK_EDIT_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_EDIT_FAIL, errors })
  }
}

function* tankValidate({ data }) {
  yield put({ type: TANK_EDIT_VALIDATE_START });
  try {
    const result = yield call(validate, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: TANK_EDIT_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: TANK_EDIT_VALIDATE_PASS, fields })
      yield tankEdit({ data: fields });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_EDIT_VALIDATE_FAIL, errors })
  }
}

function* tankFetch({ id }) {
  yield put({ type: TANK_EDIT_FETCH_START });
  try {
    const result = yield call(fetchTankDetailApi, id);
    if (result) {
      const fields = result.data;
      yield put({ type: TANK_EDIT_FETCH_SUCCESS, fields: toClientFormat(fields)})
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_EDIT_FETCH_FAIL, errors })
  }
  
}

export default function* tankEditSaga() {
  yield [
    takeLatest(TANK_EDIT, tankEdit),
    takeLatest(TANK_EDIT_VALIDATE, tankValidate),
    takeLatest(TANK_EDIT_FETCH, tankFetch)
  ]

}