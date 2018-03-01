import React, { Component } from 'react';

import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import ConfirmPopup from './components/ConfirmPopup/ConfirmPopup';

import { getFieldError } from 'app/services/error';

import './CreateAdminUser.css';

export default class DetailForm extends Component {
  validated = false
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      roleDesignation: '',
      phone: '',
      email: '',
      message: '',
      password: '',
    };

    this.submit = this.submit.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    this.props.clean();
  }

  setFieldValue(name, value) {
    this.setState({ [name]: value });
  }
  
  submit(e) {
    e.preventDefault();
    this.validated = true;
    this.props.validate(this.state);
  }

  confirm(e) {
    e && e.preventDefault();
    this.props.submit(this.state);
  }

  componentDidUpdate() {
    const { passed, history, submitted } = this.props;
    if (this.validated && passed) {
      this.confirmPopup.show();
      this.validated = false
    }
    if (submitted) history.push('/settings/account/management');
  }

  render() {
    const { staffName, roleDesignation, message, email, phone, password } = this.state;

    const {
      errors,
      inProgress,
      fields,
    } = this.props;

    return (
      <div className="create-admin-user container">
        <h1 className="main-title">Create admin user</h1>
        <form className="create-admin-user__form" onSubmit={this.submit}>
          <label className="flex-default">
            <span>Name of staff:</span>
            <div className="inline-field">
              <TextBox name="staffName" value={staffName} onChange={this.setFieldValue} placeholder="Name of staff" />
              {getFieldError(fields, 'staffName')}
            </div>
          </label>
          <label className="flex-default">
            <span>Role/ Designation:</span>
            <div className="inline-field">
              <TextBox name="roleDesignation" value={roleDesignation} onChange={this.setFieldValue} placeholder="Role / Designation" />
              {getFieldError(fields, 'roleDesignation')}
            </div>
          </label>
          <label className="flex-default">
            <span>Phone number:</span>
            <div className="inline-field">
              <TextBox name="phone" type="phone" value={phone} onChange={this.setFieldValue} placeholder="Phone number" />
              {getFieldError(fields, 'phone')}
            </div>
          </label>
          <label className="flex-default">
            <span>Email:</span>
            <div className="inline-field">
              <TextBox name="email" value={email} onChange={this.setFieldValue} placeholder="Email address" />
              {getFieldError(fields, 'email')}
            </div>
          </label>
          <label className="flex-default">
            <span>Password:</span>
            <div className="inline-field">
              <TextBox type="password" name="password" value={password} onChange={this.setFieldValue} placeholder="Password" />
              {getFieldError(fields, 'password')}
            </div>
          </label>
          <label className="flex-default">
            <span>Message:</span>
            <div className="inline-field">
              <TextBox name="message" value={message} onChange={this.setFieldValue} multiline placeholder="Message" />
              {getFieldError(fields, 'message')}
            </div>
          </label>
          <ErrorsDisplay errors={errors} center/>
          <div className="center">
            <Button style={{ marginTop: '20px' }} minPadding onClick={this.submit}>Confirm</Button>
          </div>
        </form>
        <ConfirmPopup userInfo={{ staffName, roleDesignation, message, email, phone }} ref={(ref) => this.confirmPopup = ref} confirm={this.confirm}/>
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}