import { call, put, takeLatest } from 'redux-saga/effects';

import validate from './validate';
import { getErrors } from 'app/services/error';
import { toServerFormat, toClientFormat } from './transform';

import {
  RESERVATION_EDIT_START,
  RESERVATION_EDIT_SUCCESS,
  RESERVATION_EDIT_FAIL,
  RESERVATION_EDIT_VALIDATE,
  RESERVATION_EDIT_VALIDATE_START,
  RESERVATION_EDIT_VALIDATE_FAIL,
  RESERVATION_EDIT_VALIDATE_PASS,
  RESERVATION_EDIT_FETCH,
  RESERVATION_EDIT_FETCH_START,
  RESERVATION_EDIT_FETCH_SUCCESS,
  RESERVATION_EDIT_FETCH_FAIL,
} from './actionTypes';

import { editReservationApi, fetchReservationDetailApi } from './api';

function* reservationEdit({ data }) {
  yield put({ type: RESERVATION_EDIT_START });
  try {
    const requestData = toServerFormat(data);
    const result = yield call(editReservationApi, requestData.id, requestData)
    if (result) {
      yield put({ type: RESERVATION_EDIT_SUCCESS })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_EDIT_FAIL, errors })
  }
}

function* reservationValidate({ data }) {
  yield put({ type: RESERVATION_EDIT_VALIDATE_START });
  try {
    const result = yield call(validate, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: RESERVATION_EDIT_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: RESERVATION_EDIT_VALIDATE_PASS, fields })
      // call directly edit function
      yield reservationEdit({ data: fields });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_EDIT_VALIDATE_FAIL, errors })
  }
}

function* reservationFetch({ id }) {
  yield put({ type: RESERVATION_EDIT_FETCH_START });
  try {
    const result = yield call(fetchReservationDetailApi, id);
    if (result) {
      const fields = result.data ? toClientFormat(result.data) : {};
      yield put({ type: RESERVATION_EDIT_FETCH_SUCCESS, fields })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_EDIT_FETCH_FAIL, errors })
  }
  
}

export default function* reservationEditSaga() {
  yield [
    takeLatest(RESERVATION_EDIT_VALIDATE, reservationValidate),
    takeLatest(RESERVATION_EDIT_FETCH, reservationFetch),
  ]

}