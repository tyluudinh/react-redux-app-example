import { combineReducers } from 'redux';

import data from 'app/data/reducer';
import screens from 'app/screens/reducer';
import components from 'app/components/reducer';

export default combineReducers({
  data,
  screens,
  components,
});