import { combineReducers } from 'redux';

import data from 'app/data/reducer';
import screens from 'app/screens/reducer';
import components from 'app/components/reducer';
import { ME_LOGOUT  } from 'app/data/me/actionTypes';

const appReducer = combineReducers({
  data,
  screens,
  components,
});

const rootReducer = (state, action) => {
  if (action.type === ME_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action)
};
export default rootReducer;