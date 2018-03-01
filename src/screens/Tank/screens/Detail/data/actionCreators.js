import {
  TANK_DETAIL_FETCH,
  TANK_DETAIL_CLEAN,
  TANK_DETAIL_DEREGISTER
} from './actionTypes';

export const fetchDetail = (dispatch, id) => {
  dispatch({ type: TANK_DETAIL_FETCH, id })
}

export const deregister = (dispatch, id) => {
  dispatch({ type: TANK_DETAIL_DEREGISTER, id })
}

export const cleanDetail = (dispatch) => {
  dispatch({ type: TANK_DETAIL_CLEAN })
}
