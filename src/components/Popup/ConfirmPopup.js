import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import Button from 'app/components/Button/Button';

import './ConfirmPopup.css';

export default class ForgotPasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  
  show() {
    this.popup.show();
  }

  hide() {
    this.popup.hide();
  }

  render() {
    const { title, confirm, confirmText, cancelText, message, negative } = this.props;
    return (
      <Popup 
        style={{ padding: '20px' }}
        innerClass="confirm-popup"
        title={ title }
        ref={(ref) => this.popup = ref}>
        <div>
          <p>{ message }</p>
          <div className="btns-wrapper">
            <Button className="delete-account-pop__button" type={negative ? 'red-reverse' : 'green'} onClick={confirm} minPadding>{ confirmText || 'Confirm' }</Button>
            <Button className="delete-account-pop__button" type="green-reverse" onClick={this.hide} minPadding>{ cancelText || 'Cancel' }</Button>
          </div>
        </div>
      </Popup>
    )
  }
}