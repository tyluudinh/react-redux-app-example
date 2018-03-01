import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Confirm from './screens/Confirm/container';
import DetailForm from './screens/DetailForm/container';
import Logistic from './screens/Logistic/container';

export default ({ match }) => {
  return (
    <Switch>
      <Route 
        path={`${match.url}/logistic`} 
        render={(props) => (<Logistic basePath={`${match.url}`} {...props}></Logistic>)} />
      <Route 
        path={`${match.url}/confirm`} 
        render={(props) => (<Confirm basePath={`${match.url}`} {...props}></Confirm>)} />
      <Route 
        path='/' 
        render={(props) => (<DetailForm basePath={`${match.url}`} {...props}></DetailForm>)} />
    </Switch>
  )
}