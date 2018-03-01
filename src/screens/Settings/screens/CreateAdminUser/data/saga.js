import { put, call, takeLatest } from 'redux-saga/effects';

import { getErrors } from 'app/services/error';

import {
  SETTING_ADMIN_USER_CREATE,
  SETTING_ADMIN_USER_CREATE_START,
  SETTING_ADMIN_USER_CREATE_SUCCESS,
  SETTING_ADMIN_USER_CREATE_FAIL,
  SETTING_ADMIN_USER_CREATE_VALIDATE,
  SETTING_ADMIN_USER_CREATE_VALIDATE_START,
  SETTING_ADMIN_USER_CREATE_VALIDATE_SUCCESS,
  SETTING_ADMIN_USER_CREATE_VALIDATE_FAIL,
} from './actionTypes';

import validate from './validate';
import { adminCreateApi } from './api';
import { toServerFormat } from './transform';

function* submitAdminCreate({ data }) {
  yield put({ type: SETTING_ADMIN_USER_CREATE_START })
  try {
    const result = yield call(adminCreateApi, toServerFormat(data));
    if (result) {
      console.log('response', result);
      yield put({ type: SETTING_ADMIN_USER_CREATE_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: SETTING_ADMIN_USER_CREATE_FAIL, errors })
  }
}

function* validateAdminCreate({ data }) {
  yield put({ type: SETTING_ADMIN_USER_CREATE_VALIDATE_START });
  try {
    const result = validate(data);
    const { fields, failed } = result;
    if (failed) {
      yield put({ type: SETTING_ADMIN_USER_CREATE_VALIDATE_FAIL, fields, errors: [{ message: 'Please make sure all the fields are correct! '}]})
    } else {
      yield put({ type: SETTING_ADMIN_USER_CREATE_VALIDATE_SUCCESS, fields });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: SETTING_ADMIN_USER_CREATE_VALIDATE_FAIL, errors })
  }
}

export default function* adminCreateSaga() {
  yield [
    takeLatest(SETTING_ADMIN_USER_CREATE, submitAdminCreate),
    takeLatest(SETTING_ADMIN_USER_CREATE_VALIDATE, validateAdminCreate)
  ]
}