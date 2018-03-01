import React, { Component } from 'react';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import classNames from 'classnames';

import './UserEntry.css';

import Logo from 'app/components/Logo/Logo';
import SignupForm from './components/SignupForm/container';
import SigninForm from './components/SigninForm/container';

@withRouter
export default class UserEntry extends Component {
  render() {
    const { location } = this.props;
    const { pathname } = location;
    return (
      <div className="user-entry">
        <div style={{ backgroundImage: `url(${require('app/assets/images/bg.png')})` }} className="user-entry__overlay"></div>
        <div style={{ background: 'rgba(0, 43, 83, 0.9)' }} className="user-entry__overlay"></div>
        <div className="user-entry-wrapper">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <div className="form-tabs">
            <Link to="/">
              <div className={
                classNames(
                  'form-tabs__item',
                  { 'active': pathname === '/' }
                )
              }>
                SIGN IN
              </div>
            </Link>
            <Link to="/sign-up">
              <div className={
                classNames(
                  'form-tabs__item',
                  { 'active': pathname === '/sign-up'}
                )
              }>
                SIGN UP
              </div>
            </Link>
          </div>
          <Switch>
            <Route path="/sign-up" component={SignupForm} />
            <Route path="/" component={SigninForm} />
          </Switch>
        </div>
      </div>
    )
  }
}