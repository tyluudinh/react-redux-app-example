import { put, call, takeLatest } from 'redux-saga/effects';
import {
  RESERVATION_CREATE,
  RESERVATION_CREATE_VALIDATE,
  RESERVATION_CREATE_VALIDATE_START,
  RESERVATION_CREATE_VALIDATE_SUCCESS,
  RESERVATION_CREATE_VALIDATE_FAIL,
  RESERVATION_CREATE_START,
  RESERVATION_CREATE_SUCCESS,
  RESERVATION_CREATE_FAIL,
} from './actionTypes';

import { getErrors } from 'app/services/error';
import { createReservationApi } from './api';
import { toServerFormat } from './transform';
import validate from './validate';

function* createReservation({ data }) {
  yield put({ type: RESERVATION_CREATE_START });
  try {
    const result = yield call(createReservationApi, toServerFormat(data))
    if (result) {
      const id = result.data ? result.data.id : null;
      yield put({ type: RESERVATION_CREATE_SUCCESS, fields: data, id })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_CREATE_FAIL, errors })
  }
}

function* validateReservation({ data }) {
  yield put({ type: RESERVATION_CREATE_VALIDATE_START });
  try {
    const result = yield call(validate, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: RESERVATION_CREATE_VALIDATE_FAIL, fields, errors: [{ message: 'Please make sure all the fields are correct!' }] });
    } else {
      yield put({ type: RESERVATION_CREATE_VALIDATE_SUCCESS, fields })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: RESERVATION_CREATE_VALIDATE_FAIL, errors })
  }
}

export default function* reservationCreateSaga() {
  yield [
    takeLatest(RESERVATION_CREATE_VALIDATE, validateReservation),
    takeLatest(RESERVATION_CREATE, createReservation)
  ]
}