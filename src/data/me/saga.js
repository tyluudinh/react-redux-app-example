import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  ME_LOGIN,
  ME_LOGIN_START,
  ME_LOGIN_SUCCESS,
  ME_LOGIN_FAIL,
  
  ME_LOGIN_SOCIAL,
  ME_LOGIN_SOCIAL_START,
  ME_LOGIN_SOCIAL_SUCCESS,
  ME_LOGIN_SOCIAL_FAIL,
  
  ME_LOGOUT,
  ME_LOGOUT_START,
  ME_LOGOUT_SUCCESS,
  ME_LOGOUT_FAIL,
} from "./actionTypes";

import { authenticate, signout, signInSocial } from "app/services/auth";
import { signUp } from "./api";
import { getErrors } from 'app/services/error';
import { validateEmail } from 'app/utils/common';
import { toMeClientFormat } from './transform';
import Language from 'app/languages/index'

//A worker for login
function* login({ username, password, urlType }) {
  yield put({ type: ME_LOGIN_START });
  try {
    if (!validateEmail(username)) {
      yield put({ type: ME_LOGIN_FAIL, errors: Language.formatString(Language.userEntry.errorsFindYourAccount.validateEmail, {
        email: username
      })  });
      return false;
    }
    let result = null;
    if ( urlType === 'login') {
      result = yield call(authenticate, username, password);
    } else {
      let data = {
        username,
        password,
        email: username
      };
      result = yield call(signUp, data);
    }
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
function* loginBySocial({ accessToken, provider }) {
  yield put({ type: ME_LOGIN_SOCIAL_START });
  try {
    const result = yield call(signInSocial, accessToken, provider);
    if (result) {
      const { access_token, user } = result.data || {};
      yield put({
        type: ME_LOGIN_SOCIAL_SUCCESS,
        token: access_token,
        info: toMeClientFormat(user, provider),
      });
    }
  } catch (err) {
    const errors = `Login ${provider} fail`;
    yield put({ type: ME_LOGIN_SOCIAL_FAIL, errors });
  }
}

function* logout({ history }) {
  yield put({ type: ME_LOGOUT_START });
  try {
    const result = yield call(signout);
    if (result) {
      yield put({
        type: ME_LOGOUT_SUCCESS,
        // token: result.data.access_token
      });
      history.push("/");
    }
  } catch (err) {
    const errors = getErrors(err);
    yield put({ type: ME_LOGOUT_FAIL, errors });
  }
}

export default function* meSaga() {
  yield [
    takeEvery(ME_LOGIN, login),
    takeLatest(ME_LOGOUT, logout),
    takeLatest(ME_LOGIN_SOCIAL, loginBySocial)
  ];
}
