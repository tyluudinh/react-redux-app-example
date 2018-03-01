import React, { Component } from "react";
import moment from 'moment';

import Button from "app/components/Button/Button";
import TextBox from "app/components/TextBox/TextBox";
import DateBox from "app/components/DateBox/DateBox";
import SelectBox from "app/components/SelectBox/SelectBox";
import RadioGroup from "app/components/RadioGroup/RadioGroup";
import LoadingIndicator from "app/components/LoadingIndicator/LoadingIndicator";
import ErrorsDisplay from "app/components/ErrorsDisplay/ErrorsDisplay";

import "./Edit.css";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serialNumber: "",
      type: "",
      appliedRegulations: "",
      manufacturedDate: moment(),
      manufacturer: "",
      capacity: "",
      workingPressure: "",
      tareWeight: "",
      lastCarriedGas: "",
      airPressure: "",
      vacuumReading: "",
      location: "",
      warehouseLocation: "",
      loadMedium: "",
      nextMaintenanceDate: moment(),
      nextInspectionDate: moment(),
      comment: "",

      status: "",
      taggedOrder: "",

      allowToFetch: true,
    };

    this.addNewOption = this.addNewOption.bind(this);
    this.submit = this.submit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    const { fetchResource, fetchFields, match } = this.props;
    fetchResource("type");
    fetchResource("gasType");
    fetchResource("location");
    fetchResource("loadMedium");
    this.props.clean();
    fetchFields(match.params.id);
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
  
  componentDidUpdate() {
    const { fetched, fields, submitted, history } = this.props;
    (fetched && this.state.allowToFetch) && this.setState({
      // first fetch => raw fields without valited format
      // key: value instead of key: { value: value, errors: [] }
      id: (fields && fields['id']) ? fields['id'].value : "",
      serialNumber: (fields && fields['serialNumber']) ? fields['serialNumber'].value : "",
      type: (fields && fields['type']) ? fields['type'].value : "",
      appliedRegulations: (fields && fields['appliedRegulations']) ? fields['appliedRegulations'].value : "",
      manufacturedDate: (fields && fields['manufacturedDate']) ? moment(parseInt(fields['manufacturedDate'].value, 10)) : moment(),
      manufacturer: (fields && fields['manufacturer']) ? fields['manufacturer'].value : "",
      capacity: (fields && fields['capacity']) ? fields['capacity'].value : "",
      workingPressure: (fields && fields['workingPressure']) ? fields['workingPressure'].value : "",
      tareWeight: (fields && fields['tareWeight']) ? fields['tareWeight'].value : "",
      lastCarriedGas: (fields && fields['lastCarriedGas']) ? fields['lastCarriedGas'].value : "",
      airPressure: (fields && fields['airPressure']) ? fields['airPressure'].value : "",
      vacuumReading: (fields && fields['vacuumReading']) ? fields['vacuumReading'].value : "",
      location: (fields && fields['location']) ? fields['location'].value : "",
      warehouseLocation: (fields && fields['warehouseLocation']) ? fields['warehouseLocation'].value : "",
      loadMedium: (fields && fields['loadMedium']) ? fields['loadMedium'].value : "",
      nextMaintenanceDate: (fields && fields['nextMaintenanceDate']) ? moment(parseInt(fields['nextMaintenanceDate'].value, 10)) : moment(),
      nextInspectionDate: (fields && fields['nextInspectionDate']) ? moment(parseInt(fields['nextInspectionDate'].value, 10)) : moment(),
      comment: (fields && fields['comment']) ? fields['comment'].value : "",
      
      status: (fields && fields['status']) ? fields['status'].value : "UNKNOWN",

      allowToFetch: false,
    })
    // After validation => using validated format => {}
    if (submitted) history.push(`/tank/detail/${fields['id'].value}`);
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
      status,
      taggedOrder,
    } = this.state;

    const {
      typeResource,
      gasTypeResource,
      locationResource,
      loadMediumResource,
      inProgress,
      errors,
      fetchErrors,
      fields,
      match,
    } = this.props;

    function getFieldError(key) {
      if (fields && fields[key] && fields[key].errors && fields[key].errors.length) {
        return (
          <ErrorsDisplay errors={fields[key].errors} />
        )
      }
      return null;
    }
    return (
      <div className="tank-info-edit container">
        <h1 className="main-title">Tank info #{ match.params.id }</h1>
        { fetchErrors ? (
          <ErrorsDisplay center errors={fetchErrors}/>
        ) : (
          <form onSubmit={this.submit} className="tank-info-edit__form">
            <label className="flex-default">
              <span>Tank serial number:</span>
              <div className="inline-field">
                <TextBox
                  name="serialNumber"
                  onChange={this.setValue}
                  placeholder="Tank info number"
                  value={serialNumber}
                  fullWidth/>
                {getFieldError('serialNumber')}
              </div>
            </label>
            <label className="flex-default">
              <span>Type of tank:</span>
              <div className="inline-field">
                <SelectBox
                  type="type"
                  options={typeResource.list}
                  placeholder="Type of tank"
                  onChange={this.setValue}
                  name="type"
                  value={type}
                  allowCreate
                  passive
                  noArrow
                  onNewOption={this.addNewOption}
                />
                { typeResource.errors ? <ErrorsDisplay errors={typeResource.errors} /> : null }
                { typeResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
                { getFieldError('type') }
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
                { getFieldError('appliedRegulations') }
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
                { getFieldError('manufacturedDate') }
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
                { getFieldError('manufacturer') }
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
                { getFieldError('capacity') }
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
                { getFieldError('workingPressure') }
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
                { getFieldError('tareWeight') }
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
                { getFieldError('lastCarriedGas') }
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
                { getFieldError('airPressure') }
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
                { getFieldError('vacuumReading') }
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
                { getFieldError('Location') }
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
                { getFieldError('warehouseLocation') }
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
                { getFieldError('loadMedium') }
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
                { getFieldError('nextMaintenanceDate') }
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
                { getFieldError('nextInspectionDate') }
              </div>
            </label>
            <label className="flex-default">
              <span>Status:</span>
              <div className="inline-field">
                <SelectBox
                  type="status"
                  options={[
                    { value: 'UNAVAILABLE', label: 'UNAVAILABLE' },
                    { value: 'AVAILABLE', label: 'AVAILABLE' },
                    { value: 'RESERVED', label: 'RESERVED' },
                  ]}
                  placeholder="Status"
                  onChange={this.setValue}
                  name="status"
                  value={status}
                />
                { getFieldError('status') }
              </div>
            </label>
            <label className="flex-default">
              <span>Tagged to order:</span>
              <div className="inline-field">
                <SelectBox
                  type="status"
                  options={[
                    { value: '3423434', label: '3434343434' },
                  ]}
                  placeholder="Tagged to order"
                  onChange={this.setValue}
                  name="taggedOrder"
                  value={taggedOrder}
                />
                { getFieldError('taggedOrder') }
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
                { getFieldError('comment') }
              </div>
            </label>
            {errors ? (
              <ErrorsDisplay center errors={errors} />
            ) : null}
            <div className="center">
              <Button 
                className="submit-btn" 
                minPadding
                onClick={this.submit}>
                CONFIRM
              </Button>
            </div>
          </form>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>
    );
  }
}
