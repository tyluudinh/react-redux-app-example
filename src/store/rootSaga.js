import { fork } from 'redux-saga/effects';
import meSaga from 'app/data/me/saga';
import resourceSaga from 'app/data/resource/saga';
import signupSaga from 'app/screens/UserEntry/components/SignupForm/data/saga';
import forgotPasswordSaga from 'app/screens/UserEntry/components/ForgotPasswordPopup/data/saga';

import tankCreateSaga from '../screens/Tank/screens/Create/data/saga';
import tankDetailSaga from '../screens/Tank/screens/Detail/data/saga';
import tankEditSaga from '../screens/Tank/screens/Edit/data/saga';
import tankLogSaga from '../screens/Tank/screens/Logs/data/saga';

import reservationCreateSaga from '../screens/Reservation/screens/Create/data/saga';
import reservationEditSaga from '../screens/Reservation/screens/Edit/data/saga';
import reservationDetailSaga from '../screens/Reservation/screens/Detail/data/saga';

import orderCreateSaga from '../screens/Order/screens/Create/data/saga';
import orderDetailSaga from '../screens/Order/screens/Detail/data/saga';
import orderEditSaga from '../screens/Order/screens/Edit/data/saga';

import MainSaga from '../screens/Main/data/saga';

import TankInfoInputSaga from 'app/components/TankInfoInput/data/saga';
import ReservationInputSaga from 'app/components/ReservationInput/data/saga';

import SettingCreateAdminUser from 'app/screens/Settings/screens/CreateAdminUser/data/saga';
import SettingsSaga from 'app/screens/Settings/data/saga';

import VerifyActivateAccount from 'app/screens/Verify/screens/ActivateAccount/data/saga';
import VerifyResetPassword from 'app/screens/Verify/screens/ResetPassword/data/saga';

export default function* rootSaga() {
  yield fork(meSaga);
  yield fork(resourceSaga);
  yield fork(signupSaga);
  yield fork(forgotPasswordSaga);

  yield fork(tankCreateSaga);
  yield fork(tankDetailSaga);
  yield fork(tankEditSaga);
  yield fork(tankLogSaga);
  
  yield fork(reservationCreateSaga);
  yield fork(reservationDetailSaga);
  yield fork(reservationEditSaga);
  
  yield fork(orderCreateSaga);
  yield fork(orderDetailSaga);
  yield fork(orderEditSaga);

  yield fork(TankInfoInputSaga);
  yield fork(ReservationInputSaga);

  yield fork(SettingCreateAdminUser);
  yield fork(SettingsSaga);

  yield fork(VerifyActivateAccount);
  yield fork(VerifyResetPassword);

  yield fork(MainSaga);
}