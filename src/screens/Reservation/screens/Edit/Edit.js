import React, { Component } from 'react';
import moment from 'moment';

import SelectBox from 'app/components/SelectBox/SelectBox';
import DateBox from 'app/components/DateBox/DateBox';
import TextBox from 'app/components/TextBox/TextBox';
import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';
import TankInfoInput from 'app/components/TankInfoInput/container';

import { getFieldError } from 'app/services/error';

import './Edit.css';

const typeOptions = [
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'RENTAL', label: 'Rental' },
  { value: 'OWN_USE', label: 'Own use' },
]

const statusOptions = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'EXPIRED', label: 'Expired' },
]

export default class reservationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'LOGISTICS',
      reservationNumber: '',
      remarks: '',
      expiredDate: moment(),

      salespersonName: '',
      salespersonPhone: '',
      salespersonEmail: '',

      customerName: '',
      customerLocation: '',
      deliveryAddress: '',
      additionalDetails: '',
      warehouseLocation: '',

      tanks: '',
      allowToFetch: true,      
    }

    this.addNewOption = this.addNewOption.bind(this);
    this.setValue = this.setValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { match, clean, fetchResource, fetchFields } = this.props;
    clean();
    fetchResource('location');
    fetchFields(match.params.id);
  }

  addNewOption(type, option) {
    this.props.addResource(type, option.value);
  }

  setValue(name, value) {
    this.setState({ [name]: value })
  }

  submit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  componentDidUpdate() {
    const { fetched, fields, submitted, history } = this.props;
    if (fetched && this.state.allowToFetch) {
      this.setState({
        // first fetch => raw fields without valited format
        // key: value instead of key: { value: value, errors: [] }
        type: fields['type'] ? fields['type'].value : 'LOGISTICS',
        reservationNumber: fields['reservationNumber'] ? fields['reservationNumber'].value : '',
        remarks: fields['remarks'] ? fields['remarks'].value : '',
        expiredDate: fields['expiredDate'] ? moment(new Date(parseInt(fields['expiredDate'].value, 10))) : moment(),

        salespersonName: fields['salespersonName'] ? fields['salespersonName'].value : '',
        salespersonPhone: fields['salespersonPhone'] ? fields['salespersonPhone'].value : '',
        salespersonEmail: fields['salespersonEmail'] ? fields['salespersonEmail'].value : '',

        customerName: fields['customerName'] ? fields['customerName'].value : '',
        customerLocation: fields['customerLocation'] ? fields['customerLocation'].value : '',
        deliveryAddress: fields['deliveryAddress'] ? fields['deliveryAddress'].value : '',
        additionalDetails: fields['additionalDetails'] ? fields['additionalDetails'].value : '',
        warehouseLocation: fields['warehouseLocation'] ? fields['warehouseLocation'].value : '',

        tanks: fields['tanks'] ? fields['tanks'].value : {},
        id: fields['id'] ? fields['id'].value : '',
        status: fields['status'] ? fields['status'].value : 'UNKNOWN',

        allowToFetch: false,
      })
    }

    // After validation => using validated format => {}
    if (submitted) history.push(`/reservation/detail/${fields['id'].value}`);
  }

  render() {
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
      id,
      status,
    } = this.state;

    const {
      inProgress,
      errors,
      fetchErrors,
      fields,
      locationResource,
    } = this.props;

    return (
      <div className="reservation-edit container">
        <h1 className="main-title">Reservation #{id}</h1>
        { fetchErrors ? (
          <ErrorsDisplay errors={fetchErrors} center/>
        ) : (
          <form onSubmit={this.validate} className="reservation-edit__form">
            <label className="flex-default">
              <span>Type of reservation:</span>
              <div className="inline-field">
                <SelectBox
                  options={typeOptions}
                  placeholder="Type of reservation"
                  onChange={this.setValue}
                  name="type"
                  value={type}
                />
                {getFieldError(fields, 'type')}
              </div>
            </label>
            <label className="flex-default">
              <span>Reservation number:</span>
              <div className="inline-field">
                <TextBox
                  name="reservationNumber"
                  onChange={this.setValue}
                  placeholder="Reservation number"
                  value={reservationNumber}/>
                {getFieldError(fields, 'reservationNumber')}
              </div>
            </label>
            <div className="flex-default">
              <span>Salesperson info:</span>
              <div className="inline-field">
                <div className="row">
                  <label className="col-4 inline-field__col">
                    <TextBox
                      name="salespersonName"
                      onChange={this.setValue}
                      placeholder="Name"
                      value={salespersonName}/>
                    {getFieldError(fields, 'salespersonName')}
                  </label>
                  <label className="col-4 inline-field__col inline-field__col--3-mid">
                    <TextBox
                      type="phone"
                      name="salespersonPhone"
                      onChange={this.setValue}
                      placeholder="Name"
                      value={salespersonPhone}/>
                    {getFieldError(fields, 'salespersonPhone')}
                  </label>
                  <label className="col-4 inline-field__col">
                    <TextBox
                      name="salespersonEmail"
                      onChange={this.setValue}
                      placeholder="Name"
                      value={salespersonEmail}/>
                    {getFieldError(fields, 'salespersonEmail')}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-default">
              <span>Customer info:</span>
              <div className="inline-field">
                <div className="row">
                  <label className="col-6 inline-field__col inline-field__col--left">
                    <TextBox
                      name="customerName"
                      onChange={this.setValue}
                      placeholder="Customer Name"
                      value={customerName}/>
                    {getFieldError(fields, 'customerName')}
                  </label>
                  <label className="col-6 inline-field__col inline-field__col--right">
                    <SelectBox
                      options={locationResource.list}
                      placeholder="Location"
                      onChange={this.setValue}
                      name="customerLocation"
                      value={customerLocation}
                      allowCreate
                      onNewOption={this.addResource}
                    />
                    { locationResource.errors ? <ErrorsDisplay errors={locationResource.errors} /> : null }
                    { locationResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
                    {getFieldError(fields, 'customerLocation')}
                  </label>
                </div>
                <div className="row" style={{ marginTop: '12px' }}>
                  <label className="col-6 inline-field__col inline-field__col--left">
                    <TextBox
                      name="deliveryAddress"
                      onChange={this.setValue}
                      placeholder="Delivery Address/ POD"
                      value={deliveryAddress}/>
                    {getFieldError(fields, 'deliveryAddress')}
                  </label>
                  <label className="col-6 inline-field__col inline-field__col--right">
                    <TextBox
                      name="additionalDetails"
                      onChange={this.setValue}
                      placeholder="Additional details"
                      value={additionalDetails}/>
                    {getFieldError(fields, 'additionalDetails')}
                  </label>
                </div>
                <div className="row" style={{ marginTop: '12px' }}>
                  <label className="col-12 inline-field__col">
                    <SelectBox
                      options={locationResource.list}
                      placeholder="Warehouse location"
                      onChange={this.setValue}
                      name="warehouseLocation"
                      value={warehouseLocation}
                      allowCreate
                      onNewOption={this.addNewOption}
                    />
                    { locationResource.errors ? <ErrorsDisplay errors={locationResource.errors} /> : null }
                    { locationResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
                    {getFieldError(fields, 'warehouseLocation')}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-default">
              <span>Tank info</span>
              <div className="inline-field">
                <TankInfoInput name="tanks" onChange={this.setValue} value={tanks} needToFetch/>
                {getFieldError(fields, 'tanks')}
              </div>
            </div>
            <label className="flex-default">
              <span>Remarks:</span>
              <TextBox
                className="inline-field"
                name="remarks"
                onChange={this.setValue}
                placeholder="Remarks"
                value={remarks}/>
              {getFieldError(fields, 'remarks')}
            </label>
            <label className="flex-default">
              <span>Expired date:</span>
              <div className="inline-field">
                <DateBox
                  className="inline-field"
                  name="expiredDate"
                  onChange={this.setValue}
                  placeholder="Expired date"
                  fallbackValue={null}
                  value={expiredDate}/>
                {getFieldError(fields, 'expiredDate')}
              </div>
            </label>
            <label className="flex-default">
              <span>Status:</span>
              <div className="inline-field">
                <SelectBox
                  options={statusOptions}
                  placeholder="Status"
                  onChange={this.setValue}
                  name="status"
                  value={status}
                />
                {getFieldError(fields, 'status')}
              </div>
            </label>
            <ErrorsDisplay errors={errors} center/>
            <div className="center">
              <Button
                className="reservation-edit__submit"
                minPadding
                onClick={this.submit}>
                CONFIRM
              </Button>
            </div>
          </form>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}