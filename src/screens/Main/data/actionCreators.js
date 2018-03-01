import {
  MAIN_SEARCH, MAIN_SEARCH_CLEAN
} from './actionTypes';

export const searchAll = (dispatch, keyword, options) => {
  dispatch({
    type: MAIN_SEARCH,
    keyword,
    options
  })
}

export const clean = (dispatch) => {
  dispatch({ type: MAIN_SEARCH_CLEAN });
}