import React, { Component } from 'react';

import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './SignupForm.css';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      full_name: '',
      designation: '',  
      phone_number: '',
      password: '',
    }

    this.updateFormValue = this.updateFormValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.clean();
  }

  submit() {
    const { email, full_name, designation, phone_number, password } = this.state;
    this.props.signup({ email, full_name, designation, phone_number, password });
  }

  updateFormValue(key, value) {
    this.setState({
      [key]: value
    })
  }
  
  signupCompleted() {
    this.props.history.push('/message-display/signup-success')
    this.props.clean();
  }
  
  render() {
    const { email, full_name, designation, phone_number, password } = this.state;
    const { errors, completed, inProgress } = this.props;
    if (completed) this.signupCompleted();
    return (
      <div className="signup-form-container">
        <TextBox
          className="signup-input"
          name="email"
          value={email}
          onChange={this.updateFormValue}
          placeholder="Email"
          withIcon={{ name: 'envelope' }}
          reverseTheme
        />
        <TextBox
          className="signup-input"
          name="full_name"
          value={full_name}
          onChange={this.updateFormValue}
          placeholder="Full name"
          withIcon={{ name: 'user' }}
          reverseTheme
        />
        <TextBox
          className="signup-input"
          name="designation"
          value={designation}
          onChange={this.updateFormValue}
          placeholder="Designation"
          withIcon={{ name: 'suitcase' }}
          reverseTheme
        />
        <TextBox
          type="password"
          className="signup-input"
          name="password"
          value={password}
          onChange={this.updateFormValue}
          placeholder="Password"
          withIcon={{ name: 'lock' }}
          reverseTheme
        />
        <TextBox
          className="signup-input"
          name="phone_number"
          type="phone"
          value={phone_number}
          onChange={this.updateFormValue}
          placeholder="Phone"
          withIcon={{ name: 'phone' }}
          reverseTheme
        />
        {(errors) ? (
          <div style={{ width: '280px', margin: 'auto' }}>
            <ErrorsDisplay errors={errors} />
          </div>
        ) : null}
        <Button 
          className="button"
          onClick={this.submit}>
          SIGN UP
        </Button>
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}