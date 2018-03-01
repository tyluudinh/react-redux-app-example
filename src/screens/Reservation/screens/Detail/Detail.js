import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Button from 'app/components/Button/Button';
import ConfirmPopup from 'app/components/Popup/ConfirmPopup';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Detail.css';

export default class detail extends Component {
  needTanks= true
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  delete() {
    this.confirmDeletePopup.show();
  }
  
  confirmDelete() {
    this.props.deleteReservation(this.props.detail.id);
    this.confirmDeletePopup.hide();
  }

  componentDidMount() {
    const { match, fetchDetail, clean } = this.props;
    this.need = true;
    clean();
    fetchDetail(match.params.id);
  }

  _renderTanks() {
    const { tanks } = this.props;
    const tanksRender = [];
    for (let key in tanks) {
      const tank = tanks[key];
      const { data, inProgress, errors } = tank;
      tanksRender.push(
        (data && !inProgress) ? (
          <div className="brief-info-item" key={data.serialNumber}>
            <Link className="highlight" to={`/tank/detail/${data.id}`}>{data.serialNumber}</Link> -{' '}
            {data.lastCarriedGas} -{' '}
            {data.status} -{' '}
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
 
  componentDidUpdate() {
    // Check if there is tank needed to be fetched
    const { detail, fetchTank, deleted, history } = this.props;
    if (this.needTanks && detail.tanks) {
      const tanks = detail.tanks
      for (let i = 0, len = tanks.length; i < len; i++) {
        fetchTank(tanks[i]);
      }
      this.needTanks = false;
    }
    
    // Check if deleted successfully
    if (deleted) {
      history.push('/');
    }
  }

  render() {
    const { detail, inProgress, errors, deletesErrors } = this.props;
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
      status,
      id,
    } = detail;
    return (
      <div className="reservation-detail container">
        <h1 className="main-title">Reservation detail #{id} </h1>
        { (errors) ? (
          <ErrorsDisplay errors={errors} center/>
        ) : (
          <div className="reservation-detail__wrapper">
            <div className="reservation-detail__content">
              <label className="flex-default">
                <span>Type of reservation:</span>
                <div className="inline-field">
                  {type}
                </div>
              </label>
              <label className="flex-default">
                <span>Reservation number:</span>
                <div className="inline-field">
                  {reservationNumber}
                </div>
              </label>
              <label className="flex-default">
                <span>Salesperson info:</span>
                <div className="inline-field">
                  {salespersonName} - {salespersonPhone} - {salespersonEmail}
                </div>
              </label>
              <label className="flex-default">
                <span>Tank info:</span>
                <div className="inline-field">
                  {this._renderTanks()}
                </div>
              </label>
              <label className="flex-default">
                <span>Customer info:</span>
                <div className="inline-field">
                  {customerName} - {customerLocation} - {deliveryAddress} - {additionalDetails}
                </div>
              </label>
              <label className="flex-default">
                <span>Warehouse location:</span>
                <div className="inline-field">
                  {warehouseLocation}
                </div>
              </label>
              <label className="flex-default">
                <span>Remarks:</span>
                <div className="inline-field">
                  {remarks}
                </div>
              </label>
              <label className="flex-default">
                <span>Status:</span>
                <div className="inline-field">
                  {status}
                </div>
              </label>
              <label className="flex-default">
                <span>Expiry date:</span>
                <div className="inline-field">
                  {moment(parseInt(expiredDate, 10)).format('DD MMM YYYY')}
                </div>
              </label>
            </div>
            <div className="center spacing-top spacing-bottom">
              <Link className="highlight" to={`/reservation/logs/${id}`}>View activity logs</Link>
            </div>
            <ErrorsDisplay errors={deletesErrors} center/>
            <div className="reservation-detail__btns row">
              <div className="col-2"></div>
              <div className="col-4">
                <Button onClick={this.delete} fullWidth type="red-reverse">DELETE</Button>
              </div>
              <div className="col-4">
                <Button onClick={() => this.props.history.push(`/reservation/edit/${id}`)} type="green-reverse" fullWidth>EDIT</Button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        )}
        <ConfirmPopup
          ref={ref => this.confirmDeletePopup = ref}
          confirm={this.confirmDelete}
          title="Delete reservation"
          message="Do you want to delete this reservation?"
          confirmText="Delete"
          negative/>
        <LoadingIndicator onDuty={inProgress}/>
      </div>
    )
  }
}