import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './ResetPassword.css';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    }

    this.setValue = this.setValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.clean();
  }

  setValue(name, value) {
    this.setState({ [name]: value })
  }

  submit() {
    const { match, reset } = this.props;
    const { password, confirmPassword } = this.state;
    reset(match.params.token, password, confirmPassword);
  }
  render() {
    const { inProgress, errors, done } = this.props;
    const { confirmPassword, password } = this.state;

    return (
      <div className="verify-reset-password">
        <h1 className="main-title">Reset Password</h1>
        { done ? (
          <div className="center">
            <h3>Password reset succesffully!</h3>
            <Link to="/">
              <Button>Back to home</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={this.submit}>
            <label className="flex-default">
              <span>Password</span>
              <TextBox
                type="password"
                name="password"
                onChange={this.setValue}
                value={password}
                placeholder="Password"/>
            </label>
            <label className="flex-default">
              <span>Confirm password</span>
              <TextBox
                name="confirmPassword"
                type="password"
                onChange={this.setValue}
                value={confirmPassword}
                placeholder="Confirm password"/>
            </label>
            <ErrorsDisplay errors={errors} center/>
            <div className="center" style={{ marginTop: '20px' }}>
              <Button onClick={this.submit} minPadding>SUBMIT</Button>
            </div>
          </form>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>      
    )
  }
}