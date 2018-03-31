import { fork } from 'redux-saga/effects';
import meSaga from 'app/data/me/saga';
import signupSaga from 'app/screens/UserEntry/SignUp/data/saga';
import forgotPasswordSaga from 'app/screens/UserEntry/components/ForgotPasswordModal/data/saga';
import resetPasswordSaga from 'app/screens/UserEntry/components/ResetPasswordModal/data/saga';
import MainSaga from '../screens/Main/data/saga';
import ProfileSettingsSaga from 'app/screens/Profile/data/saga';
import PurchaseSaga from 'app/screens/Purchase/data/saga';
import PurchaseFeeSaga from 'app/screens/Purchase/data/Fee/saga';
import PurchaseRateBonusSaga from 'app/screens/Purchase/data/RateBonus/saga';
import TransactionSaga from 'app/screens/Transaction/data/saga';

export default function* rootSaga() {
  yield fork(meSaga);
  yield fork(signupSaga);
  yield fork(forgotPasswordSaga);
  yield fork(resetPasswordSaga);
  yield fork(ProfileSettingsSaga);
  yield fork(PurchaseSaga);
  yield fork(PurchaseFeeSaga);
  yield fork(PurchaseRateBonusSaga);
  yield fork(TransactionSaga);
  yield fork(MainSaga);
}