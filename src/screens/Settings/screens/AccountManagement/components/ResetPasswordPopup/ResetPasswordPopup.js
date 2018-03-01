import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';

import './ResetPasswordPopup.css';

export default class ResetPasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: '',
      newPass: '',
      confirmNewPass: '',
    }
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  show() {
    this.popup.show();
  }
  hide() {
    this.popup.hide();
    this.setState({
      currentPass: '',
      newPass: '',
      confirmNewPass: '',
    })
  }
  setValue(name, value) {
    this.setState({ [name]: value })
  }
  render() {
    const { currentPass, newPass, confirmNewPass } = this.state;
    return (
      <Popup 
        innerClass="reset-password-pop"
        title="Password reset"
        ref={(ref) => this.popup = ref}>
        <div>
          <label className="flex-default reset-password-pop__label">
            <span>Current password</span>
            <TextBox className="inline-field" type="password" name="currentPass" value={currentPass} onChange={this.setValue} />
          </label>
          <label className="flex-default reset-password-pop__label">
            <span>New password</span>
            <TextBox className="inline-field" type="password" name="newPass" value={newPass} onChange={this.setValue} />
          </label>
          <label className="flex-default reset-password-pop__label">
            <span>Confirm new password</span>
            <TextBox className="inline-field" type="password" name="confirmNewPass" value={confirmNewPass} onChange={this.setValue} />
          </label>
          <div className="btns-wrapper">
            <Button className="reset-password-pop__button" type="green-reverse" onClick={this.hide} minPadding>CANCEL</Button>
            <Button className="reset-password-pop__button" minPadding>CONFIRM</Button>
          </div>
        </div>
      </Popup>
    )
  }
}