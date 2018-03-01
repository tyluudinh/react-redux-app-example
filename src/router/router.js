import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from 'nprogress';
import classNames from 'classnames';

import '../../node_modules/nprogress/nprogress.css';

import Tank from 'app/screens/Tank/router';
import Order from 'app/screens/Order/router';
import Reservation from 'app/screens/Reservation/router';
import Settings from 'app/screens/Settings/router';
import Main from 'app/screens/Main/container';
import Logout from 'app/screens/Logout/container';
import UserEntry from 'app/screens/UserEntry/UserEntry';
import UserHeader from 'app/components/UserHeader/UserHeader';
import SetPassword from '../screens/SetPassword/SetPassword';
import NotFound from '../screens/NotFound/NotFound';

import Verify from '../screens/Verify/router';

import MessageDisplay from '../screens/MessageDisplay/router';
import Purge from '../screens/Purge/Purge';


// A Screen is being used to test component
// For development purpose
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  var TestComponent = require('app/screens/TestComponent/TestComponent').default;
}

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.historyLength = props.history.length;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      NProgress.start();
    }
  }

  historyLength = null

  componentDidUpdate() {
    NProgress.done();
    const { length } = this.props.history;
    if (length > this.historyLength) {
      window.scrollTo(0,0);
      this.historyLength = length;
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    function getUserRoutes() {
      return (
        <Switch>
          <Route path="/tank" component={Tank}/>
          <Route path="/order" component={Order}/>
          <Route path="/reservation" component={Reservation}/>
          <Route path="/settings" component={Settings}/>
          (!isProd) ? (<Route path="/components" component={TestComponent} />) : ''
          <Route path="/logout" component={Logout}/>
          <Route path="/message-display" component={MessageDisplay} />
          <Route path="/verify" component={Verify}/>
          <Route path="/clear" component={Purge}/>
          <Route exact path="/" component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      )
    }

    function getNonUserRoutes() {
      return (
        <Switch>
          <Route path="/set-password" component={SetPassword}/>
          <Route path="/message-display" component={MessageDisplay} />
          <Route path="/verify" component={Verify}/>
          <Route path="/clear" component={Purge}/>
          <Route path="/" component={UserEntry}/>
        </Switch>
      )
    }

    return (
      <div className={classNames(
        'app',
        { 'app--with-header': isAuthenticated }
      )}>
        {(isAuthenticated) ? (<UserHeader></UserHeader>) : null}
        <div className="app__main-container">
          {(isAuthenticated) ? getUserRoutes() : getNonUserRoutes()}
        </div>
      </div>

    )
  }
}