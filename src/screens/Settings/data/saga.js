import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SETTING_USER_LIST_FETCH,
  SETTING_USER_LIST_FETCH_START,
  SETTING_USER_LIST_FETCH_SUCCESS,
  SETTING_USER_LIST_FETCH_FAIL,
  SETTING_USER_SET_PERMISSION,
  SETTING_USER_SET_PERMISSION_START,
  SETTING_USER_SET_PERMISSION_SUCCESS,
  SETTING_USER_SET_PERMISSION_FAIL,
} from './actionTypes';

import { fetchUserListApi, setUserPermissionApi } from './api';
import { getErrors } from 'app/services/error';
import { toUserListClientFormat, toServerPermissionRequest } from './transform';

function* fetchUserList() {
  yield put({ type: SETTING_USER_LIST_FETCH_START });
  try {
    const result = yield call(fetchUserListApi);
    if (result) {
      const list = toUserListClientFormat(result.data.data);
      yield put({ type: SETTING_USER_LIST_FETCH_SUCCESS, list })
    }
  } catch(err) {
    console.log(err);
    const errors = getErrors(err);
    yield put({ type: SETTING_USER_LIST_FETCH_FAIL, errors })
  }
}

function* setUserPermission({ acc }) {
  yield put({ type: SETTING_USER_SET_PERMISSION_START });
  try {
    const { id, permissionRequest } = toServerPermissionRequest(acc);
    const result = yield call(setUserPermissionApi, id, permissionRequest);
    if (result) {
      yield put({ type: SETTING_USER_SET_PERMISSION_SUCCESS })
    }
  } catch(err) {
    console.log(err);
    const errors = getErrors(err);
    yield put({ type: SETTING_USER_SET_PERMISSION_FAIL, errors })
  }
}

export default function* SettingSaga() {
  yield [
    takeLatest(SETTING_USER_LIST_FETCH, fetchUserList),
    takeLatest(SETTING_USER_SET_PERMISSION, setUserPermission),
  ]
}
