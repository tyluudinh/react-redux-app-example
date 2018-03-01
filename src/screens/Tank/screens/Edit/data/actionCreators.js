import {
  TANK_EDIT_VALIDATE, TANK_EDIT, TANK_EDIT_FETCH, TANK_EDIT_CLEAN
} from './actionTypes';

export const validateTankInfo = (dispatch, data) => {
  dispatch({
    type: TANK_EDIT_VALIDATE,
    data
  })
}

export const submitTankEdit = (dispatch, data) => {
  dispatch({ type: TANK_EDIT, data })
}

export const cleanTankEdit = (dispatch) => {
  dispatch({ type: TANK_EDIT_CLEAN })
}

export const fetchTankEdit = (dispatch, id) => {
  dispatch({ type: TANK_EDIT_FETCH, id })
}