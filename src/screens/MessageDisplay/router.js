import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignupSuccess from './screens/SignupSuccess/SignupSuccess';
import ForgotPasswordSuccess from './screens/ForgotPasswordSuccess/ForgotPasswordSuccess';
import NotFound from 'app/screens/NotFound/NotFound';

import './MessageDisplay.css';

export default ({ match }) => (
  <Switch>
    <Route path={`${match.url}/signup-success`} component={SignupSuccess} />
    <Route path={`${match.url}/forgot-password-success`} component={ForgotPasswordSuccess} />
    <Route path={`${match.url}`} component={NotFound} />
  </Switch>
)
