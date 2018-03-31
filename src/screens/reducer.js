import { combineReducers } from 'redux';

import UserEntry_Signup from './UserEntry/SignUp/data/reducer';
import UserEntry_ForgotPasswordModal from './UserEntry/components/ForgotPasswordModal/data/reducer';
import UserEntry_ResetPasswordModal from './UserEntry/components/ResetPasswordModal/data/reducer';


import Profile_Setting from './Profile/data/reducer';

import Main from './Main/data/reducer';
import Purchase from './Purchase/data/reducer';
import Purchase_Fee from './Purchase/data/Fee/reducer';
import Purchase_RatesBonus from './Purchase/data/RateBonus/reducer';
import Transaction from './Transaction/data/reducer';

export default combineReducers({
  UserEntry_Signup,
  UserEntry_ForgotPasswordModal,
  UserEntry_ResetPasswordModal,
  Profile_Setting,
  Main,
  Purchase,
  Purchase_Fee,
  Purchase_RatesBonus,
  Transaction,
})