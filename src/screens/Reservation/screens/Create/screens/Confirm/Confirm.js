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

  componentDidMount() {
    this.props.clean();
  }

  submit() {
    this.props.submit(this.props.fields);
  }

  componentDidUpdate() {
    const { reset, history, submittedId } = this.props;
    if (submittedId) {
      history.push(`/reservation/detail/${submittedId}`)
      reset();
    }
  }
  
  render() {
    const {
      fields,
      inProgress,
      errors,
    } = this.props;
    const {
      type,
      reservationNumber,
      remarks,
      expiredDate,

      salespersonName,
      salespersonPhone,
      salespersonEmail,

      customerName,
      customerLocation,
      deliveryAddress,
      additionalDetails,
      warehouseLocation,

      tanks,
    } = fields;

    return (
      <div className="reservation-confirm container">
        <h1 className="main-title">Confirm reservation</h1>
        <div className="reservation-confirm__content detail">
          <label className="flex-default">
            <span>Type of reservation:</span>
            <div className="inline-field">
              {type.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Reservation number:</span>
            <div className="inline-field">
              {reservationNumber.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Salesperson info:</span>
            <div className="inline-field">
              {salespersonName.value} - {salespersonPhone.value} - {salespersonEmail.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Tank info:</span>
            <div className="inline-field">
              { tanks.value ? tanks.value.map(tank => (
                <div className="brief-info-item" key={tank.serialNumber}>{tank.serialNumber} - {tank.loadMedium} - {tank.vacuumReading} - {tank.lastCarriedGas} - {tank.status} - {tank.location} - {tank.manufacturedDate}</div>
              )) : 'None' }
            </div>
          </label>
          <label className="flex-default">
            <span>Customer info:</span>
            <div className="inline-field">
              {customerName.value} - {customerLocation.value} - {deliveryAddress.value} - {additionalDetails.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Warehouse location:</span>
            <div className="inline-field">
              {warehouseLocation.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Remarks:</span>
            <div className="inline-field">
              {remarks.value}
            </div>
          </label>
          <label className="flex-default">
            <span>Expiry date:</span>
            <div className="inline-field">
              {moment(expiredDate.value).format('DD MMM YYYY')}
            </div>
          </label>
        </div>
        <ErrorsDisplay errors={errors} center/>
        <div className="reservation-confirm__btns row">
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