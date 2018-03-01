import { call, put, takeLatest } from 'redux-saga/effects';
import validate from './validate';
import { toServerFormat } from './transform';
import { getErrors } from 'app/services/error';

import {
  TANK_CREATE,
  TANK_CREATE_START,
  TANK_CREATE_SUCCESS,
  TANK_CREATE_FAIL,
  TANK_CREATE_VALIDATE,
  TANK_CREATE_VALIDATE_START,
  TANK_CREATE_VALIDATE_FAIL,
  TANK_CREATE_VALIDATE_PASS,
} from './actionTypes';

import { createTankApi } from './api';

function* tankCreate({ data }) {
  yield put({ type: TANK_CREATE_START });
  try {
    const result = yield call(createTankApi, toServerFormat(data))
    if (result) {
      const id = result.data ? result.data.id : null;
      yield put({ type: TANK_CREATE_SUCCESS, data, id })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_CREATE_FAIL, errors })
  }
}

function* tankValidate({ data }) {
  yield put({ type: TANK_CREATE_VALIDATE_START });
  try {
    const result = yield call(validate, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: TANK_CREATE_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: TANK_CREATE_VALIDATE_PASS, fields })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: TANK_CREATE_VALIDATE_FAIL, errors })
  }
}

export default function* tankCreateSaga() {
  yield [
    takeLatest(TANK_CREATE, tankCreate),
    takeLatest(TANK_CREATE_VALIDATE, tankValidate)
  ]

}