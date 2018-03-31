import React from 'react';
import {  Link } from 'react-router-dom';
import './header.css';
import logoImage from 'app/assets/images/ic_spout360.png';
import SwitchLanguage from "app/components/SwitchLanguage/SwitchLanguage";
import i18n from 'app/languages/index'


export default class HeaderScreen  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="header">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link to="/">
                    <div className="active-logo">
                      <img src={logoImage} className="logo" />
                    </div>
                  </Link>
                </div>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                  <ul id="menu-main-menu" className="nav navbar-nav">
                    <li>
                      <Link to="purchase"> {i18n.header.buyToken} </Link>
                    </li>
                    <li>
                      <Link to="transaction"> {i18n.header.transactions} </Link>
                    </li>
                    <li>
                      <Link to="profile"> {i18n.header.profileSetting}</Link>
                    </li>
                    <li>
                      <Link to="logout"> {i18n.header.logout} </Link>
                    </li>
                    <li>
                      <SwitchLanguage/>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

