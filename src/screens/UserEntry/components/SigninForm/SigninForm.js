import React, { Component } from 'react';

import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ForgotPasswordPopup from '../ForgotPasswordPopup/container';

import './SigninForm.css';

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',  
    }

    this.updateFormValue = this.updateFormValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.reset();
  }

  submit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password)
  }

  updateFormValue(key, value) {
    this.setState({
      [key]: value
    })
  }
  
  
  render() {
    console.log(process.env.NODE_ENV)
    const { errors, history, inProgress } = this.props;
    return (
      <div className="signin-form-container">
        <form onSubmit={this.submit}>
          <TextBox
            className="signin-input"
            name="email"
            value={this.state.email}
            onChange={this.updateFormValue}
            placeholder="Email"
            withIcon={{ name: 'envelope' }}
            reverseTheme
          />
          <TextBox
            className="signin-input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.updateFormValue}
            placeholder="Password"
            withIcon={{ name: 'lock' }}
            reverseTheme
          />
          <a className="forgot-password" onClick={() => {console.log(this.forgotPasswordPopup.wrappedInstance);this.forgotPasswordPopup.wrappedInstance.show()}}>Forgot password?</a>
          {(errors) ? (
            <div style={{ width: '280px', margin: 'auto' }}>
              <ErrorsDisplay errors={errors} />
            </div>
          ) : null}
          <Button 
            className="button"
            onClick={this.submit}>
            SIGN IN
          </Button>
        </form>
        <ForgotPasswordPopup 
          history={history}
          ref={(ref) => this.forgotPasswordPopup = ref}/>
        <LoadingIndicator onDuty={inProgress}/>
      </div>
    )
  }
}