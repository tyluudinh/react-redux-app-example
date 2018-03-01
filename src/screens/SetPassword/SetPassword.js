import React, { Component } from 'react';

import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';

import './SetPassword.css';

const name = 'Amy';

export default class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: '',
      confirmPass: '',
    }
    this.submit = this.submit.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  
  setValue(name, value) {
    this.setState({ [name]: value });
  }

  submit(e) {
    e.preventDefault();
  }

  render() {
    const { pass, confirmPass } = this.state;
    return (
      <div className="screen-set-password">
        <h1 className="main-title">
          Hi {name}, please confirm your password
        </h1>
        <form onSubmit={this.submit}>
          <label className="flex-default">
            <span>Password</span>
            <TextBox name="pass" className="inline-field" type="password" onChange={this.setValue} value={pass} placeholder="Enter your password"/>
          </label>
          <label className="flex-default">
            <span>Confirm password</span>
            <TextBox name="confirmPass" className="inline-field" type="password" onChange={this.setValue} value={confirmPass} placeholder="Confirm your password" />
          </label>
          <Button style={{ marginTop: '28px' }} minPadding>CONFIRM</Button>
        </form>
      </div>
    )
  }
}