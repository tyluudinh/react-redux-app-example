import React, { Component } from 'react';
import moment from 'moment';

import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Confirm.css';

export default class Confirm extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit() {
    const { submitOrder, fields } = this.props;
    submitOrder(fields);
  }

  componentDidUpdate() {
    const { reset, submittedId, history } = this.props;
    if (submittedId) {
      history.push(`/order/detail/${submittedId}`);
      reset();
    }
  }

  render() {
    const {
      inProgress,
      errors,
      fields,
    } = this.props;
    console.log('fields', fields);
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
      termOfOrder,

      driverName,
      driverPhone,
      driverEmail,
      driverCompany,
      finalCost,
    } = fields;
    console.log(fields);
    return (
      <div className="order-create-confirm container">
        <h1 className="main-title">Confirm order</h1>
        <div className="order-create-confirm__content detail">
          <label className="flex-default">
            <span>Type of orders:</span>
            <div className="inline-field">
              {orderType.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Order number:</span>
            <div className="inline-field">
              {orderNumber.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Staff info:</span>
            <div className="inline-field">
              {salespersonName.value} - {salespersonPhone.value} - {salespersonEmail.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Customer info:</span>
            <div className="inline-field">
              {customerName.value}
              {customerLocation ? ` - ${customerLocation.value}` : ''}
              {customerWarehouse ? ` - ${customerWarehouse.value} (Warehouse)` : ''}
              {customerDeliveryAddress ? ` - ${customerDeliveryAddress.value}` : ''}
              {customerDetail ? ` - ${customerDetail.value}` : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Tank info:</span>
            <div className="inline-field">
              {(tanks && tanks.value && tanks.value.length) ? tanks.value.map((tank) => (
                <div 
                  key={tank.serialNumber}
                  className="brief-info-item">
                  {tank.serialNumber}
                  {tank.loadMedium ? ` - ${tank.loadMedium}` : ''}
                  {tank.capacity ? ` - ${tank.capacity}` : ''}
                  {tank.lastCarriedGas ? ` - ${tank.lastCarriedGas}` : ''}
                  {tank.status ? ` - ${tank.status}` : ''}
                  {tank.location ? ` - ${tank.location}` : ''}
                  {tank.manufacturedDate ? ` - ${tank.manufacturedDate}` : ''}
                </div>
              )) : `None` }
            </div>
          </label>
          <label className="flex-default">
            <span>Reservation info:</span>
            <div className="inline-field">
              {(reservations && reservations.value && reservations.value.length) ? reservations.value.map((reservation) => (
                <div 
                  key={reservation.reservationNumber}
                  className="brief-info-item">
                  {reservation.reservationNumber}
                  {reservation.customerName ? ` - ${reservation.customerName}` : ''}
                  {reservation.type ? ` - ${reservation.type}` : ''}
                </div>
              )) : `None` }
            </div>
          </label>
          { orderType.value === 'LOGISTICS' ? (
            <label className="flex-default">
              <span>Driver info:</span>
              <div className="inline-field">
                {driverName.value}
                {driverCompany ? ` - ${driverCompany.value}` : ''}
                {driverPhone ? ` - ${driverPhone.value}` : ''}
                {driverEmail ? ` - ${driverEmail.value}` : ''}
              </div>
            </label>
          ) : null }
          <label className="flex-default">
            <span>Delivery route:</span>
            <div className="inline-field">
              {deliveryRouteStart.value}
              <br/>
              {deliveryRouteDest.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Terms of order:</span>
            <div className="inline-field">
              {termOfOrder.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Routing:</span>
            <div className="inline-field">
              {selectedRoute.value.cat} - {selectedRoute.value.name} - {`${selectedRoute.value.cost}$`} - {`${selectedRoute.value.days} days`}
            </div>
          </label>
          <label className="flex-default">
            <span>Cost:</span>
            <div className="inline-field">
              {finalCost.value}
            </div>
          </label>
          { orderType.value === 'LOGISTICS' ? (
            <label className="flex-default">
              <span>Delivery time:</span>
              <div className="inline-field">
                {`${moment(deliveryStartDate.value).format('DD MMM YYYY')} ${deliveryStartHour.value}:${deliveryStartMinute.value}`}
                {` to `}
                {`${moment(deliveryEndDate.value).format('DD MMM YYYY')} ${deliveryEndHour.value}:${deliveryEndMinute.value}`}
              </div>
            </label>
          ) : (
            <label className="flex-default">
              <span>Delivery time:</span>
              <div className="inline-field">
                {moment(deliveryStartDate.value).format('DD MMM YYYY')} to {moment(deliveryEndDate.value).format('DD MMM YYYY')}
              </div>
            </label>
          )}
          <label className="flex-default">
            <span>Project timing:</span>
            <div className="inline-field">
              {moment(projectTimingStart.value).format('DD MMM YYYY')} to {moment(projectTimingEnd.value).format('DD MMM YYYY')}
            </div>
          </label>
          <label className="flex-default">
            <span>Remarks:</span>
            <div className="inline-field">
              {remarks.value}
            </div>
          </label>
        </div>
        <ErrorsDisplay errors={errors} center/>
        <div className="order-create-confirm__btns row">
          <div className="col-2"></div>
          <div className="col-4">
            <Button onClick={this.props.history.goBack} type="green-reverse" fullWidth>EDIT</Button>
          </div>
          <div className="col-4">
            <Button onClick={this.submit} fullWidth>CONFIRM</Button>
          </div>
          <div className="col-2"></div>
        </div>
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}