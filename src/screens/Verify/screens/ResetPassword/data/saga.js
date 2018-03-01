import { put, call, takeLatest } from 'redux-saga/effects';
import {
  VERIFY_RESET_PASSWORD,
  VERIFY_RESET_PASSWORD_START,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAIL,
} from './actionTypes';

import { resetPasswordApi } from './api';
import { getErrors } from 'app/services/error';

function* resetPassword({ token, password, confirmPassword }) {
  yield put({ type: VERIFY_RESET_PASSWORD_START });
  try {
    if (password !== confirmPassword) {
      yield put({ type: VERIFY_RESET_PASSWORD_FAIL, errors: [{ message: 'passwords do not match!' }] })
    } else {
      console.log(token, password);
      const result = yield call(resetPasswordApi, token, password );
      if (result) {
        yield put({ type: VERIFY_RESET_PASSWORD_SUCCESS })
      }
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: VERIFY_RESET_PASSWORD_FAIL, errors })
  }
}

export default function* VerifyResetPasswordSaga() {
  yield takeLatest(VERIFY_RESET_PASSWORD, resetPassword);
}