import React, { Component } from 'react';
import classNames from 'classnames';

import Table from 'app/components/Table/Table';

import './SearchResult.css';

const orderColumns = [
  {
    Header: 'ORDER NUMBER',
    accessor: 'orderNumber'
  }, 
  {
    Header: 'STATUS',
    accessor: 'status',
  }, 
  {
    Header: 'CUSTOMER',
    accessor: 'customerName'
  },
  {
    Header: 'SALESPERSON',
    accessor: 'salespersonName'
  },
  {
    Header: 'LOCATION',
    accessor: 'destination'
  },
  {
    Header: 'DELIVERY TIME',
    accessor: 'deliveryTime'
  }
];

const tankColumns = [
  {
    Header: 'T SERIAL NUMBER',
    accessor: 'serialNumber'
  }, 
  {
    Header: 'TYPE OF TANK',
    accessor: 'tankType',
  }, 
  {
    Header: 'MWAP \n (bar)',
    accessor: 'mwap'
  },
  {
    Header: 'AIR PRESSURE \n (bar)',
    accessor: 'airPressure'
  },
  {
    Header: 'VACUUM READING',
    accessor: 'vacuumReading'
  },
  {
    Header: 'LOCATION',
    accessor: 'location'
  },
  {
    Header: 'NEXT INSPECTION DATE',
    accessor: 'nextInspectionDate'
  },
  {
    Header: 'STATUS',
    accessor: 'status'
  },
];

const reservationColumns = [
  {
    Header: 'RESERVATION NUMBER',
    accessor: 'reservationNumber'
  }, 
  {
    Header: 'EXPIRY DATE AND TIME',
    accessor: 'expiredDate',
  }, 
  {
    Header: 'SALESPERSON',
    accessor: 'salespersonName'
  },
  {
    Header: 'STATUS',
    accessor: 'status'
  },
  {
    Header: 'LOCATION',
    accessor: 'location'
  },
];


export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'tank',
    }
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab })
  }

  render() {
    const { result, history } = this.props;
    const { activeTab } = this.state;
    console.log('result', result.orders);
    return (
      <div className="search-result-wrapper">
        <div className="search-result__tabs-selector">
          <div 
            className={classNames('tabs-selector__item', {'tabs-selector__item--active': activeTab === 'tank'})}
            onClick={() => this.setActiveTab('tank')}>
            Tank info
          </div>
          <div 
            className={classNames('tabs-selector__item', {'tabs-selector__item--active': activeTab === 'order'})}
            onClick={() => this.setActiveTab('order')}>
            Orders
          </div>
          <div 
            className={classNames('tabs-selector__item', {'tabs-selector__item--active': activeTab === 'reservation'})}
            onClick={() => this.setActiveTab('reservation')}>
            Reservations
          </div>
        </div>
        <div className="search-result__tabs-content">
          <Table
            pageSize={result.tanks.length}
            columns={tankColumns}
            data={result.tanks}
            getTdProps={(state, rowInfo) => {
              return {
                onClick: () => {
                  history.push(`/tank/detail/${rowInfo.original.id}`);
                }
              }
            }}
            className={classNames(
              'tab-content',
              { 'tab-content--active': activeTab === 'tank'}
            )}
          />
          <Table
            pageSize={result.orders.length}
            columns={orderColumns}
            data={result.orders}
            getTdProps={(state, rowInfo) => {
              return {
                onClick: () => {
                  history.push(`/order/detail/${rowInfo.original.id}`);
                }
              }
            }}
            className={classNames(
              'tab-content',
              { 'tab-content--active': activeTab === 'order'}
            )}
          />
          <Table
            pageSize={result.reservations.length}
            columns={reservationColumns}
            data={result.reservations}
            getTdProps={(state, rowInfo) => {
              return {
                onClick: () => {
                  history.push(`/reservation/detail/${rowInfo.original.id}`);
                }
              }
            }}
            className={classNames(
              'tab-content',
              { 'tab-content--active': activeTab === 'reservation'}
            )}
          />
        </div>
      </div>
    )
  }
}