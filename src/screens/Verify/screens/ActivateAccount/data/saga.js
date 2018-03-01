import { put, call, takeLatest } from 'redux-saga/effects';
import {
  VERIFY_ACTIVATE_ACCOUNT,
  VERIFY_ACTIVATE_ACCOUNT_START,
  VERIFY_ACTIVATE_ACCOUNT_SUCCESS,
  VERIFY_ACTIVATE_ACCOUNT_FAIL,
} from './actionTypes';

import { activateAccountApi } from './api';
import { getErrors } from 'app/services/error';

function* activateAccount({ token }) {
  yield put({ type: VERIFY_ACTIVATE_ACCOUNT_START });
  try {
    const result = yield call(activateAccountApi, token);
    if (result) {
      console.log(result);
      yield put({ type: VERIFY_ACTIVATE_ACCOUNT_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: VERIFY_ACTIVATE_ACCOUNT_FAIL, errors })
  }
}

export default function* VerifyActivateAccountSaga() {
  yield takeLatest(VERIFY_ACTIVATE_ACCOUNT, activateAccount);
}