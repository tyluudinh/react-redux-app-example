import { combineReducers } from 'redux';

import TankInfoInput from './TankInfoInput/data/reducer';
import ReservationInput from './ReservationInput/data/reducer';

export default combineReducers({
  TankInfoInput,
  ReservationInput
})