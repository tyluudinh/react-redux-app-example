import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';

import './EditAccountPopup.css';

export default class ResetPasswordPopup extends Component {
  readyToFetchValues = false
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      designation: '',
      phone: '',
      email: '',
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  show() {
    this.readyToFetchValues = true;
    this.popup.show();
  }

  hide() {
    this.popup.hide();
    this.setInitState();
  }

  setValue(name, value) {
    this.setState({ [name]: value })
  }

  componentDidUpdate() {
    if (this.readyToFetchValues) {
      const { data } = this.props;
      this.setState({
        name: data['name'],
        designation: data['designation'],
        phone: data['phone'],
        email: data['email'],
      })
      this.readyToFetchValues = false;
    }
  }

  render() {
    const { name, designation, phone, email } = this.state;
    return (
      <Popup 
        innerClass="edit-account-pop"
        title="Edit account"
        ref={(ref) => this.popup = ref}>
        <div>
          <label className="flex-default edit-account-pop__label">
            <span>Name of staff</span>
            <TextBox className="inline-field" name="name" value={name} onChange={this.setValue} />
          </label>
          <label className="flex-default edit-account-pop__label">
            <span>Role / Designation</span>
            <TextBox className="inline-field" name="designation" value={designation} onChange={this.setValue} />
          </label>
          <label className="flex-default edit-account-pop__label">
            <span>Phone number</span>
            <TextBox className="inline-field" type="phone" name="phone" value={phone} onChange={this.setValue} />
          </label>
          <label className="flex-default edit-account-pop__label">
            <span>Email</span>
            <TextBox className="inline-field" type="email" name="email" value={email} onChange={this.setValue} />
          </label>
          <div className="center">
            <Button style={{ marginTop: '18px' }} className="edit-account-pop__button" minPadding>CONFIRM</Button>
          </div>
        </div>
      </Popup>
    )
  }
}