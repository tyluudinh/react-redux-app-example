import React, { Component } from "react";
import moment from 'moment';

import Button from "app/components/Button/Button";
import TextBox from "app/components/TextBox/TextBox";
import DateBox from "app/components/DateBox/DateBox";
import SelectBox from "app/components/SelectBox/SelectBox";
import RadioGroup from "app/components/RadioGroup/RadioGroup";
import LoadingIndicator from "app/components/LoadingIndicator/LoadingIndicator";
import ErrorsDisplay from "app/components/ErrorsDisplay/ErrorsDisplay";

import { getFieldError } from 'app/services/error';

import "./CreateForm.css";

export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    const { fields } = props;

    this.state = {
      serialNumber: fields['serialNumber'] ? fields['serialNumber'].value : "",
      type: fields['type'] ? fields['type'].value : "",
      appliedRegulations: fields['appliedRegulations'] ? fields['appliedRegulations'].value : "",
      manufacturedDate: fields['manufacturedDate'] ? moment(fields['manufacturedDate'].value) : moment(),
      manufacturer: fields['manufacturer'] ? fields['manufacturer'].value : "",
      capacity: fields['capacity'] ? fields['capacity'].value : "",
      workingPressure: fields['workingPressure'] ? fields['workingPressure'].value : "",
      tareWeight: fields['tareWeight'] ? fields['tareWeight'].value : "",
      lastCarriedGas: fields['lastCarriedGas'] ? fields['lastCarriedGas'].value : "",
      airPressure: fields['airPressure'] ? fields['airPressure'].value : "",
      vacuumReading: fields['vacuumReading'] ? fields['vacuumReading'].value : "",
      location: fields['location'] ? fields['location'].value : "",
      warehouseLocation: fields['warehouseLocation'] ? fields['warehouseLocation'].value : "",
      loadMedium: fields['loadMedium'] ? fields['loadMedium'].value : "",
      nextMaintenanceDate: fields['nextMaintenanceDate'] ? moment(fields['nextMaintenanceDate'].value) : moment(),
      nextInspectionDate: fields['nextInspectionDate'] ? moment(fields['nextInspectionDate'].value) : moment(),
      comment: fields['comment'] ? fields['comment'].value : "",
    };

    this.addNewOption = this.addNewOption.bind(this);
    this.submit = this.submit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    const { fetchResource } = this.props;
    fetchResource("type");
    fetchResource("gasType");
    fetchResource("location");
    fetchResource("loadMedium");
    this.props.clean();
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  addNewOption(type, option) {
    this.props.addResource(type, option.value);
  }

  submit(e) {
    e.preventDefault();
    this.props.validateForm({
      ...this.state
    });
  }
  
  submitPass() {
    this.props.history.push(`${this.props.basePath}/confirm`);
  }

  componentDidUpdate() {
    (this.props.passed) && this.submitPass();
  }

  render() {
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
    } = this.state;

    const {
      gasTypeResource,
      locationResource,
      loadMediumResource,
      inProgress,
      errors,
      fields,
    } = this.props;

    return (
      <div className="tank-info-create container">
        <h1 className="main-title">Create tank info</h1>
        <form onSubmit={this.submit} className="tank-info-create__form">
          <label className="flex-default">
            <span>Tank serial number:</span>
            <div className="inline-field">
              <TextBox
                name="serialNumber"
                onChange={this.setValue}
                placeholder="Eg. BNFUXXXXXX"
                value={serialNumber}
                fullWidth/>
              {getFieldError(fields, 'serialNumber')}
            </div>
          </label>
          <label className="flex-default">
            <span>Type of tank:</span>
            <div className="inline-field">
              <SelectBox
                type="type"
                options={[
                  { value: 'T75 - LNG', label: 'T75 - LNG' },
                  { value: 'T75 - LCO2', label:  'T75 - LCO2' },
                  { value: 'T75 - LIN', label: 'T75 - LIN' },
                  { value: 'T50 - R22', label:  'T50 - R22' },
                  { value: 'T50 - R32', label: 'T50 - R32' },
                  { value: 'T75 - LNG/LCO2', label: 'T75 - LNG/LCO2' },
                ]}
                placeholder="Type of tank"
                onChange={this.setValue}
                name="type"
                value={type}
              />
              { getFieldError(fields, 'type') }
            </div>
          </label>
          <label className="flex-default">
            <span>Applied regulation:</span>
            <div className="inline-field">
              <RadioGroup
                name="appliedRegulations"
                onChange={this.setValue}
                value={appliedRegulations}
                options={[
                  { value: "IMDG", label: "IMDG" },
                  { value: "ADR_RID", label: "ADR/RID" },
                  { value: "CSC", label: "CSC" },
                  { value: "US_DOT", label: "US DOT" },
                  { value: "TC", label: "TC" }
                ]}
              />
              { getFieldError(fields, 'appliedRegulations') }
            </div>
          </label>
          <label className="flex-default">
            <span>Manufactured date:</span>
            <div className="inline-field">
              <DateBox
                name="manufacturedDate"
                onChange={this.setValue}
                placeholder="Manufactured date"
                fallbackValue={null}
                value={manufacturedDate}
              />
              { getFieldError(fields, 'manufacturedDate') }
            </div>
          </label>
          <label className="flex-default">
            <span>Manufacturer:</span>
            <div className="inline-field">
              <TextBox
                name="manufacturer"
                onChange={this.setValue}
                placeholder="Manufacturer"
                value={manufacturer}
              />
              { getFieldError(fields, 'manufacturer') }
            </div>
          </label>
          <label className="flex-default">
            <span>Capacity:</span>
            <div className="inline-field">
              <TextBox
                name="capacity"
                onChange={this.setValue}
                placeholder="Capacity"
                value={capacity}
              />
              { getFieldError(fields, 'capacity') }
            </div>
          </label>
          <label className="flex-default">
            <span>Working pressure:</span>
            <div className="inline-field">
              <TextBox
                name="workingPressure"
                onChange={this.setValue}
                placeholder="Working pressure"
                value={workingPressure}
              />
              { getFieldError(fields, 'workingPressure') }
            </div>
          </label>
          <label className="flex-default">
            <span>Tare weight:</span>
            <div className="inline-field">
              <TextBox
                name="tareWeight"
                onChange={this.setValue}
                placeholder="Tare weight"
                value={tareWeight}
              />
              { getFieldError(fields, 'tareWeight') }
            </div>
          </label>
          <label className="flex-default">
            <span>Last carried gas:</span>
            <div className="inline-field">
              <SelectBox
                type="gasType"
                options={gasTypeResource.list}
                placeholder="Last carried gas"
                onChange={this.setValue}
                name="lastCarriedGas"
                value={lastCarriedGas}
                allowCreate
                passive
                noArrow
                onNewOption={this.addNewOption}
              />
              { gasTypeResource.errors ? <ErrorsDisplay errors={gasTypeResource.errors} /> : null }
              { gasTypeResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
              { getFieldError(fields, 'lastCarriedGas') }
            </div>
          </label>
          <label className="flex-default">
            <span>Air pressure:</span>
            <div className="inline-field">
              <TextBox
                name="airPressure"
                onChange={this.setValue}
                placeholder="Air pressure"
                value={airPressure}
              />
              { getFieldError(fields, 'airPressure') }
            </div>
          </label>
          <label className="flex-default">
            <span>Vacuum reading:</span>
            <div className="inline-field">
              <TextBox
                name="vacuumReading"
                onChange={this.setValue}
                placeholder="Vacuum reading"
                value={vacuumReading}
              />
              { getFieldError(fields, 'vacuumReading') }
            </div>
          </label>
          <label className="flex-default">
            <span>Location:</span>
            <div className="inline-field">
              <SelectBox
                type="location"
                options={locationResource.list}
                placeholder="Location"
                onChange={this.setValue}
                name="location"
                value={location}
                allowCreate
                passive
                noArrow
                onNewOption={this.addNewOption}
              />
              { locationResource.errors ? <ErrorsDisplay errors={locationResource.errors} /> : null }
              { locationResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
              { getFieldError(fields, 'Location') }
            </div>
          </label>
          <label className="flex-default">
            <span>Warehouse location:</span>
            <div className="inline-field">
              <SelectBox
                type="location"
                options={locationResource.list}
                placeholder="Warehouse location"
                onChange={this.setValue}
                name="warehouseLocation"
                value={warehouseLocation}
                allowCreate
                passive
                noArrow
                onNewOption={this.addNewOption}
              />
              { locationResource.errors ? <ErrorsDisplay errors={locationResource.errors} /> : null }
              { locationResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
              { getFieldError(fields, 'warehouseLocation') }
            </div>
          </label>
          <label className="flex-default">
            <span>Loading medium:</span>
            <div className="inline-field">
              <SelectBox
                type="loadMedium"
                options={loadMediumResource.list}
                placeholder="Loading medium"
                onChange={this.setValue}
                name="loadMedium"
                value={loadMedium}
                allowCreate
                passive
                noArrow
                onNewOption={this.addNewOption}
              />
              { loadMediumResource.errors ? <ErrorsDisplay errors={loadMediumResource.errors} /> : null }
              { loadMediumResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
              { getFieldError(fields, 'loadMedium') }
            </div>
          </label>
          <label className="flex-default">
            <span>Next maintainance date:</span>
            <div className="inline-field">
              <DateBox
                name="nextMaintenanceDate"
                onChange={this.setValue}
                placeholder="Next maintainance date"
                fallbackValue={null}
                value={nextMaintenanceDate}
              />
              { getFieldError(fields, 'nextMaintenanceDate') }
            </div>
          </label>
          <label className="flex-default">
            <span>Next inspection date:</span>
            <div className="inline-field">
              <DateBox
                name="nextInspectionDate"
                onChange={this.setValue}
                placeholder="Next inspection date"
                value={nextInspectionDate}
              />
              { getFieldError(fields, 'nextInspectionDate') }
            </div>
          </label>
          <label className="flex-default">
            <span>Comment:</span>
            <div className="inline-field">
              <TextBox
                name="comment"
                multiline
                onChange={this.setValue}
                placeholder="Comment"
                value={comment}
              />
              { getFieldError(fields, 'comment') }
            </div>
          </label>
          {errors ? (
            <ErrorsDisplay center errors={errors} />
          ) : null}
          <div className="center">
            <Button onClick={this.submit} className="submit-btn" minPadding>
              CONFIRM
            </Button>
          </div>
        </form>
        <LoadingIndicator onDuty={inProgress} />
      </div>
    );
  }
}
