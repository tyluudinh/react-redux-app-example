import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Spin,
  Alert,
  Button,
  Row,
  Col,
  Radio,
  DatePicker,
  message
} from 'antd';
import './signUp.css'
import moment from 'moment';
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';


export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonsClick: false,
      gender: true,
      dateOfBirth: moment('1990-01-01'),
    };
    this.signUp = this.signUp.bind(this);
  }
  componentDidMount(){
    this.props.clean();
  }
  componentWillReceiveProps(nextProps) {
    const { completed } = nextProps;
    if (completed) {
      message.success('Registered success!');
    }
  }
  signUp(){
    this.props.clean();
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      nric
    } = this.refs;
  
    const { gender, dateOfBirth } = this.state;
    let data = {
      username: username.value,
      password: password.value,
      email: email.value,
      nric: nric.value,
      first_name: firstName.value,
      last_name: lastName.value,
      gender: `${gender}`,
      birthday: `${moment(dateOfBirth).format('YYYY-MM-DDTHH:mm:ss')}Z`
    };
    this.props.signUp(data, this.props.history);
  }
  
  render(){
    const { inProgress, errors } = this.props;
    const { gender, dateOfBirth } = this.state;
    return(
      <Spin spinning={inProgress} size="large">
        <div className="body-login">
          <div className="agile-login sign-up-body">
            <div className="wrapper">
              <h2>Sign Up</h2>
              <div className="w3ls-form">
                <div>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="username">Username</label>
                    </Col>
                    <Col span={18}>
                      <input
                        className="input"
                        ref="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                      />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="password">Password</label>
                    </Col>
                    <Col span={18}>
                      <input className="input-login" ref={'password'} id={'password'} type="password" name="password" placeholder="Password" required />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="firstName">First name</label>
                    </Col>
                    <Col span={18}>
                      <input className="input-login" ref={'firstName'} id="firstName" autoFocus={true} type="text" name="name" placeholder="First Name" required/>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="lastName">Last name</label>
                    </Col>
                    <Col span={18}>
                      <input className="input-login" ref={'lastName'} id={'lastName'} name="lastName" placeholder="Last name" required />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="email">Email</label>
                    </Col>
                    <Col span={18}>
                      <input className="input-login" ref={'email'} id={'email'} name="email" placeholder="Email" required />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="gender">Gender</label>
                    </Col>
                    <Col span={18}>
                      <RadioGroup value={gender} onChange={(e) => {this.setState({gender: e.target.value})}}>
                        <Radio value={true}>Female</Radio>
                        <Radio value={false}>Male</Radio>
                      </RadioGroup>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="gender">Date of birth</label>
                    </Col>
                    <Col span={18}>
                      <DatePicker value={dateOfBirth} format={dateFormat} onChange={(date) => {this.setState({dateOfBirth: date})}} />
                    </Col>
                  </Row>
                  <Row style={{marginTop: 20}}>
                    <Col span={6}>
                      <label htmlFor="nric">Nric</label>
                    </Col>
                    <Col span={18}>
                      <input className="input-login" ref={'nric'} id={'nric'} name="nric" placeholder="Nric" required />
                    </Col>
                  </Row>
                  {errors &&
                  <Alert
                    className="alert-error-login"
                    message="Error"
                    description={`${errors}`}
                    type="error"
                    showIcon
                  />
                  }
                  <Button className={'btn-login'} type={'primary'} onClick={this.signUp}>
                    Sign up
                  </Button>
                  
                  <div className="text-center register-now">Already have an account? <Link to="login">Sign in!</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}
