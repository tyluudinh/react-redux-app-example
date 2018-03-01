import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/md/add';
import TrashIcon from 'react-icons/lib/fa/trash';
import moment from 'moment';

import Popup from 'app/components/Popup/Popup';
import TextBox from 'app/components/TextBox/TextBox';
import SelectBox from 'app/components/SelectBox/SelectBox';
import Button from 'app/components/Button/Button';
import Table from 'app/components/Table/Table';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './ReservationInput.css';

export default class ReservationInfoInput extends Component {
  fetched = true
  sendOutNextUpdate = false
  fetchedReservationsCount = 0
  constructor(props) {
    super(props);
    const { value } = props;
    
    this.state = {
      reservationNumber: '',
      salespersonName: '',
      reservationType: '',
      customerName: '',
      remarks: moment(),

      reservationTypeOptions: [
        { value: 'LOGISTICS', label: 'Logistics' },
        { value: 'RENTAL', label: 'Rental' },
        { value: 'OWN_USE', label: 'Own use' },
      ],

      selectedReservations: value ? this.wrapInitReservationsValue(value) : {},
      removedReservations: {},
    }

    this.whoReservationSelectPopup = this.whoReservationSelectPopup.bind(this);
    this.setValue = this.setValue.bind(this);
    this.sendOutSelectedReservations = this.sendOutSelectedReservations.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.search = this.search.bind(this);
    this.mergeFetcedReservations = this.mergeFetcedReservations.bind(this);
  }

  componentDidMount() {
    const { clean, fetchResource, needToFetch } = this.props;
    clean();
    fetchResource("gasType");
    fetchResource("location");
    if (needToFetch) this.fetched = false;
    
  }

  checkReservationsToFetch() {
    const { value, fetchReservation } = this.props;
    if (Array.isArray(value) && value.length) {
      const len = value.length;
      for (let i = 0; i < len; i++) {
        fetchReservation(value[i]);
      }
      this.fetched = true;
    }
  }

  wrapInitReservationsValue(reservations) {
    const wrappedReservations = {};
    if (Array.isArray(reservations)) {
      for (let i = 0, len = reservations.length; i < len; i++) {
        const reservation = reservations[i];
        wrappedReservations[reservation.id] = {
          data: reservation,
          inProgress: false,
          errors: null,
        }
      }
    } else if (typeof reservations === 'object') {
      for (let key in reservations) {
        wrappedReservations[key] = {
          value: reservations[key],
          inProgress: false,
          errors: null,
        }
      }
    }
    return wrappedReservations;
  }

  hidePopup(e) {
    e && e.preventDefault();
    (this.popup) && this.popup.hide();
  }

  whoReservationSelectPopup() {
    this.popup.show();
  }

  setValue(name, value) {
    this.setState({ [name]: value })
  }

  reservationClick(item) {
    const data = item.original;
    const { id, status } = data;
    const { selectedReservations, removedReservations } = this.state;
    if (status === 'ACTIVE' || !!selectedReservations[id] || !!removedReservations[id]) {
      const newSelected = {...selectedReservations};
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = {
          inProgress: false,
          errors: null,
          data
        };      
      }
      this.setState({ selectedReservations: newSelected });
    }
  }

  search(e) {
    e.preventDefault();
    const { reservationNumber, customerName, salespersonName, type } = this.state;
    this.props.search({
      q: reservationNumber,
      type,
      cus_name: customerName,
      sale_name: salespersonName,
    });
  }

  sendOutSelectedReservations(e) {
    e && e.preventDefault();
    const { selectedReservations } = this.state;
    const reservationsArray = [];
    for (let key in selectedReservations) {
      reservationsArray.push(selectedReservations[key].data)
    }
    console.log('send out', this.props.name, reservationsArray);
    this.props.onChange(this.props.name, reservationsArray);
    this.hidePopup(e);
  }

  removeReservation(id) {
    return (e) => {
      const newSelected = {...this.state.selectedReservations};
      delete newSelected[id];
      this.setState({ 
        selectedReservations: newSelected,
        removedReservations: {...this.state.removedReservations, [id]: true }
      });
      this.sendOutNextUpdate = true;
    }
  }

  _renderSelectedReservations() {
    const { selectedReservations } = this.state;
    const reservationList = [];
    for (let key in selectedReservations) {
      const reservation = selectedReservations[key].data;
      (reservation) && reservationList.push(
        <li key={reservation.reservationNumber}>
          <TrashIcon size={20} className="reservation-input-field__remove-icon" onClick={this.removeReservation(reservation.id)} />
          <a className="highlight" href={`/reservation/detail/${reservation.id}`} target="_blank">{reservation.reservationNumber}</a>
          {` - ${reservation.customerName}`}
          {` - ${reservation.reservationType}`}
        </li>
      )
    }
    return reservationList;
  }
  
  mergeFetcedReservations() {
    const { fetchedReservations, fetchedReservationsCount } = this.props;
    const { selectedReservations } = this.state;
    const newSelectedReservations = {...selectedReservations};
    for (let key in fetchedReservations) {
      if (!fetchedReservations[key].inProgress && !selectedReservations[key]) {
        newSelectedReservations[key] = fetchedReservations[key]
      }
    }
    // Use to send out the value on the next update (wait for setstate to complete);
    this.sendOutNextUpdate = true;
    this.fetchedReservationsCount = fetchedReservationsCount;
    this.setState({
      selectedReservations: newSelectedReservations
    })
    this.sendOutSelectedReservations();
  }

  componentDidUpdate() {
    if (!this.fetched) this.checkReservationsToFetch();
    if (this.props.fetchedReservationsCount > this.fetchedReservationsCount) {
      this.mergeFetcedReservations()
    } else if (this.sendOutNextUpdate) {
      this.sendOutSelectedReservations();
      this.sendOutNextUpdate = false;
    }
  }

  render() {
    const reservationInfoInput = this;
    const {
      reservationNumber,
      salespersonName,
      reservationType,
      customerName,

      reservationTypeOptions,
      selectedReservations,
      removedReservations,
    } = this.state;

    const {
      inProgress,
      errors,
      list,
    } = this.props;

    const searchResultColumns = [
      {
        Header: '',
        accessor: 'id',
        width: 40,
        Cell: (data) => {
          const id = data.value;
          return (
            (data.original.status === 'ACTIVE' || !!selectedReservations[id] || removedReservations[id]) ? (
              <input type="checkbox" readOnly checked={!!selectedReservations[id]}/>
            ) : null
          )
        }
      },
      {
        Header: 'RESERVATION NUMBER',
        accessor: 'reservationNumber'
      },
      {
        Header: 'SALESPERSON NAME',
        accessor: 'salespersonName'
      },
      {
        Header: 'TYPE OF RESERVATION',
        accessor: 'reservationType'
      },
      {
        Header: 'CUSTOMER NAME',
        accessor: 'customerName'
      },
      {
        Header: 'STATUS',
        accessor: 'status'
      },

      {
        Header: 'REMARKS',
        accessor: 'remarks'
      },
    ]

    return (
      <div className="reservation-input">
        <div className="reservation-input-field">
          <div className="reservation-input-field__add-new" onClick={this.whoReservationSelectPopup}>
            <ul className="reservation-input-field__selected-list">
              {this._renderSelectedReservations()}
            </ul>
            <PlusIcon className="reservation-input-field__add-icon" size={20} />
            <span>Add reservations</span>
          </div>
        </div>
        <div className="reservation-search-popup">
          <Popup
            bigOne
            ref={(ref) => {this.popup = ref}}>
            <div className="reservation-search-popup__inner">
              <div className="reservation-search-popup__form">
                <div className="flex-default">
                  <span>Reservation info:</span>
                  <div className="inline-field">
                    <div className="row">
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <TextBox
                          name="reservationNumber"
                          placeholder="Reservation number"
                          onChange={this.setValue}
                          fullWidth
                          value={reservationNumber}/>
                      </div>
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <TextBox
                          name="salespersonName"
                          placeholder="Salesperson name"
                          onChange={this.setValue}
                          fullWidth
                          value={salespersonName}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 inline-field__col">
                      <SelectBox
                          name="reservationType"
                          placeholder="Type of reservation"
                          onChange={this.setValue}
                          fullWidth
                          options={reservationTypeOptions}
                          value={reservationType}/>
                      </div>
                      <div className="col-4 inline-field__col inline-field__col--3-mid">
                        <TextBox
                          name="customerName"
                          placeholder="Customer name"
                          onChange={this.setValue}
                          fullWidth
                          value={customerName}/>
                      </div>
                      <div className="col-4 inline-field__col">
                        <Button
                          type="green-reverse"
                          withIcon={{
                            name: 'search',
                            size: 20,
                          }}
                          onClick={this.search}
                          fullWidth>
                          SEARCH
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <LoadingIndicator onDuty={inProgress} text="Searching..." inline/>
              <ErrorsDisplay errors={errors} center/>
              <div className="reservation--popup__result">
                {(list.length) ? (
                  <Table
                    data={list}
                    columns={searchResultColumns}
                    getTdProps={(state, rowInfo) => {
                      return {
                        onClick: (e) => {
                          reservationInfoInput.reservationClick(rowInfo)
                        }
                      }
                    }}
                    pageSize={list.length}/>
                ) : null }
              </div>
              <div className="reservation-search-popup__btns row">
                <div className="col-2"></div>
                <div className="col-4">
                  <Button
                    type="green-reverse"
                    onClick={this.hidePopup}
                    fullWidth>
                    CANCEL
                  </Button>
                </div>
                <div className="col-4">
                  <Button 
                    onClick={this.sendOutSelectedReservations}
                    fullWidth>
                    CONFIRM
                  </Button>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    )
  }
}