import React, { Component }  from 'react';

import {
  Spin,
} from 'antd';
import './Logout.css';
export default class Logout extends Component {
  componentDidMount() {
    this.props.logout(this.props.history);
  }
  render() {
    const {
      inProgress,
      errors,
    } = this.props;
    return (
      <div className="logging-out">
        { errors ? (
          <div className="child-center">
            <h2>There's error! Please refresh the page to try again!</h2>
          </div>
        ) : null }
        <div className="logging-out---indicator">
          <Spin tip="Logging out" spinning={inProgress}/>
        </div>
      </div>
    )
  }
} 
