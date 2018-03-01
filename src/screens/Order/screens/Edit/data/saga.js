import { call, put, takeLatest } from 'redux-saga/effects';

import validate from './validate';
import { getErrors } from 'app/services/error';
import { toServerFormat, toClientFormat } from './transform';

import {
  ORDER_EDIT_START,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_EDIT_VALIDATE,
  ORDER_EDIT_VALIDATE_START,
  ORDER_EDIT_VALIDATE_FAIL,
  ORDER_EDIT_VALIDATE_PASS,
  ORDER_EDIT_FETCH,
  ORDER_EDIT_FETCH_START,
  ORDER_EDIT_FETCH_SUCCESS,
  ORDER_EDIT_FETCH_FAIL,
} from './actionTypes';

import { editOrderApi, fetchOrderDetailApi } from './api';

function* orderEdit({ data }) {
  yield put({ type: ORDER_EDIT_START });
  console.log('edit', data);
  try {
    const requestData = toServerFormat(data);
    const result = yield call(editOrderApi, requestData.id, requestData)
    if (result) {
      yield put({ type: ORDER_EDIT_SUCCESS })
    }
  } catch(err) {
    console.log('error', err);
    const errors = getErrors(err);
    yield put({ type: ORDER_EDIT_FAIL, errors })
  }
}

function* orderSubmit({ data }) {
  yield put({ type: ORDER_EDIT_VALIDATE_START });
  try {
    const result = yield call(validate, data);
    const fields = result.fields;
    if (result.failed) {
      yield put({ type: ORDER_EDIT_VALIDATE_FAIL, errors: [{ message: 'Please make sure all the fields are correct!' }], fields })
    } else {
      yield put({ type: ORDER_EDIT_VALIDATE_PASS, fields })
      // call directly edit function
      yield orderEdit({ data: fields });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_EDIT_VALIDATE_FAIL, errors })
  }
}

function* orderFetch({ id }) {
  yield put({ type: ORDER_EDIT_FETCH_START });
  try {
    const result = yield call(fetchOrderDetailApi, id);
    console.log(toClientFormat(result.data));
    if (result) {
      const fields = result.data ? toClientFormat(result.data) : {};
      yield put({ type: ORDER_EDIT_FETCH_SUCCESS, fields })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ORDER_EDIT_FETCH_FAIL, errors })
  }
  
}

export default function* orderEditSaga() {
  yield [
    takeLatest(ORDER_EDIT_VALIDATE, orderSubmit),
    takeLatest(ORDER_EDIT_FETCH, orderFetch),
  ]

}