import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AccountManagement from './screens/AccountManagement/container';
import PermissionManagement from './screens/PermissionManagement/container';
import CreateAdminUser from './screens/CreateAdminUser/container';
import NotFound from 'app/screens/NotFound/NotFound';

export default ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/account/management`} component={AccountManagement}/>
      <Route path={`${match.url}/permission/management`} component={PermissionManagement}/>
      <Route path={`${match.url}/admin-user/create`} component={CreateAdminUser}/>
      <Route component={NotFound}/>
    </Switch>
  )
}