import { call, put, takeLatest } from 'redux-saga/effects';
import { validateDetail, validateLogistic } from './validate';
import { toServerFormat } from './transform';
import { getErrors } from 'app/services/error';

import {
  ORDER_CREATE,
  ORDER_CREATE_START,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_DETAIL_VALIDATE,
  ORDER_CREATE_DETAIL_VALIDATE_START,
  ORDER_CREATE_DETAIL_VALIDATE_FAIL,
  ORDER_CREATE_DETAIL_VALIDATE_PASS,
  ORDER_CREATE_LOGISTIC_VALIDATE,
  ORDER_CREATE_LOGISTIC_VALIDATE_START,
  ORDER_CREATE_LOGISTIC_VALIDATE_PASS,
  ORDER_CREATE_LOGISTIC_VALIDATE_FAIL,
} from './actionTypes';

import { createOrderApi } from './api';

function* orderCreate({ data }) {
  yield put({ type: ORDER_CREATE_START });
  try {
    toServerFormat(data);
    const result = yield call(createOrderApi, toServerFormat(data))
    if (result) {
      const id = result.data ? result.data.id : null;
      yield put({ type: ORDER_CREATE_SUCCESS, data, id })
    }
  } catch(err) {
    console.log(err);
    const errors = getErrors(err);
    yield put({ type: ORDER_CREATE_FAIL, errors })
  }
}

function* orderDetailValidate({ data }) {
  yield put({ type: ORDER_CREATE_DETAIL_VALIDATE_START });
  try {
    const result = yield call(validateDetail, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: ORDER_CREATE_DETAIL_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: ORDER_CREATE_DETAIL_VALIDATE_PASS, fields })
    }
  } catch(err) {
    console.log('errors', err);
    const errors = getErrors(err);
    yield put({ type: ORDER_CREATE_DETAIL_VALIDATE_FAIL, errors })
  }
}

function* orderLogisticValidate({ data }) {
  yield put({ type: ORDER_CREATE_LOGISTIC_VALIDATE_START });
  try {
    const result = yield call(validateLogistic, data);
    const fields = result.fields;
    console.log(data, fields);
    if (result.failed) {
      yield put({ type: ORDER_CREATE_LOGISTIC_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: ORDER_CREATE_LOGISTIC_VALIDATE_PASS, fields })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_CREATE_LOGISTIC_VALIDATE_FAIL, errors })
  }
}

export default function* orderCreateSaga() {
  yield [
    takeLatest(ORDER_CREATE, orderCreate),
    takeLatest(ORDER_CREATE_DETAIL_VALIDATE, orderDetailValidate),
    takeLatest(ORDER_CREATE_LOGISTIC_VALIDATE, orderLogisticValidate)
  ]
}