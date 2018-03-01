import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import Button from 'app/components/Button/Button';

import './ConfirmPopup.css';

export default class ForgotPasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this); 
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  show() {
    this.popup.show();
  }

  hide() {
    this.popup.hide();
  }

  confirm(e) {
    e.preventDefault();
    this.props.confirm(e);
    this.popup.hide();
  }

  render() {
    const { userInfo } = this.props;
    return (
      <Popup 
        innerClass="create-admin-user__confirm-pop"
        title="Create admin user"
        ref={(ref) => this.popup = ref}>
        <div>
          <label className="flex-default">
            <span>Name of Staff</span>
            <div className="inline-field">{ userInfo.staffName }</div>
          </label>
          <label className="flex-default">
            <span>Role/ Designation</span>
            <div className="inline-field">{ userInfo.roleDesignation }</div>
          </label>
          <label className="flex-default">
            <span>Phone number</span>
            <div className="inline-field">{ userInfo.phone }</div>
          </label>
          <label className="flex-default">
            <span>Email</span>
            <div className="inline-field">{ userInfo.email }</div>
          </label>
          <label className="flex-default">
            <span>Message</span>
            <div className="inline-field">{ userInfo.message }</div>
          </label>
          <div className="confirm-pop__btns-wrapper">
            <Button className="confirm-pop__btn" minPadding type="green-reverse" onClick={this.hide}>EDIT</Button>
            <Button className="confirm-pop__btn" onClick={this.confirm}>CONFIRM</Button>
          </div>
        </div>
      </Popup>
    )
  }
}