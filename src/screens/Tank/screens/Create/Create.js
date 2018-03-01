import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateForm from './screens/CreateForm/container';
import Confirm from './screens/Confirm/container';

export default ({ match }) => {
  const basePath = match.url;
  return (
    <Switch>
      <Route path={`${basePath}/confirm`} component={Confirm}/>
      <Route path={`${basePath}/`} render={(props) => (<CreateForm {...props} basePath={basePath}/>)} />
    </Switch>
  )
}