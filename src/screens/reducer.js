import { combineReducers } from 'redux';

import UserEntry_SignupForm from './UserEntry/components/SignupForm/data/reducer';
import UserEntry_ForgotPasswordPopup from './UserEntry/components/ForgotPasswordPopup/data/reducer';

import Tank_Create from './Tank/screens/Create/data/reducer';
import Tank_Detail from './Tank/screens/Detail/data/reducer';
import Tank_Edit from './Tank/screens/Edit/data/reducer';
import Tank_Logs from './Tank/screens/Logs/data/reducer';

import Reservation_Create from './Reservation/screens/Create/data/reducer';
import Reservation_Detail from './Reservation/screens/Detail/data/reducer';
import Reservation_Edit from './Reservation/screens/Edit/data/reducer';

import Order_Create from './Order/screens/Create/data/reducer';
import Order_Detail from './Order/screens/Detail/data/reducer';
import Order_Edit from './Order/screens/Edit/data/reducer';

import Settings from './Settings/data/reducer';
import Setting_CreateAdminUser from './Settings/screens/CreateAdminUser/data/reducer';

import Verify_ActivateAccount from './Verify/screens/ActivateAccount/data/reducer';
import Verify_ResetPassword from './Verify/screens/ResetPassword/data/reducer';

import Main from './Main/data/reducer';

export default combineReducers({
  UserEntry_SignupForm,
  UserEntry_ForgotPasswordPopup,
  
  Tank_Create,
  Tank_Detail,
  Tank_Edit,
  Tank_Logs,

  Reservation_Create,
  Reservation_Detail,
  Reservation_Edit,

  Order_Create,
  Order_Detail,
  Order_Edit,

  Settings,

  Setting_CreateAdminUser,

  Verify_ActivateAccount,
  Verify_ResetPassword,
  
  Main,
})