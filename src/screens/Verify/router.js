import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ActivateAccount from './screens/ActivateAccount/container';
import ResetPassword from './screens/ResetPassword/container';
import NotFound from 'app/screens/NotFound/NotFound';

export default ({ match }) => {
  return (
    <Switch>
      <Route path={`/verify/activate-account/:token`} component={ActivateAccount}/>
      <Route path={`/verify/reset-password/:token`} component={ResetPassword}/>
      <Route component={NotFound}/>
    </Switch>
  )
}