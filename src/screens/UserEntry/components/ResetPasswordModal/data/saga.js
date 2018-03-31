import { put, call, takeLatest } from "redux-saga/effects";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./actionTypes";
import { resetPasswordApi } from "./api";
import { getErrors } from 'app/services/error';
import Language from 'app/languages/index';

//A worker for login
function* resetPassword( { data } ) {
  const { reset_token, password } = data;
  yield put({ type: RESET_PASSWORD_START });
  if (reset_token.length === 0 || password.length === 0) {
    yield put({ type: RESET_PASSWORD_FAIL, errors: Language.userEntry.errorsResetPassword.blank });
    return false;
  }
  
  try {
    const result = yield call(resetPasswordApi, data);
    if (result) {
      yield put({ type: RESET_PASSWORD_SUCCESS });
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: RESET_PASSWORD_FAIL, errors });
  }
}

export default function* RESET_PASSWORDSaga() {
  yield [takeLatest(RESET_PASSWORD, resetPassword)];
}
