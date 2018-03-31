import { put, call, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import {
  PROFILE_SETTING_USER_FETCH,
  PROFILE_SETTING_USER_FETCH_START,
  PROFILE_SETTING_USER_FETCH_SUCCESS,
  PROFILE_SETTING_USER_FETCH_FAIL,
  
  PROFILE_SETTING_USER_UPDATE,
  PROFILE_SETTING_USER_UPDATE_START,
  PROFILE_SETTING_USER_UPDATE_SUCCESS,
  PROFILE_SETTING_USER_UPDATE_FAIL
} from './actionTypes';

import { UPDATE_ME } from 'app/data/me/actionTypes';

import { fetchUserProfile, updateUserProfile } from './api';
import { getErrors } from 'app/services/error';
import { toUserListClientFormat } from './transform';
import i18n from 'app/languages/index';

function* fetchUserSaga() {
  yield put({ type: PROFILE_SETTING_USER_FETCH_START });
  try {
    const result = yield call(fetchUserProfile);
    if (result) {
      const info = toUserListClientFormat(result.data);
      yield put({ type: PROFILE_SETTING_USER_FETCH_SUCCESS, info })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: PROFILE_SETTING_USER_FETCH_FAIL, errors })
  }
}
function* updateUserSaga( { data }) {
  yield put({ type: PROFILE_SETTING_USER_UPDATE_START });
  try {
    const { ether_wallet_address } = data;
    if (_.isEmpty(ether_wallet_address)) {
      yield put({ type: PROFILE_SETTING_USER_UPDATE_FAIL, errors: i18n.profileScreen.errors.blank });
      return false;
    }
    const result = yield call(updateUserProfile, data);
    if (result) {
      const info = toUserListClientFormat(result.data);
      yield put({ type: PROFILE_SETTING_USER_UPDATE_SUCCESS, info });
      yield put({ type: UPDATE_ME, info });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: PROFILE_SETTING_USER_UPDATE_FAIL, errors })
  }
}

export default function* SettingSaga() {
  yield [
    takeLatest(PROFILE_SETTING_USER_FETCH, fetchUserSaga),
    takeLatest(PROFILE_SETTING_USER_UPDATE, updateUserSaga),
  ]
}
