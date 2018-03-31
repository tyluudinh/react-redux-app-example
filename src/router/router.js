import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NProgress from 'nprogress';

import '../../node_modules/nprogress/nprogress.css';

import Profile from 'app/screens/Profile/container';
import Transaction from 'app/screens/Transaction/container';
import Main from 'app/screens/Main/container';
import Logout from 'app/screens/Logout/container';

import LoginScreen from "app/screens/UserEntry/Login/container";
import LogoutScreen from "app/screens/Logout/container";
import SignUpScreen from "app/screens/UserEntry/SignUp/container";
import NotFound from '../screens/NotFound/NotFound';

import HeaderScreen from "../components/Header/index";

import logoImage from 'app/assets/images/ic_spout360.png';
import PurchaseScreen from "app/screens/Purchase/container";
import {
  message
} from 'antd';
import axios from 'axios';
import SwitchLanguage from "app/components/SwitchLanguage/SwitchLanguage";
import Language from 'app/languages/index';


const clearTokenAndGoLogin = (props) => {
  const { history } = props;
  props.clearToken();
  history.push('/login');
};
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.historyLength = props.history.length;
  }
  componentWillMount() {
    const { props } = this;
    axios.interceptors.response.use(props, function(err) {
      if((err.response && err.response.status)) {
        const { error } = err.response.data;
        const { code } = error;
        if (code === 'ERRUnauthorized') {
          message.error(Language.tokenExpired);
          clearTokenAndGoLogin(props);
        }
      }
      return Promise.reject(err);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      NProgress.start();
    }
  }

  historyLength = null;

  componentDidUpdate() {
    NProgress.done();
    const { history } = this.props;
    const { length } = history;
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
          <Route path="/logout" component={Logout}/>
          <Route exact path="/" component={PurchaseScreen}/>
          <Route exact path="/purchase" component={PurchaseScreen}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/transaction" component={Transaction}/>
          <Route component={NotFound}/>
        </Switch>
      )
    }

    function getNonUserRoutes() {
      return (
        <Switch>
          <Route exact path="/" component={LoginScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/sign-up" component={SignUpScreen}/>
          <Route path="/logout" component={LogoutScreen}/>
          {/*<Route path="/forgot-password" component={ForgotPasswordScreen}/>*/}
          <Route component={NotFound}/>
        </Switch>
      )
    }

    return (
      isAuthenticated ?
        <div className="app-id__spout360">
          <HeaderScreen/>
            <Main>
              {getUserRoutes()}
            </Main>
          {/*<FooterScreen/>*/}
        </div>
          :
        <section id="auth">
          <div className="switcher-language">
            <SwitchLanguage/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="auth-wrapper">
                  <div className="branding">
                    <a className="" href="https://spout360.com">
                      <div className="active-logo">
                        <img src={logoImage} className="logo" />
                      </div>
                    </a>
                  </div>
                  <div className="promo-offer">
                    <h3>TOKENS 5% OFF</h3>
                    <h4>Only until 2018-3-15, 24:00 PM (UTC 00)</h4>
                  </div>
                  <div className="content-container">
                    {getNonUserRoutes()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
  }
}