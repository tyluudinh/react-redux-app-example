import { put, call, takeLatest } from "redux-saga/effects";
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL
} from "./actionTypes";
import { forgotApi } from "./api";
import { getErrors } from 'app/services/error';
import { validateEmail } from 'app/utils/common';
import Language from 'app/languages/index';

//A worker for login
function* forgotPassword( { data } ) {
  const { email } = data;
  yield put({ type: FORGOT_PASSWORD_START });
  if (email.length === 0) {
    yield put({ type: FORGOT_PASSWORD_FAIL, errors: Language.userEntry.errorsFindYourAccount.blank });
    return false;
  }
  if (!validateEmail(email)) {
    yield put({ type: FORGOT_PASSWORD_FAIL, errors: Language.formatString(Language.userEntry.errorsFindYourAccount.validateEmail, {
      email: email
    }) });
    return false;
  }
  
  try {
    const result = yield call(forgotApi, email);
    if (result) {
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
