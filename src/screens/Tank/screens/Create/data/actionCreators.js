import {
  TANK_CREATE_VALIDATE, TANK_CREATE_CLEAN, TANK_CREATE, TANK_CREATE_RESET
} from './actionTypes';

export const validateTankInfo = (dispatch, data) => {
  dispatch({
    type: TANK_CREATE_VALIDATE,
    data
  })
}

export const cleanTankInfoCreateForm = (dispatch) => {
  dispatch({ type: TANK_CREATE_CLEAN })
}

export const resetTankInfoCreateForm = (dispatch) => {
  dispatch({ type: TANK_CREATE_RESET })
}

export const submitTankCreate = (dispatch, data) => {
  dispatch({ type: TANK_CREATE, data })
}