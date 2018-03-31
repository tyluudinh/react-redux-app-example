import React, { Component } from 'react';
import {
  Modal,
  Alert,
  Button,
  Spin,
  message
} from 'antd';
import './ResetPasswordModal.css';
import Language from 'app/languages/index';


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
      message.success(Language.userEntry.messageSuccessResetPassword);
    }
  }
  submit(){
    this.props.clean();
    const { code, password } = this.refs;
    let data = {
      reset_token: code.value,
      password: password.value,
    };
    const { history } = this.props;
    this.props.submit(data, history);
    
  }
  close(){
    this.setState({
      visible: false,
    });
    this.props.clean();
  }
  show() {
    this.setState({
      visible: true
    });
    this.props.clean();
  }
  render() {
    const { visible } = this.state;
    const { errors, inProgress } = this.props;
    return (
      <Modal
        className="modal-forgot-password"
        visible={visible}
        maskClosable={false}
        onCancel={this.close}
        title={Language.userEntry.titlePopupResetPassword}
        footer={[
          null,
          <Button key="submit" type={'primary'} onClick={this.submit}>{Language.userEntry.btnReset}</Button>,
        ]}
      >
        <Spin spinning={inProgress} tip={Language.userEntry.resetting}>
          <div className="form-login">
            <p>{Language.userEntry.resetCode}</p>
            <input type="number" placeholder={Language.userEntry.resetCode} ref={'code'} />
            <br/>
            <p>{Language.userEntry.newPassword}</p>
            <input type="password" placeholder={Language.userEntry.newPassword} ref={'password'} />
            <div style={{marginTop: 10}}>
              {errors ?
                <Alert message={errors} type="error" showIcon />
                : null
              }
            </div>
          </div>
        </Spin>
      </Modal>
    )
  }
}