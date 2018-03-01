import React, { Component } from 'react';

import Table, { attachArrows } from 'app/components/Table/Table';
import SelectBox from 'app/components/SelectBox/SelectBox';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './PermissionManagement.css';

export default class PermissionManagement extends Component {
  readyToFetch = true
  constructor(props) {
    super(props);
    this.changePermission = this.changePermission.bind(this);

    this.state = {
      accounts: [],
    }
  }

  componentDidMount() {
    const { clean, fetchUserList } = this.props;
    clean();
    fetchUserList();
  }

  changePermission(index) {
    const context = this;
    return (name, value) => {
      let accounts = context.state.accounts;
      accounts[index][name] = value;
      context.props.setUserPermission(accounts[index]);
      context.setState({
        accounts: [...accounts]
      });
    }
  }

  componentDidUpdate() {
    const { userList, fetched } = this.props;
    if (fetched && this.readyToFetch) {
      this.setState({ accounts: userList });
      this.readyToFetch = false;
    }
  }

  render() {
    const { fetchErrors, userList, inProgress } = this.props;
    const accountListColumns = [
      {
        Header: attachArrows('NAME'),
        accessor: 'name',
      },
      {
        Header: attachArrows('TANK INFO'),
        accessor: 'tankInfo',
        Cell: tankInfo => {
          return (
            <SelectBox
              name="tankInfo"
              flat
              passive
              customItems
              value={tankInfo.value}
              onChange={this.changePermission(tankInfo.original.index)}
              options={[
                { value: 'READ', label: 'Read Only', color: '#9b9b9b' },
                { value: 'CREATE', label: 'Create', color: '#009247' },
                { value: 'EDIT', label: 'Edit', color: '#0091d0' },
                { value: 'ALL', label: 'All', color: '#787878' },
                { value: 'NONE', label: 'None', color: '#9e9e9e' },
              ]}
            />
          )
        }
      },
      {
        Header: attachArrows('ORDERS'),
        accessor: 'orders',
        Cell: orders => {
          return (
            <SelectBox
              name="orders"
              flat
              passive
              customItems
              value={orders.value}
              onChange={this.changePermission(orders.original.index)}
              options={[
                { value: 'READ', label: 'Read Only', color: '#9b9b9b' },
                { value: 'CREATE', label: 'Create', color: '#009247' },
                { value: 'EDIT', label: 'Edit', color: '#0091d0' },
                { value: 'ALL', label: 'All', color: '#787878' },
                { value: 'NONE', label: 'None', color: '#9e9e9e' },
              ]}
            />
          )
        }
      },
      {
        Header: attachArrows('REPORTS'),
        accessor: 'reports',
        Cell: reports => {
          return (
            <SelectBox
              name="reports"
              flat
              passive
              withColors
              customItems
              value={reports.value}
              onChange={this.changePermission(reports.original.index)}              
              options={[
                { value: 'CREATE', label: 'Upload', color: '#0091d0' },
                { value: 'READ', label: 'Download', color: '#009247' },
                { value: 'ALL', label: 'All', color: '#787878' },
                { value: 'NONE', label: 'None', color: '#9e9e9e' },
              ]}
            />
          )
        }
      },
      {
        Header: attachArrows('SETTINGS'),
        accessor: 'settings',
        Cell: settings => {
          return (
            <SelectBox
              name="settings"
              flat
              passive
              customItems
              value={settings.value}
              onChange={this.changePermission(settings.original.index)}
              options={[
                { value: 'READ', label: 'Read Only', color: '#9b9b9b' },
                { value: 'CREATE', label: 'Create', color: '#009247' },
                { value: 'EDIT', label: 'Edit', color: '#0091d0' },
                { value: 'ALL', label: 'All', color: '#787878' },
                { value: 'NONE', label: 'None', color: '#9e9e9e' },
              ]}
            />
          )
        }
      },
    ]
    
    return (
      <div className="permission-management container">
        <h1 className="main-title">Permission management</h1>
        { fetchErrors ? (
          <ErrorsDisplay errors={fetchErrors} center/>
        ) : (
          <Table
            columns={accountListColumns}
            data={userList}
            pageSize={this.state.accounts.length}
          />
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}