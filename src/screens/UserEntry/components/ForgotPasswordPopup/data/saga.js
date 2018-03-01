import { put, call, takeLatest } from "redux-saga/effects";
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL
} from "./actionTypes";
import { forgotApi } from "./api";
import { getErrors } from 'app/services/error';

//A worker for login
function* forgotPassword({ email }) {
  yield put({ type: FORGOT_PASSWORD_START });
  try {
    const data = yield call(forgotApi, email);
    if (data) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS });
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: FORGOT_PASSWORD_FAIL, errors });
  }
}

export default function* FORGOT_PASSWORDSaga() {
  yield [takeLatest(FORGOT_PASSWORD, forgotPassword)];
}
