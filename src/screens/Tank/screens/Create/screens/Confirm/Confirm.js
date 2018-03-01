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
    this.props.cleanCreateForm();
  }

  submit(e) {
    e.preventDefault();
    const { submitTankCreate, fields } = this.props;
    submitTankCreate(fields);
  }

  componentDidUpdate() {
    const { submitted, submittedId, history, resetCreateForm } = this.props;
    if (submitted) {
      history.push(`/tank/detail/${submittedId}`)
      resetCreateForm();
    }
  }
  
  render() {
    const {
      fields,
      errors,
      inProgress
    } = this.props;

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
    } = fields;

    return (
      <div className="tank-info-confirm container">
        <h1 className="main-title">Confirm tank info</h1>
        <div className="tank-info-confirm__content">
          <label className="flex-default">
            <span>Tank serial number:</span>
            <div className="inline-field">
              {serialNumber ? serialNumber.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Type of tank:</span>
            <div className="inline-field">
              {type ? type.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Applied regulation:</span>
            <div className="inline-field">
              {appliedRegulations ? appliedRegulations.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Manufactured date:</span>
            <div className="inline-field">
              {manufacturedDate ? moment(manufacturedDate.value).format('MMM DD YYYY') : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Manufacturer:</span>
            <div className="inline-field">
              {manufacturer ? manufacturer.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Capacity:</span>
            <div className="inline-field">
              {capacity ? capacity.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Working pressure:</span>
            <div className="inline-field">
              {workingPressure ? workingPressure.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Tare weight:</span>
            <div className="inline-field">
              {tareWeight ? tareWeight.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>last carried gas:</span>
            <div className="inline-field">
              {lastCarriedGas ? lastCarriedGas.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Air pressure:</span>
            <div className="inline-field">
              {airPressure ? airPressure.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Vacuum reading:</span>
            <div className="inline-field">
              {vacuumReading ? vacuumReading.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Location:</span>
            <div className="inline-field">
              {location ? location.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Warehouse location:</span>
            <div className="inline-field">
              {warehouseLocation ? warehouseLocation.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Loading medium:</span>
            <div className="inline-field">
              {loadMedium ? loadMedium.value : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Next maintainance date:</span>
            <div className="inline-field">
              {nextMaintenanceDate ? moment(nextMaintenanceDate.value).format('MMM DD YYYY') : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Next inspection date:</span>
            <div className="inline-field">
              {nextInspectionDate ? moment(nextInspectionDate.value).format('MMM DD YYYY') : ''}
            </div>
          </label>
          <label className="flex-default">
            <span>Comment:</span>
            <div className="inline-field">
              {comment ? comment.value : ''}
            </div>
          </label>
        </div>
         { errors ? (<ErrorsDisplay errors={errors} center/>) : null }
        <div className="tank-info-confirm__btns row">
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