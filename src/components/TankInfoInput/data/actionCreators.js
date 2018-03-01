import {
  TANK_INPUT_SEARCH,
  TANK_INPUT_FETCH,
  TANK_INPUT_CLEAN
} from './actionTypes';

export const searchTank = (dispatch, query) => {
  dispatch({ type: TANK_INPUT_SEARCH, query });
}

export const fetchTank = (dispatch, id) => {
  dispatch({ type: TANK_INPUT_FETCH, id });
}

export const cleanResult = (dispatch) => {
  dispatch({ type: TANK_INPUT_CLEAN });
}