import React, {Component} from 'react';
import classNames from 'classnames';
import {
  Table,
} from 'antd';
import numeral from 'numeral';
import moment from 'moment';

import i18n from 'app/languages/index'
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator'
import { URL_CHECK_MY_WALLET } from 'app/services/constants';
import './Transaction.css'



export default class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    };
    this.props.clean();
  }
  componentDidMount(){
    this.fetch();
  }
  fetch() {
    const { user } = this.props;
    this.props.fetchList({
      user_id: user.id
    });
  }
  _renderStatus(status) {
    let className = 'pending';
    switch (status) {
      case 'TRANSACTION_FAIL':
        className = 'failed';
        break;
      case 'APPROVED':
        className = 'paind';
        break;
      default:
        break;
    }
    return (
      <div className={classNames(className, 'transaction-status')}>
        {status}
      </div>
    )
  }
  
  render(){
    const { inProgress, list, fetched } = this.props;
    const columns = [
      {
        title: i18n.transactionScreen.payableAmount,
        dataIndex: 'amount',
        className: 'text-center',
        key: 'amount',
        render: (text, data, index) => numeral(data.amount).format('0,0[.]00') + ' USD'
      },
      {
        title: i18n.transactionScreen.receiveAddress,
        dataIndex: 'currency',
        key: 'currency',
        className: 'text-center',
        render: (text, data, index) => {
          let { receiver_eth_address } = data;
          return (
            <a className="check-my-wallet" href={`${URL_CHECK_MY_WALLET}${receiver_eth_address}`} target="_blank">{receiver_eth_address}</a>
          )
        }
      },
      {
        title: i18n.transactionScreen.bonusRate,
        dataIndex: 'bonus_rate',
        key: 'bonus_rate',
        className: 'text-center',
        render: (text, data, index) => `${data.bonus_rate}%`
      },
      {
        title: 'Spout Tokens',
        dataIndex: 'token_received',
        key: 'token_received',
        className: 'text-center',
        render: (text, data, index) => {
          let { token_received } = data;
          if (token_received) {
            return (`${numeral(token_received).format('0,0[.]00')} SPT`)
          }
          return null;
        }
      },
      {
        title: i18n.transactionScreen.status,
        dataIndex: 'status',
        key: 'status',
        render: (text, data) => {
          const { status } = data;
          return (
            this._renderStatus(status)
          )
        }
      },
      {
        title: i18n.transactionScreen.time,
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text, data, index) => moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')
      },
    ];
    if (fetched || inProgress) {
      return(
        <div>
          <div className="tabs-nav single-tab hidden">
            <div className="send-info">Your Spout Tokens balance:<span className="amount-to-send">0</span></div>
            <div className="send-info">Referral tokens:<span className="amount-to-send">0</span></div>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-xs-12">
                <h1>{i18n.transactionScreen.title}</h1>
                <div className="row">
                  <div className="col-xs-12 transactions-wrapper">
                    <Table
                      className={'transactions'}
                      columns={columns}
                      bordered={true}
                      loading={false}
                      rowKey={record => record.id}
                      dataSource={list}
                      pagination={true}
                      locale={{emptyText: i18n.transactionScreen.emptyText}}
                    >
                    </Table>
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
