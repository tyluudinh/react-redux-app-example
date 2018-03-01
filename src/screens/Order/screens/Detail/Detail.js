import React, { Component } from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';

import Button from 'app/components/Button/Button';
import ConfirmPopup from 'app/components/Popup/ConfirmPopup';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Detail.css';

export default class Confirm extends Component {
  needTanks = true
  needReservations = true
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this._renderReservation = this._renderReservation.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.confirmSetComplete = this.confirmSetComplete.bind(this);
  }

  componentDidMount(){
    const { match, fetchDetail, clean } = this.props;
    this.needTanks = true;
    clean();
    fetchDetail(match.params.id);
  }

  _renderTanks() {
    const { tanks } = this.props;
    const tanksRender = [];
    console.log(tanks);
    for (let key in tanks) {
      const tank = tanks[key];
      const { data, inProgress, errors } = tank;
      tanksRender.push(
        (data && !inProgress) ? (
          <div className="brief-info-item" key={data.serialNumber}>
            <Link className="highlight" to={`/tank/detail/${data.id}`}>{data.serialNumber}</Link> -{' '}
            {data.lastCarriedGas} -{' '}
            {data.vacuumReading} -{' '}
            {data.location} -{' '}
            {moment(parseInt(data.manufacturedDate, 10)).format('DD MMM YYYY')}
          </div>
        ) : (
          (inProgress) ? (
            <LoadingIndicator key={`loading-tank-${key}`} mini noText onDuty={inProgress}/>
          ) : (
            (errors) && <ErrorsDisplay key={`error-tank-${key}`} errors={errors}/>
          )
        )
      )
    }
    return tanksRender;
  }

  _renderReservation() {
    const { reservations } = this.props;
    const reservationsRender = [];
    for (let key in reservations) {
      const tank = reservations[key];
      const { data, inProgress, errors } = tank;
      reservationsRender.push(
        (data && !inProgress) ? (
          <div 
            key={data.reservationNumber}
            className="brief-info-item">
            <a className="highlight" href={`/reservation/detail/${data.id}`} target="_blank">{data.reservationNumber}</a>
            {data.customerName ? ` - ${data.customerName}` : ''}
            {data.type ? ` - ${data.type}` : ''}
          </div>
        ) : (
          (inProgress) ? (
            <LoadingIndicator key={`loading-tank-${key}`} mini noText onDuty={inProgress}/>
          ) : (
            (errors) && <ErrorsDisplay key={`error-tank-${key}`} errors={errors}/>
          )
        )
      )
    }
    return reservationsRender;
  }

  delete(e) {
    e.preventDefault();
    this.confirmDeletePopup.show();
  }
  
  confirmDelete() {
    this.props.deleteOrder(this.props.detail.id);
    this.confirmDeletePopup.hide();
  }

  setComplete() {
    this.confirmCompletePopup.show();
  }
  
  confirmSetComplete() {
    this.props.completeOrder(this.props.detail.id);
    this.confirmCompletePopup.hide();
  }

  componentDidUpdate() {
    // Check if there are tanks needed to be fetched
    const { detail, fetchTank, fetchReservation, deleted, history } = this.props;
    console.log(detail);
    if (this.needTanks && detail.tanks) {
      const tanks = detail.tanks
      for (let i = 0, len = tanks.length; i < len; i++) {
        fetchTank(tanks[i]);
      }
      this.needTanks = false;
    }
    // Check if there are reservations needed to be fetched
    if (this.needReservations && detail.reservations) {
      const reservations = detail.reservations
      for (let i = 0, len = reservations.length; i < len; i++) {
        fetchReservation(reservations[i]);
      }
      this.needReservations = false;
    }
    
    // Check if deleted successfully
    if (deleted) {
      history.push('/');
    }
  }
  
  render() {
    const { detail, inProgress, errors, deletesErrors } = this.props;
    const {
      orderType,
      orderNumber,
      
      salespersonName,
      salespersonPhone,
      salespersonEmail,
      
      customerName,
      customerLocation,
      customerDeliveryAddress,
      customerDetail,
      customerWarehouse,
      
      deliveryRouteStart,
      deliveryRouteDest,
      deliveryStartDate,
      deliveryStartHour,
      deliveryStartMinute,
      deliveryEndDate,
      deliveryEndHour,
      deliveryEndMinute,
      projectTimingStart,
      projectTimingEnd,
      
      remarks,

      tanks,
      reservations,

      selectedRoute,
      costing,

      driverName,
      driverPhone,
      driverEmail,
      driverCompany,
      status,
      id,
    } = detail;
    console.log('tank', tanks, reservations);
    return (
      <div className="order-detail container">
        <h1 className="main-title">Order detail #{id}</h1>
        { (errors) ? (
          <ErrorsDisplay errors={errors} center/>
        ) : (
        <div>
          <div className="order-detail__content detail">
            <label className="flex-default">
              <span>Status:</span>
              <div className="inline-field">
                {status || `UNKNOWN`}
              </div>
            </label>
            <label className="flex-default">
              <span>Type of orders:</span>
              <div className="inline-field">
                {orderType}
              </div>
            </label>
            <label className="flex-default">
              <span>Order number:</span>
              <div className="inline-field">
                {orderNumber}
              </div>
            </label>
            <label className="flex-default">
              <span>Salesperson info:</span>
              <div className="inline-field">
                {salespersonName} - {salespersonPhone} - {salespersonEmail}
              </div>
            </label>
            <label className="flex-default">
              <span>Customer info:</span>
              <div className="inline-field">
                {customerName}
                {customerLocation ? ` - ${customerLocation}` : ''}
                {customerWarehouse ? ` - ${customerWarehouse} (Warehouse)` : ''}
                {customerDeliveryAddress ? ` - ${customerDeliveryAddress}` : ''}
                {customerDetail ? ` - ${customerDetail}` : ''}
              </div>
            </label>
            <label className="flex-default">
              <span>Tank info:</span>
              <div className="inline-field">
                {(tanks && tanks.length) ? this._renderTanks() : `None`}
              </div>
            </label>
            <label className="flex-default">
              <span>Reservation info:</span>
              <div className="inline-field">
                {(reservations && reservations.length) ? this._renderReservation() : `None` }
              </div>
            </label>
            { orderType === 'LOGISTICS' ? (
              <label className="flex-default">
                <span>Driver info:</span>
                <div className="inline-field">
                  { driverName ? (
                    <div>
                      {driverName}
                      {driverCompany ? ` - ${driverCompany}` : ''}
                      {driverPhone ? ` - ${driverPhone}` : ''}
                      {driverEmail ? ` - ${driverEmail}` : ''}
                    </div>
                  ) : `None` }
                </div>
              </label>
            ) : null }
            <label className="flex-default">
              <span>Delivery route:</span>
              <div className="inline-field">
                {deliveryRouteStart}
                <br/>
                {deliveryRouteDest}
              </div>
            </label>
            { costing ? (
              <div>
                <label className="flex-default">
                  <span>Routing:</span>
                  <div className="inline-field">
                    {selectedRoute}
                  </div>
                </label>
                <label className="flex-default">
                  <span>Cost:</span>
                  <div className="inline-field">
                    {costing}
                  </div>
                </label>
              </div>
            ) : null}
            { (orderType) === 'LOGISTICS' ? (
              <label className="flex-default">
                <span>Delivery time:</span>
                <div className="inline-field">
                  {`${deliveryStartHour}:${deliveryStartMinute} ${moment(deliveryStartDate).format('DD MMM YYYY')}`}
                  {`  to  `}
                  {`${deliveryEndHour}:${deliveryEndMinute} ${moment(deliveryEndDate).format('DD MMM YYYY')}`}
                </div>
              </label>
            ) : (
              <label className="flex-default">
                <span>Delivery time:</span>
                <div className="inline-field">
                  {moment(deliveryStartDate).format('DD MMM YYYY')} to {moment(deliveryEndDate).format('DD MMM YYYY')}
                </div>
              </label>
            )}
            <label className="flex-default">
              <span>Project timing:</span>
              <div className="inline-field">
                {moment(projectTimingStart).format('DD MMM YYYY')} to {moment(projectTimingEnd).format('DD MMM YYYY')}
              </div>
            </label>
            <label className="flex-default">
              <span>Remarks:</span>
              <div className="inline-field">
                {remarks}
              </div>
            </label>
          </div>
          <div className="center spacing-top spacing-bottom">
            <Link className="highlight" to={`/order/logs/${id}`}>View activity logs</Link>
          </div>
          <ErrorsDisplay errors={deletesErrors}/>
          <div className="order-detail__btns row flex-default">
            <div className="col-3">
              <Button onClick={this.delete} fullWidth type="red-reverse">DELETE</Button>
            </div>
            <div className="col-3">
              <Button onClick={() => this.props.history.push(`/order/edit/${id}`)} type="green-reverse" fullWidth>EDIT</Button>
            </div>
            <div className="col-3">
              <Button onClick={this.setComplete} fullWidth>COMPLETE</Button>
            </div>
          </div>
        </div>
        )}
        <LoadingIndicator onDuty={inProgress} />
        <ConfirmPopup
          ref={ref => this.confirmDeletePopup = ref}
          confirm={this.confirmDelete}
          title="Delete order"
          confirmMessage="Delete"
          message="Do you want to delete this order?"
          negative/>
        <ConfirmPopup
          ref={ref => this.confirmCompletePopup = ref}
          confirm={this.confirmSetComplete}
          title="Complete order"
          confirmMessage="Complete"
          message="Do you want to complete this order?"/>
      </div>
    )
  }
}