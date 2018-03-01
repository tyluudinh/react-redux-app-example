import React, { Component } from 'react';

import Popup from 'app/components/Popup/Popup';
import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';

import './ForgotPasswordPopup.css';

export default class ForgotPasswordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.setEmail = this.setEmail.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.clean();
  }

  show() {
    this.popup.show();
  }

  setEmail(key, value) {
    this.setState({
      email: value
    })
  }

  submit(e) {
    e.preventDefault();
    this.props.submitEmail(this.state.email);
  }

  forgotPassCompleted() {
    this.props.history.push('/message-display/forgot-password-success')
    this.props.clean();
  }

  render() {
    const { completed, errors, inProgress } = this.props;
    if (completed) this.forgotPassCompleted();
    return (
      <Popup 
        innerClass="forgot-password-pop"
        title="Forgot password"
        ref={(ref) => this.popup = ref}>
        <form onSubmit={this.submit}>
          <p>Please enter your email address and we’ll send you recovery details</p>
          <label className="forgot-password-pop__label flex-default">
            <span className="item-center">Email</span>
            <TextBox name="email" value={this.state.email} onChange={this.setEmail} />
          </label>
          {(errors) ? (
            <ErrorsDisplay errors={errors} />
          ) : null}
          <Button className="forgot-password-pop__button" onClick={this.submit}>SUBMIT</Button>
          <LoadingIndicator onDuty={inProgress} />
        </form>
      </Popup>
    )
  }
}