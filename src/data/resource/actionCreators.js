import {
  RESOURCE_FETCH,
  RESOURCE_ADD,
} from './actionTypes';

export const fetchResource = (dispatch, key) => dispatch({ type: RESOURCE_FETCH, key })
export const addResource = (dispatch, { key, value }) => dispatch({ type: RESOURCE_ADD, key, value })