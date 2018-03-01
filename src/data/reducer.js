import { combineReducers } from 'redux';

import me from './me/reducer';
import resource from './resource/reducer';

export default combineReducers({
  me,
  resource
})