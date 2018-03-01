import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Button from 'app/components/Button/Button';
import ConfirmPopup from 'app/components/Popup/ConfirmPopup';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Detail.css';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.deregister = this.deregister.bind(this);
    this.confirmDeregister = this.confirmDeregister.bind(this);
  }

  componentDidMount() {
    const { match, fetchDetail, clean } = this.props;
    clean();
    fetchDetail(match.params.id);
  }

  deregister() {
    this.deregisterPopup.show();
  }
  
  confirmDeregister() {
    const { deregister, detail } = this.props;
    this.deregisterPopup.hide();
    deregister(detail.id);
  }

  componentDidUpdate() {
    const { deregistered, history } = this.props;
    (deregistered) && history.push('/');
  }
  
  render() {
    const { detail, inProgress, errors, deregisterErrors } = this.props;
    const {
      serialNumber,
      type,
      appliedRegulations,
      manufacturedDate,
      manufacturer,
      capacity,
      workingPressure,
      tareWeight,
      lastCarriedGas,
      airPressure,
      vacuumReading,
      location,
      warehouseLocation,
      loadMedium,
      nextMaintenanceDate,
      nextInspectionDate,
      comment,
      status,
      id,
      taggedOrder,
      taggedReservation,
    } = (detail) ? detail : {};
    return (
      <div className="tank-info-detail container">
        <h1 className="main-title">Tank info #{id}</h1>
        { (errors && errors.length) ? (
          <ErrorsDisplay center errors={errors}/>
        ) : (
          <div className="tank-info-detail__wrapper">
            <div className="tank-info-detail__content">
              <label className="flex-default">
                <span>Tank serial number:</span>
                <div className="inline-field">
                  { serialNumber }
                </div>
              </label>
              <label className="flex-default">
                <span>Type of tank:</span>
                <div className="inline-field">
                  { type }
                </div>
              </label>
              <label className="flex-default">
                <span>Applied regulation:</span>
                <div className="inline-field">
                  { appliedRegulations }
                </div>
              </label>
              <label className="flex-default">
                <span>Manufactured date:</span>
                <div className="inline-field">
                  { moment(new Date(manufacturedDate)).format('DD MMM YYYY') }
                </div>
              </label>
              <label className="flex-default">
                <span>Manufacturer:</span>
                <div className="inline-field">
                  { manufacturer }
                </div>
              </label>
              <label className="flex-default">
                <span>Capacity:</span>
                <div className="inline-field">
                  { capacity }
                </div>
              </label>
              <label className="flex-default">
                <span>Working pressure:</span>
                <div className="inline-field">
                  { workingPressure }
                </div>
              </label>
              <label className="flex-default">
                <span>Tare weight:</span>
                <div className="inline-field">
                  { tareWeight }
                </div>
              </label>
              <label className="flex-default">
                <span>last carried gas:</span>
                <div className="inline-field">
                  { lastCarriedGas }
                </div>
              </label>
              <label className="flex-default">
                <span>Air pressure:</span>
                <div className="inline-field">
                  { airPressure }
                </div>
              </label>
              <label className="flex-default">
                <span>Vacuum reading:</span>
                <div className="inline-field">
                  { vacuumReading }
                </div>
              </label>
              <label className="flex-default">
                <span>Location:</span>
                <div className="inline-field">
                  { location }
                </div>
              </label>
              <label className="flex-default">
                <span>Warehouse location:</span>
                <div className="inline-field">
                  { warehouseLocation }
                </div>
              </label>
              <label className="flex-default">
                <span>Loading medium:</span>
                <div className="inline-field">
                  { loadMedium }
                </div>
              </label>
              <label className="flex-default">
                <span>Next maintainance date:</span>
                <div className="inline-field">
                  { moment(new Date(nextMaintenanceDate)).format('DD MMM YYYY') }
                </div>
              </label>
              <label className="flex-default">
                <span>Next inspection date:</span>
                <div className="inline-field">
                  { moment(new Date(nextInspectionDate)).format('DD MMM YYYY') }
                </div>
              </label>
              <label className="flex-default">
                <span>Comment:</span>
                <div className="inline-field">
                  { comment }
                </div>
              </label>
              <label className="flex-default">
                <span>Status:</span>
                <div className="inline-field">
                  { status }
                </div>
              </label>
              <label className="flex-default">
                <span>Tagged to order:</span>
                <div className="inline-field">
                  <Link className="highlight" to={`/order/detail/${taggedOrder}`}>{taggedOrder}</Link>
                </div>
              </label>
              <label className="flex-default">
                <span>Tagged to reservation:</span>
                <div className="inline-field">
                  <Link className="highlight" to={`/reservation/detail/${taggedReservation}`}>{taggedReservation}</Link>
                </div>
              </label>
              <div className="center" style={{ marginTop: '22px' }}>
                <Link className="highlight" to={`/tank/logs/${id}`}>View activity logs</Link>
              </div>
            </div>
            <ErrorsDisplay errors={deregisterErrors} center/>
            <div className="tank-info-detail__btns row">
              <div className="col-2"></div>
              <div className="col-4">
                <Button onClick={() => this.props.history.push(`/tank/edit/${id}`)} type="green-reverse" fullWidth>EDIT</Button>
              </div>
              <div className="col-4">
                <Button onClick={this.deregister} fullWidth>DE-REGISTER</Button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        )}
        <LoadingIndicator onDuty={inProgress} />
        <ConfirmPopup
          ref={ref => this.deregisterPopup = ref}
          confirm={this.confirmDeregister}
          title={"De-register Tank"}
          message="Do you really want to de-register this tank info"
          confirmText="De-register"
          negative />
      </div>
    )
  }
}