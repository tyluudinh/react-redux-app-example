import { put, call, takeLatest } from "redux-saga/effects";
import {
  ME_LOGIN,
  ME_LOGIN_START,
  ME_LOGIN_SUCCESS,
  ME_LOGIN_FAIL,
  ME_LOGOUT,
  ME_LOGOUT_START,
  ME_LOGOUT_SUCCESS,
  ME_LOGOUT_FAIL,
} from "./actionTypes";
import { toMeClientFormat } from './transform';

import { authenticate, signout } from "app/services/auth";
import { getErrors } from 'app/services/error';

//A worker for login
function* login({ email, password }) {
  yield put({ type: ME_LOGIN_START });
  try {
    const result = yield call(authenticate, email, password);
    console.log('login', result);
    if (result) {
        const { access_token, user } = result.data || {};
        yield put({
          type: ME_LOGIN_SUCCESS,
          token: access_token,
          info: toMeClientFormat(user),
        });
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: ME_LOGIN_FAIL, errors });
  }
}

function* logout({ history }) {
  yield put({ type: ME_LOGOUT_START });
  try {
    const result = yield call(signout);
    if (result) {
      yield put({
        type: ME_LOGOUT_SUCCESS,
        token: result.data.access_token
      });
      history.push("/");
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: ME_LOGOUT_FAIL, errors });
  }
}

export default function* meSaga() {
  yield [takeLatest(ME_LOGIN, login), takeLatest(ME_LOGOUT, logout)];
}
