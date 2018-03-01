import { put, call, takeLatest } from 'redux-saga/effects';
import { SIGNUP, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from './actionTypes';
import { signupCall } from './api';
import { getErrors } from 'app/services/error';

//A worker for login
function* signup({ userInfo }) {
  yield put({ type: SIGNUP_START });
  try {
    const data = yield call(signupCall, userInfo)
    if (data) {
      yield put({ type: SIGNUP_SUCCESS });
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: SIGNUP_FAIL, errors })
  }
}

export default function* signupSaga() {
  yield [
    takeLatest(SIGNUP, signup),
  ]
}