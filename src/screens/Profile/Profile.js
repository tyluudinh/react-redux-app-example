import React, {Component} from 'react';
import {
  message,
  Alert
} from 'antd';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import './Profile.css';
import i18n from 'app/languages/index';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonsClick: false,
    };
    this.props.clean();
    this.submitUpdate = this.submitUpdate.bind(this);
  }
  componentDidMount(){
    this.props.fetchProfile();
  }
  componentWillReceiveProps(nextProps) {
    const { buttonsClick } = this.state;
    const { updated } = nextProps;
    if (updated && buttonsClick) {
      message.success(i18n.profileScreen.messageUpdateSuccess);
      this.setState( { buttonsClick: false } );
    }
  }
  submitUpdate(e){
    e.preventDefault();
    this.props.clean();
    const {
      firstName,
      lastName,
      ethAddress
    } = this.refs;
    this.setState( { buttonsClick: true } );
    
    let data = {
      first_name: firstName.value,
      last_name: lastName.value,
      ether_wallet_address: ethAddress.value
    };
    this.props.updateProfile(data);
    
  }
  
  render(){
    const { inProgress, fetchErrors, updateErrors, info, fetched, updated } = this.props;
    if (info && (fetched || updated)) {
      const {
        first_name,
        last_name,
        ether_wallet_address,
        email,
        phone
      } = info;
      return(
        <div>
          <div className="content">
            <div className="row">
              <div className="col-xs-12">
                <h1>{i18n.profileScreen.title}</h1>
                <div className="row">
                  <div className="col-sm-12">
                    <form className="form-profile" onSubmit={this.submitUpdate}>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          disabled={true}
                          name="email"
                          defaultValue={email}
                          ref={'email'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="first_name">{i18n.profileScreen.firstName}:</label>
                        <input
                          type="text"
                          placeholder={i18n.profileScreen.firstName}
                          id="first_name"
                          name="firstName"
                          className="form-control"
                          defaultValue={first_name}
                          ref={'firstName'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">{i18n.profileScreen.lastName}:</label>
                        <input
                          type="text"
                          placeholder={i18n.profileScreen.lastName}
                          id="last_name"
                          name="lastName"
                          className="form-control"
                          defaultValue={last_name}
                          ref={'lastName'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phoneNumber">{i18n.profileScreen.phoneNumber}:</label>
                        <input
                          type="text"
                          placeholder={i18n.profileScreen.phoneNumber}
                          id="phoneNumber"
                          name="phoneNumber"
                          className="form-control"
                          defaultValue={phone}
                          ref={'phoneNumber'}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="EthereumAddress">{i18n.profileScreen.ethereumAddress}:</label>
                        <input
                          placeholder={i18n.profileScreen.ethereumAddress}
                          type="text"
                          id="EthereumAddress"
                          name="ethAddress"
                          className="eth-address form-control"
                          defaultValue={ether_wallet_address}
                          ref={'ethAddress'}
                        />
                      </div>
                      {fetchErrors &&
                      <Alert
                        className="alert-error-login"
                        message={i18n.profileScreen.errors.titleGet}
                        description={`${fetchErrors}`}
                        type="error"
                        showIcon
                      />
                      }
                      {updateErrors &&
                      <Alert
                        className="alert-error-login"
                        message={i18n.profileScreen.errors.titleUpdate}
                        description={`${updateErrors}`}
                        type="error"
                        showIcon
                      />
                      }
                      <button type="submit" onClick={this.submitUpdate} className="btn btn-default">{i18n.profileScreen.saveChange}</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LoadingIndicator onDuty={inProgress}/>
        </div>
      )
    }
    return null;
  }
}
