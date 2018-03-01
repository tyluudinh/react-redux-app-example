import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Confirm from './screens/Confirm/container';
import DetailForm from './screens/CreateForm/container';

export default ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/confirm`} component={Confirm} />
      <Route path='/' render={(props) => (<DetailForm basePath={`${match.url}`} {...props}></DetailForm>)}/>
    </Switch>
  )
}