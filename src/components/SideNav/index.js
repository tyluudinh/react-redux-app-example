import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Icon,
  Avatar
} from 'antd';

import './SideNav.css'
export default class SideNav extends Component {
  render(){
    const { info } = this.props;
    return(
      <div>
        {info ?
          <div className="avatar__side-nav child-center display-grid">
            <Avatar size="large" src={`${info.avatar}`}/>
            <span className="display-name__side-nav text-center">{`${info.first_name} ${info.last_name}`}</span>
          </div>
          :null
        }
        <ul className="list__side-nav">
          <li className="active"> <Link to="/profile/setting"><Icon type="user" /> Account settings</Link></li>
          <li> <Link to="/user/change-password"><Icon type="lock" /> Change password</Link> </li>
          <li> <Link to="/logout"><Icon type="logout" /> Logout</Link></li>
        </ul>
      </div>
    )
  }
}