
import React, { Component } from 'react';
import moment from 'moment';

import Button from 'app/components/Button/Button';
import TextBox from 'app/components/TextBox/TextBox';
import DateBox from 'app/components/DateBox/DateBox';
import SelectBox from 'app/components/SelectBox/SelectBox';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';
import TankInfoInput from 'app/components/TankInfoInput/container';
import ReservationInput from 'app/components/ReservationInput/container';

import { getFieldError } from 'app/services/error';

import './Edit.css';

export default class OrderEdit extends Component {
  allowToFetch = true
  constructor(props) {
    super(props);
    this.state = {
      orderType: '',
      orderNumber: '',
      
      salespersonName: '',
      salespersonPhone: '',
      salespersonEmail: '',
      
      customerName: '',
      customerLocation: '',
      customerDeliveryAddress: '',
      customerDetail: '',
      customerWarehouse: '',
      
      deliveryRouteStart: '',
      deliveryRouteDest: '',
      deliveryStartDate: moment(),
      deliveryStartHour: '',
      deliveryStartMinute: '',
      deliveryEndDate: moment(),
      deliveryEndHour: '',
      deliveryEndMinute: '',
      projectTimingStart: moment(),
      projectTimingEnd: moment(),
      
      remarks: '',

      tanks: [],
      reservations: [],

      // Only for logistic order
      driverName: '',
      driverPhone: '',
      driverEmail: '',
      driverCompany: '',
      status: 'PENDING',
    }
    
    this.submit = this.submit.bind(this);
    this.setValue = this.setValue.bind(this);
    this.addNewOption = this.addNewOption.bind(this);
  }

  componentDidMount() {
    const { fetchResource, clean, match, fetchFields } = this.props;
    fetchResource('location');
    clean();
    fetchFields(match.params.id);
  }

  setValue(name, value) {
    this.setState({[name]: value});
  }

  submit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  addNewOption(type, option) {
    this.props.addResource(type, option.value);
  }

  componentDidUpdate() {
    const { fetched, fields, submitted, history } = this.props;
    if (fetched && this.allowToFetch) {
      this.allowToFetch = false;
      this.setState({
        orderType: fields['orderType'] ? fields['orderType'].value : 'LOGISTICS',
        orderNumber: fields['orderNumber'] ? fields['orderNumber'].value : '',
        
        salespersonName: fields['salespersonName'] ? fields['salespersonName'].value : '',
        salespersonPhone: fields['salespersonPhone'] ? fields['salespersonPhone'].value : '',
        salespersonEmail: fields['salespersonEmail'] ? fields['salespersonEmail'].value : '',
        
        customerName: fields['customerName'] ? fields['customerName'].value : '',
        customerLocation: fields['customerLocation'] ? fields['customerLocation'].value : '',
        customerDeliveryAddress: fields['customerDeliveryAddress'] ? fields['customerDeliveryAddress'].value : '',
        customerDetail: fields['customerDetail'] ? fields['customerDetail'].value : '',
        customerWarehouse: fields['customerWarehouse'] ? fields['customerWarehouse'].value : '',
        
        tanks: fields['tanks'] ? fields['tanks'].value : [],
        reservations: fields['reservations'] ? fields['reservations'].value : [],
       
        deliveryRouteStart: fields['deliveryRouteStart'] ? fields['deliveryRouteStart'].value : '',
        deliveryRouteDest: fields['deliveryRouteDest'] ? fields['deliveryRouteDest'].value : '',
        deliveryStartDate: fields['deliveryStartDate'] ? moment(fields['deliveryStartDate'].value) : moment(),
        deliveryEndDate: fields['deliveryEndDate'] ? moment(fields['deliveryEndDate'].value) : moment(),
        projectTimingStart: fields['projectTimingStart'] ? moment(fields['projectTimingStart'].value) : moment(),
        projectTimingEnd: fields['projectTimingEnd'] ? moment(fields['projectTimingEnd'].value) : moment(),
        
        remarks: fields['remarks'] ? fields['remarks'].value : '',
  
        // Only for logistic order
        driverName: fields['driverName'] ? fields['driverName'].value : '',
        driverPhone: fields['driverPhone'] ? fields['driverPhone'].value : '',
        driverEmail: fields['driverEmail'] ? fields['driverEmail'].value : '',
        driverCompany: fields['driverCompany'] ? fields['driverCompany'].value : '',
        deliveryStartHour: fields['deliveryStartHour'] ? fields['deliveryStartHour'].value : '',
        deliveryStartMinute: fields['deliveryStartMinute'] ? fields['deliveryStartMinute'].value : '',
        deliveryEndHour: fields['deliveryEndHour'] ? fields['deliveryEndHour'].value : '',
        deliveryEndMinute: fields['deliveryEndMinute'] ? fields['deliveryEndMinute'].value : '',

        status: fields['status'] ? fields['status'].value : '',
        id: fields['id'] ? fields['id'].value : '',
      })
    }

    // After validation => using validated format => {}
    if (submitted) history.push(`/order/detail/${fields['id'].value}`);
  }

  render() {
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

      // Only for logistic order
      driverName,
      driverPhone,
      driverEmail,
      driverCompany,
      status,
    } = this.state;

    const {
      locationResource,
      inProgress,
      errors,
      fetchErrors,
      fields,
      match,
    } = this.props;

    return (
      <div className="create-order-detail container">
        <h1 className="main-title">Edit #{match.params.id}</h1>
        { fetchErrors ? (
          <ErrorsDisplay errors={fetchErrors} center/>
        ) : (
          <form onSubmit={this.submit} className="create-order-detail__form">
            <label className="flex-default">
              <span>Type of order:</span>
              <div className="inline-field">
                <SelectBox
                  options={[
                    {value: 'LOGISTICS', label: 'Logistics'},
                    {value: 'RENTAL', label: 'Rental'},
                    {value: 'OWN_USE', label: 'Own use'}
                  ]}
                  placeholder="Type of order"
                  onChange={this.setValue}
                  name="orderType"
                  value={orderType}
                  allowCreate
                  onNewOption={this.addNewOption}
                />
                {getFieldError(fields, 'orderType')}
              </div>
            </label>
            <label className="flex-default">
              <span>Order number:</span>
              <div className="inline-field">
                <TextBox
                  name="orderNumber"
                  onChange={this.setValue}
                  placeholder="Order number"
                  value={orderNumber}/>
                {getFieldError(fields, 'orderNumber')}
              </div>
            </label>
            <label className="flex-default">
              <span>Status</span>
              <div className="inline-field">
                <SelectBox
                  options={[
                    { value: 'PENDING', label: 'PENDING' },
                    { value: 'COMPLETED', label: 'COMPLETED' },
                    { value: 'CANCELED', label: 'CANCELED' },
                  ]}
                  placeholder="Status"
                  onChange={this.setValue}
                  name="status"
                  value={status}
                />
                {getFieldError(fields, 'status')}
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
                      placeholder="Phone"
                      value={salespersonPhone}/>
                    {getFieldError(fields, 'salespersonPhone')}
                  </label>
                  <label className="col-4 inline-field__col">
                    <TextBox
                      name="salespersonEmail"
                      onChange={this.setValue}
                      placeholder="Email"
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
                      type="location"
                      options={locationResource.list}
                      placeholder="Location"
                      onChange={this.setValue}
                      name="customerLocation"
                      value={customerLocation}
                      allowCreate
                      onNewOption={this.addNewOption}
                    />
                    {getFieldError(fields, 'customerLocation')}
                    <LoadingIndicator onDuty={locationResource.fetching} overlay mini noText/>
                    {locationResource.errors ? <ErrorsDisplay errors={locationResource.errors}/> :  null}
                  </label>
                </div>
                <div className="row" style={{ marginTop: '12px' }}>
                  <label className="col-6 inline-field__col inline-field__col--left">
                    <TextBox
                      name="customerDeliveryAddress"
                      onChange={this.setValue}
                      placeholder="Delivery Address/ POD"
                      value={customerDeliveryAddress}/>
                    {getFieldError(fields, 'customerDeliveryAddress')}
                  </label>
                  <label className="col-6 inline-field__col inline-field__col--right">
                    <TextBox
                      name="customerDetail"
                      onChange={this.setValue}
                      placeholder="Additional details"
                      value={customerDetail}/>
                    {getFieldError(fields, 'customerDetail')}
                  </label>
                </div>
                <div className="row" style={{ marginTop: '12px' }}>
                  <label className="col-12 inline-field__col">
                    <SelectBox
                      type="location"
                      options={locationResource.list}
                      placeholder="Warehouse location"
                      onChange={this.setValue}
                      name="customerWarehouse"
                      value={customerWarehouse}
                      allowCreate
                      onNewOption={this.addNewOption}
                    />
                    {getFieldError(fields, 'customerWarehouse')}
                    <LoadingIndicator onDuty={locationResource.fetching} overlay mini noText/>
                    {locationResource.errors ? <ErrorsDisplay errors={locationResource.errors}/> :  null}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-default">
              <span>Tank info:</span>
              <div className="inline-field">
                <TankInfoInput name="tanks" onChange={this.setValue} value={tanks} needToFetch/>
                {getFieldError(fields, 'tanks')}
              </div>
            </div>
            <div className="flex-default">
              <span>Reservation:</span>
              <div className="inline-field">
                <ReservationInput name="reservations" onChange={this.setValue} value={reservations} needToFetch/>
                {getFieldError(fields, 'reservations')}
              </div>
            </div>
            {(orderType === 'LOGISTICS') ? (
                <div className="flex-default">
                <span>Driver info:</span>
                <div className="inline-field">
                  <div className="row">
                    <label className="col-6 inline-field__col inline-field__col--left">
                      <TextBox
                        name="driverName"
                        onChange={this.setValue}
                        placeholder="Driver Name"
                        value={driverName}/>
                      {getFieldError(fields, 'driverName')}
                    </label>
                    <label className="col-6 inline-field__col inline-field__col--right">
                      <TextBox
                        type="phone"
                        name="driverPhone"
                        onChange={this.setValue}
                        placeholder="Phone"
                        value={driverPhone}/>
                      {getFieldError(fields, 'driverPhone')}
                    </label>
                  </div>
                  <div className="row" style={{ marginTop: '12px' }}>
                    <label className="col-6 inline-field__col inline-field__col--left">
                      <TextBox
                        type="email"
                        name="driverEmail"
                        onChange={this.setValue}
                        placeholder="Email"
                        value={driverEmail}/>
                      {getFieldError(fields, 'driverEmail')}
                    </label>
                    <label className="col-6 inline-field__col inline-field__col--right">
                      <TextBox
                        name="driverCompany"
                        onChange={this.setValue}
                        placeholder="Company"
                        value={driverCompany}/>
                      {getFieldError(fields, 'driverCompany')}
                    </label>
                  </div>
                </div>
              </div>
            ) : null }
            <div className="flex-default">
              <span>Delivery route:</span>
              <div className="inline-field">
                <div className="row">
                  <label className="col-6 inline-field__col inline-field__col--left">
                    <TextBox
                      name="deliveryRouteStart"
                      onChange={this.setValue}
                      placeholder="Starting point"
                      value={deliveryRouteStart}/>
                    {getFieldError(fields, 'deliveryRouteStart')}
                  </label>
                  <label className="col-6 inline-field__col inline-field__col--right">
                    <TextBox
                      name="deliveryRouteDest"
                      onChange={this.setValue}
                      placeholder="Destination"
                      value={deliveryRouteDest}/>
                    {getFieldError(fields, 'deliveryRouteDest')}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-default">
              <span>Delivery time:</span>
              {(orderType === 'LOGISTICS') ? (
                <div className="inline-field">
                  <div className="row">
                    <div className="col-6 inline-field__col inline-field__col--left">
                      <div className="row">
                        <label className="col-6 inline-field__col">
                          <DateBox
                            className="inline-field"
                            name="deliveryStartDate"
                            onChange={this.setValue}
                            placeholder="Date"
                            fallbackValue={null}
                            value={deliveryStartDate}/>
                          {getFieldError(fields, 'deliveryStartDate')}
                        </label>
                        <label className="col-3 inline-field__col inline-field__col--3-mid">
                          <TextBox
                            name="deliveryStartHour"
                            onChange={this.setValue}
                            placeholder="Hour"
                            value={deliveryStartHour}/>
                          {getFieldError(fields, 'deliveryStartHour')}
                        </label>
                        <label className="col-3 inline-field__col">
                          <TextBox
                            name="deliveryStartMinute"
                            onChange={this.setValue}
                            placeholder="Minute"
                            value={deliveryStartMinute}/>
                          {getFieldError(fields, 'deliveryStartMinute')}
                        </label>
                      </div>
                    </div>
                    <div className="col-6 inline-field__col inline-field__col--right">
                      <div className="row">
                        <label className="col-6 inline-field__col">
                          <DateBox
                            className="inline-field"
                            name="deliveryEndDate"
                            onChange={this.setValue}
                            placeholder="Date"
                            fallbackValue={null}
                            value={deliveryEndDate}/>
                          {getFieldError(fields, 'deliveryEndDate')}
                        </label>
                        <label className="col-3 inline-field__col inline-field__col--3-mid">
                          <TextBox
                            name="deliveryEndHour"
                            onChange={this.setValue}
                            placeholder="Hour"
                            value={deliveryEndHour}/>
                          {getFieldError(fields, 'deliveryEndHour')}
                        </label>
                        <label className="col-3 inline-field__col">
                          <TextBox
                            name="deliveryEndMinute"
                            onChange={this.setValue}
                            placeholder="Destination"
                            value={deliveryEndMinute}/>
                          {getFieldError(fields, 'deliveryEndMinute')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inline-field">
                  <div className="row">
                    <label className="col-6 inline-field__col inline-field__col--left">
                      <DateBox
                        className="inline-field"
                        name="deliveryStartDate"
                        onChange={this.setValue}
                        placeholder="Start"
                        fallbackValue={null}
                        value={deliveryStartDate}/>
                      {getFieldError(fields, 'deliveryStartDate')}
                    </label>
                    <label className="col-6 inline-field__col inline-field__col--right">
                      <DateBox
                        className="inline-field"
                        name="deliveryEndDate"
                        onChange={this.setValue}
                        placeholder="End"
                        fallbackValue={null}
                        value={deliveryEndDate}/>
                      {getFieldError(fields, 'deliveryEndDate')}
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-default">
              <span>Project timing:</span>
              <div className="inline-field">
                <div className="row">
                  <label className="col-6 inline-field__col inline-field__col--left">
                    <DateBox
                      className="inline-field"
                      name="projectTimingStart"
                      onChange={this.setValue}
                      placeholder="Start"
                      fallbackValue={null}
                      value={projectTimingStart}/>
                    {getFieldError(fields, 'projectTimingStart')}
                  </label>
                  <label className="col-6 inline-field__col inline-field__col--right">
                    <DateBox
                      className="inline-field"
                      name="projectTimingEnd"
                      onChange={this.setValue}
                      placeholder="End"
                      fallbackValue={null}
                      value={projectTimingEnd}/>
                    {getFieldError(fields, 'projectTimingEnd')}
                  </label>
                </div>
              </div>
            </div>
            <label className="flex-default">
              <span>Remarks:</span>
              <TextBox
                className="inline-field"
                name="remarks"
                onChange={this.setValue}
                placeholder="Remarks"
                multiline
                value={remarks}/>
              {getFieldError(fields, 'remarks')}
            </label>
            <ErrorsDisplay errors={errors} center/>
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
        <LoadingIndicator onDuty={inProgress}/>
      </div>
    )
  }
}