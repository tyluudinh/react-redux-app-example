import { put, call, takeLatest } from 'redux-saga/effects';
import {
  MAIN_SEARCH,
  MAIN_SEARCH_START,
  MAIN_SEARCH_SUCCESS,
  MAIN_SEARCH_FAIL,
} from './actionTypes';

import { searchOrder, searchReservation, searchTank } from './api';
import { getErrors } from 'app/services/error';
import { toOrdersClientFormat, toReservationClientFormat, toTankClientFormat } from './transform';

function* search({ keyword, options }) {
  yield put({ type: MAIN_SEARCH_START });
  try {
    const ordersReq = yield call(searchOrder, keyword, options);
    const reservationsReq = yield call(searchReservation, keyword, options);
    const tanksReq = yield call(searchTank, keyword, options);
    if (ordersReq && reservationsReq && tanksReq) {
      const orders = toOrdersClientFormat(ordersReq.data.data);
      const tanks = toTankClientFormat(tanksReq.data.data);
      const reservations = toReservationClientFormat(reservationsReq.data.data);
      yield put({ type: MAIN_SEARCH_SUCCESS, data: { orders, tanks, reservations } })
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: MAIN_SEARCH_FAIL, errors })
  }
}

export default function* mainSearchSaga() {
  yield takeLatest(MAIN_SEARCH, search);
}