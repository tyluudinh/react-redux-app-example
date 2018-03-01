import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Burger from 'react-icons/lib/md/menu';
import Cog from 'react-icons/lib/fa/cog';

import Logo from 'app/components/Logo/Logo';
import MainNav from './components/MainNav/MainNav';
import TooltipNav from './components/TooltipNav/TooltipNav';

import './UserHeader.css';

const SettingNavList = {
  primaryList: [
    {
      title: 'Create account',
      subNav: 1,
    },
    {
      title: 'Permission management',
      to: '/settings/permission/management'
    },
    {
      title: 'Manage account',
      to: '/settings/account/management',
    },
  ],
  subs: [
    {
      id: 1,
      items: [
        {
          title: 'Create admin user',
          to: '/settings/admin-user/create',
        },
        {
          title: 'Create maintainance user',
          to: '/',
          disable: true,
        },
        {
          title: 'Create driver user',
          to: '/',
          disable: true,
        },
      ],
    },
  ],
};

export default class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingNavOpen: false
    }
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
    this.toggleSettingNav = this.toggleSettingNav.bind(this);
  }

  toggleMainMenu() {
    this.mainMenu.toggle();
  }

  toggleSettingNav() {
    this.setState({ settingNavOpen: !this.state.settingNavOpen })
  }

  render() {
    return (
      <header className="user-header">
        <MainNav ref={(ref) => {this.mainMenu = ref}}></MainNav>
        <div className="user-header__logo-with-nav">

          <Burger className="user-header__burger" onClick={this.toggleMainMenu} size={25}/>
          <Link to="/"><div className="header-logo"><Logo /></div></Link>
        </div>
        <div className="user-header__setting">
          <TooltipNav data={SettingNavList} toggleNav={this.toggleSettingNav} open={this.state.settingNavOpen}>
            <Cog className="user-header__setting-gear" size={30} onClick={this.toggleSettingNav} />
          </TooltipNav>
         </div>
      </header>
    )
  }
}