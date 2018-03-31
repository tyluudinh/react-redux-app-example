import React, { Component } from 'react';
import {
  Modal,
  Input,
  Alert,
  Spin,
  message
} from 'antd';
import './ForgotPasswordModal.css';
import ResetPasswordModal from "app/screens/UserEntry/components/ResetPasswordModal/container";
import Language from 'app/languages/index';

const { Search } = Input;
export default class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      emailForgotPassword: '',
      loading: false
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { completed } = nextProps;
    if (completed) {
      this.close();
      message.success(Language.userEntry.messageSuccessSendEmail);
      this.resetPasswordModal.wrappedInstance.show();
    }
  }
  submit(){
    this.props.clean();
    const { emailForgotPassword } = this.state;
    let data = {
      email: emailForgotPassword,
    };
    const { history } = this.props;
    this.props.submitEmail(data, history);
    
  }
  close(){
    this.setState({
      visible: false,
      emailForgotPassword: ''
    });
    this.props.clean();
  }
  show() {
    this.setState({
      visible: true
    });
    this.props.clean();
  }
  setValue(value){
    this.setState({
      emailForgotPassword: value
    })
  }
  render() {
    const { visible, emailForgotPassword } = this.state;
    const { errors, inProgress } = this.props;
    return (
      <div>
        <Modal
          className="modal-forgot-password"
          visible={visible}
          maskClosable={false}
          onCancel={this.close}
          title={Language.userEntry.findYourAccount}
          footer={null}
        >
          <Spin spinning={inProgress} tip={Language.userEntry.checkingEmail}>
            <p>{Language.userEntry.forgotPasswordModalDes}</p>
            <Search
              placeholder={Language.userEntry.emailAddress}
              value={emailForgotPassword}
              enterButton={Language.userEntry.btnSend}
              size="large"
              onChange={(e) => {this.setValue(e.target.value)}}
              onSearch={this.submit}
            />
            <div style={{marginTop: 10}}>
              {errors ?
                <Alert message={errors} type="error" showIcon />
                : null
              }
            </div>
          </Spin>
        </Modal>
        <ResetPasswordModal
          ref={(ref) => this.resetPasswordModal = ref}
        />
      </div>
    )
  }
}