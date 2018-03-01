import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './screens/Create/Create';
import Edit from './screens/Edit/container';
import Detail from './screens/Detail/container';
import Logs from './screens/Logs/container';
import NotFound from 'app/screens/NotFound/NotFound';

export default ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/create`} component={Create}/>
      <Route path={`${match.url}/edit/:id`} component={Edit}/>
      <Route path={`${match.url}/detail/:id`} component={Detail}/>
      <Route path={`${match.url}/logs/:id`} component={Logs}/>
      <Route component={NotFound}/>
    </Switch>
  )
}