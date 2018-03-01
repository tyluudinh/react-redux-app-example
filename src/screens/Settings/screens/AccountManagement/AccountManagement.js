import React, { Component } from 'react';
import EditIcon from 'react-icons/lib/fa/pencil';
import DeleteIcon from 'react-icons/lib/fa/trash';

import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';
import ConfirmPopup from 'app/components/Popup/ConfirmPopup';

import Table, { attachArrows } from 'app/components/Table/Table';
import ResetPasswordPopup from './components/ResetPasswordPopup/ResetPasswordPopup';
import EditAccountPopup from './components/EditAccountPopup/EditAccountPopup';

import './AccountManagement.css';

export default class AccountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProfile: {},
      idToDelete: null,
    };

    this.showResetPasswordPopup = this.showResetPasswordPopup.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    const { clean, fetchUserList } = this.props;
    clean();
    fetchUserList();
  }

  showResetPasswordPopup(e) {
    e.preventDefault();
    this.resetPasswordPopup.show();
  }

  editProfile(data) {
    return (e) => {
      this.setState({
        activeProfile: data
      });
      e.preventDefault(); 
      this.editAccountPopup.show();
    }
  }

  deleteAccount(id) {
    return (e) => {
      this.setState({
        idToDelete: id
      })
      this.deleteAccountPopup.show();
    }
  }

  confirmDeleteAccount() {
    // const { idToDelete } = this.state;
    // delete it!
  }

  render() {
    const accountManagement = this;
    
    const { inProgress, fetchErrors, userList, me } = this.props;
    const { activeProfile } = this.state;
   
    const ownedAccountColumns = [
      { 
        accessor: 'name',
        Cell: name => {
          return (
            <strong>
              {name.value}<br/>
              <a href="" onClick={accountManagement.showResetPasswordPopup}>Password reset</a>
            </strong>
          );
        }
      },
      {
        accessor: 'email',
        Cell: email => <strong>{email.value}</strong>
      },
      {
        accessor: 'accountType',
        Cell: accountType => <strong>{accountType.value}</strong>
      },
      {
        accessor: 'designation',
        Cell: designation => <strong>{designation.value}</strong>
      },
      {
        accessor: 'phone',
        Cell: phone => <strong>{phone.value}</strong>
      },
      {
        accessor: 'id',
        Cell: data => {
          return(
            <strong>
              <span>
                <span className="account-management__icon-btn" onClick={accountManagement.editProfile(data.original)}>
                  <EditIcon size={14}/>
                </span>
              </span>
            </strong>
          )
        } 
      }
    ]

    const accountListColumns = [
      {
        Header: attachArrows('NAME'),
        accessor: 'name',
        Cell: name => (<span>{name.value}</span>)
      },
      {
        Header: attachArrows('EMAIL'),
        accessor: 'email',
        Cell: email => (<span>{email.value}</span>)
      },
      {
        Header: attachArrows('ACCOUNT TYPE'),
        accessor: 'accountType',
        Cell: type => (<span>{type.value}</span>)
      },
      {
        Header: attachArrows('DESIGNATION'),
        accessor: 'designation',
        Cell: designation => (<span>{designation.value}</span>)
      },
      {
        Header: attachArrows('PHONE NUMBER'),
        accessor: 'phone',
        Cell: phone => (<span>{phone.value}</span>)
      },
      {
        Header: '',
        accessor: 'id',
        Cell: data => {
          return (
            <span>
              <span className="account-management__icon-btn" onClick={accountManagement.editProfile(data.original)}>
                <EditIcon size={14}/>
              </span>
              <span className="account-management__icon-btn negative" onClick={accountManagement.deleteAccount(data.value)}>
                <DeleteIcon size={14}/>
              </span>
            </span>
          )
        } 
      },
    ]
    
    return (
      <div className="account-management container">
        <h1 className="main-title">Manage existing accounts</h1>
        { fetchErrors ? (
          <ErrorsDisplay errors={fetchErrors} center/>
        ) : (
          <div>
            <Table
              data={[me]}
              columns={ownedAccountColumns}
              className="account-management__own-account"
              pageSize={1}
            />
            <Table
              data={userList}
              columns={accountListColumns}
              className="account-management__account-list"
              pageSize={userList.length}
            />
            <ResetPasswordPopup ref={(ref) => this.resetPasswordPopup = ref} />
            <EditAccountPopup ref={(ref) => this.editAccountPopup = ref} data={activeProfile} />
            <ConfirmPopup
              ref={ref => this.deleteAccountPopup = ref}
              confirm={this.confirmDeleteAccount}
              title="Delete account"
              message="You want to delete this account?"
              confirmText="Delete"
              negative/>
          </div>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}