import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import Button from 'app/components/Button/Button';

import './DeleteAccountPopup.css';

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
    return (
      <Popup 
        style={{ padding: '20px' }}
        innerClass="delete-account-pop"
        title="Delete account"
        ref={(ref) => this.popup = ref}>
        <div>
          <p>Do note that you will not be able to recover an account with its history once it is deleted. Do you want to proceed?</p>
          <div className="btns-wrapper">
            <Button className="delete-account-pop__button" type="green-reverse" onClick={this.submit} minPadding>YES, DELETE IT</Button>
            <Button className="delete-account-pop__button" onClick={this.hide} minPadding>NO, I WILL KEEP IT</Button>
          </div>
        </div>
      </Popup>
    )
  }
}