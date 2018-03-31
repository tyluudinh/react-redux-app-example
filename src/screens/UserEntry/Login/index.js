import React, {Component} from 'react';
import {
  Spin,
  Alert,
  Button,
  message
} from 'antd';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';

import { OldSocialLogin as SocialLogin } from 'react-social-login';
import { APP_FB_ID, APP_GOOGLE_ID } from 'app/services/constants';
import Language from 'app/languages/index';

import './login.css';
import ForgotPasswordModal from "app/screens/UserEntry/components/ForgotPasswordModal/container";

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonsClick: false,
      showModalForgotPassword: false,
      screen: 'login',
      swapScreen: {
        login: {
          textSignInFB: Language.userEntry.login.textSignInFB,
          textSignInGg: Language.userEntry.login.textSignInGg,
          textSignIn: Language.userEntry.login.textSignIn,
          textBottom: Language.userEntry.login.textBottom,
          haveAccount: Language.userEntry.login.haveAccount,
        },
        signUp: {
          textSignInFB: Language.userEntry.signUp.textSignInFB,
          textSignInGg: Language.userEntry.signUp.textSignInGg,
          textSignIn: Language.userEntry.signUp.textSignIn,
          textBottom: Language.userEntry.signUp.textBottom,
          haveAccount: Language.userEntry.signUp.haveAccount,
        }
      }
    };
    this.props.reset();
    this.signIn = this.signIn.bind(this);
    this.setButtonClick = this.setButtonClick.bind(this);
    this.handleKeyPressInput = this.handleKeyPressInput.bind(this);
  }
  signIn(){
    const { email, password } = this.refs;
    const { screen } = this.state;
    if (email.value.length > 0 && password.value.length > 0) {
      this.setState({
        buttonsClick: true
      });
      this.props.login(email.value, password.value, screen);
    }
  }
  handleKeyPressInput(e){
    if (e.key === 'Enter') {
      this.signIn();
    }
  }
  signInSocial(user, err, provider = 'facebook') {
    if (user) {
      let { _token } = user, token = null;
      switch (provider) {
        case 'facebook':
          token = _token.accessToken;
          break;
        case 'google':
          token = _token.idToken;
          break;
        default:
          break;
      }
      this.props.loginSocial(token, provider);
    }
    if (err) {
      if (err.length < 40) {
        message.error(`Error: ${err.error}`, 10);
      }
    }
  }
  componentWillMount(){
    const { history, isAuthenticated, match } = this.props;
    if (isAuthenticated || match.path === '/login') {
      history.push('/');
    }
  }
  setButtonClick( click = true ){
    this.setState({
      buttonsClick: click
    })
  }
  componentDidMount(){
    this.props.reset();
  }
  
  render(){
    const { inProgress, errors, history } = this.props;
    const { buttonsClick, screen, swapScreen } = this.state;
    return(
      <div className={'auth-content'}>
        <Spin spinning={false} size="large" >
          <SocialLogin
            provider='facebook'
            appId={APP_FB_ID}
            callback={(user, err) => {this.signInSocial(user, err)}}
          >
            <Button onClick={this.setButtonClick} icon={'facebook'} type={'primary'} className={'btn-login-fb btn-social Facebook-login'}>
              {swapScreen[screen].textSignInFB}
            </Button>
          </SocialLogin>
  
          <SocialLogin
            provider='google'
            appId={APP_GOOGLE_ID}
            callback={(user, err) => {this.signInSocial(user, err, 'google')}}
          >
            <Button onClick={this.setButtonClick} icon={'google'} type={'primary'} className={'btn-social Google-login'}>
              {swapScreen[screen].textSignInGg}
            </Button>
          </SocialLogin>
  
          <div className="spacer">or</div>
          
          <div className="form-login">
            <input type="text" placeholder="Email" ref={'email'} onKeyPress={this.handleKeyPressInput}/>
            <input type="password" placeholder={Language.userEntry.password} ref={'password'} onKeyPress={this.handleKeyPressInput}/>
            {errors && buttonsClick &&
            <Alert
              className="alert-error-login"
              message={screen === 'login' ? Language.userEntry.authenticatedFail : Language.userEntry.signUpFail}
              description={`${errors}`}
              type="error"
              showIcon
            />
            }
            <div className="auth-bottom">
              <Button className={'btn-login'} type={'primary'} onClick={this.signIn}>
                {swapScreen[screen].textSignIn}
              </Button>
              <div className="auth-text-line">
                <a onClick={() => {
                  this.forgotPasswordModal.wrappedInstance.show()
                }}>{Language.userEntry.forgotPassword}</a>
              </div>
              <div className="auth-text-line last-line">
                {swapScreen[screen].haveAccount} <a onClick={() => {
                  this.props.reset();
                  this.setState({
                    screen: screen === 'login' ? 'signUp' : 'login'
                  })
              }}>{swapScreen[screen].textBottom}</a>
              </div>
            </div>
            <ForgotPasswordModal
              ref={(ref) => this.forgotPasswordModal = ref}
              history={ history }
            />
          </div>
          <LoadingIndicator onDuty={inProgress}/>
        </Spin>
      </div>
    )
  }
}
