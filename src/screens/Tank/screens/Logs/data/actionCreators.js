import { TANK_LOGS_FETCH } from './actionTypes';

export const fetchLogs = (dispatch, id) => {
  dispatch({ type: TANK_LOGS_FETCH, id })
};