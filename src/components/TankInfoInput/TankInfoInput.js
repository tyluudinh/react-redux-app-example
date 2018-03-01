import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/md/add';
import TrashIcon from 'react-icons/lib/fa/trash';
import moment from 'moment';

import Popup from 'app/components/Popup/Popup';
import TextBox from 'app/components/TextBox/TextBox';
import SelectBox from 'app/components/SelectBox/SelectBox';
import DateBox from 'app/components/DateBox/DateBox';
import Button from 'app/components/Button/Button';
import Table from 'app/components/Table/Table';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './TankInfoInput.css';

export default class TankInfoInput extends Component {
  fetched = true
  fetchedTanksCount = 0
  sendOutNextUpdate = false
  constructor(props) {
    super(props);
    const { value } = props;
    
    this.state = {
      serialNumber: '',
      gasType: '',
      status: '',
      location: '',
      nextInspectionDate: moment(),

      statusOptions: [
        { value: 'AVAILABLE', label: 'AVAILABLE' },
        { value: 'RESERVE', label: 'RESERVE' },
        { value: 'USED', label: 'USED' },
      ],
      selectedTanks: value ? this.wrapInitTanksValue(value) : {},
      removedTanks: {},
    }

    this.whoTankSelectPopup = this.whoTankSelectPopup.bind(this);
    this.setValue = this.setValue.bind(this);
    this.sendOutSelectedTanks = this.sendOutSelectedTanks.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.search = this.search.bind(this);
    this.mergeFetcedTanks = this.mergeFetcedTanks.bind(this);
    this.removeTank = this.removeTank.bind(this);
  }

  componentDidMount() {
    const { clean, fetchResource, needToFetch } = this.props;
    clean();
    fetchResource("gasType");
    fetchResource("location");
    if (needToFetch) this.fetched = false;
    
  }

  checkTanksToFetch() {
    const { value, fetchTank } = this.props;
    if (Array.isArray(value) && value.length) {
      const len = value.length;
      for (let i = 0; i < len; i++) {
        fetchTank(value[i].id ? value[i].id : value[i]);
      }
      this.fetched = true;
    }
  }

  wrapInitTanksValue(tanks) {
    const wrappedTanks = {};
    if (Array.isArray(tanks)) {
      for (let i = 0, len = tanks.length; i < len; i++) {
        const tank = tanks[i];
        wrappedTanks[tank.id] = {
          data: tank,
          inProgress: false,
          errors: null,

          
        }
      }
    } else if (typeof tanks === 'object') {
      for (let key in tanks) {
        wrappedTanks[key] = {
          value: tanks[key],
          inProgress: false,
          errors: null,
        }
      }
    }
    return wrappedTanks;
  }

  hidePopup(e) {
    e && e.preventDefault();
    (this.popup) && this.popup.hide();
  }

  whoTankSelectPopup() {
    this.popup.show();
  }

  setValue(name, value) {
    this.setState({ [name]: value })
  }

  tankClick(item) {
    const data = item.original;
    const { id, status } = data;
    const { selectedTanks, removedTanks } = this.state;
    if (status === 'AVAILABLE' || !!selectedTanks[id] || !!removedTanks[id]) {
      const newSelected = {...selectedTanks};
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = {
          inProgress: false,
          errors: null,
          data
        };      
      }
      this.setState({ selectedTanks: newSelected });
    }
  }

  search(e) {
    e.preventDefault();
    // TODO: Missing gas_type and inspection_date (because error) param, ask backend to support it
    const { location, serialNumber, status } = this.state;
    this.props.search({ 
      q: serialNumber,
      location,
      status
    });
  }

  sendOutSelectedTanks(e) {
    e && e.preventDefault();
    const { selectedTanks } = this.state;
    const tanksArray = [];
    for (let key in selectedTanks) {
      tanksArray.push(selectedTanks[key].data)
    }
    this.props.onChange(this.props.name, tanksArray);
    this.hidePopup(e);
    console.log('SEND OUT', tanksArray);
  }

  removeTank(id) {
    return (e) => {
      const newSelected = {...this.state.selectedTanks};
      delete newSelected[id];
      this.setState({ 
        selectedTanks: newSelected,
        removedTanks: {...this.state.removedTanks, [id]: true }
      });
      this.sendOutNextUpdate = true;
    }
  }

  _renderSelectedTanks() {
    const { selectedTanks } = this.state;
    const tankList = [];
    for (let key in selectedTanks) {
      const tank = selectedTanks[key].data;
      (tank) && tankList.push(
        <li key={tank.serialNumber}>
          <TrashIcon size={20} className="tank-input-field__remove-icon" onClick={this.removeTank(tank.id)} />
          <a className="highlight" href={`/tank/detail/${tank.id}`} target="_blank">
            {tank.serialNumber}</a>
            {` - ${tank.lastCarriedGas}`}
            {` - ${tank.vacuumReading}`}
            {` - ${tank.location}`}
            {` - ${moment(tank.nextInspectionDate).format('DD MMM YYYY')}`}
        </li>
      )
    }
    return tankList;
  }
  
  mergeFetcedTanks() {
    const { fetchedTanks, fetchedTanksCount } = this.props;
    const { selectedTanks } = this.state;
    const newSelectedTanks = {...selectedTanks};
    for (let key in fetchedTanks) {
      if (!fetchedTanks[key].inProgress && !selectedTanks[key]) {
        newSelectedTanks[key] = fetchedTanks[key]
      }
    }
    this.sendOutNextUpdate = true;
    this.fetchedTanksCount = fetchedTanksCount;
    this.setState({
      selectedTanks: newSelectedTanks
    })
    this.sendOutSelectedTanks();
  }

  componentDidUpdate() {
    if (!this.fetched) this.checkTanksToFetch();
    if (this.props.fetchedTanksCount > this.fetchedTanksCount) {
      this.mergeFetcedTanks();
    } else if (this.sendOutNextUpdate) {
      this.sendOutSelectedTanks();
      this.sendOutNextUpdate = false; 
    }
  }

  render() {
    const tankInfoInput = this;
    const {
      serialNumber,
      gasType,
      status,
      location,
      nextInspectionDate,

      statusOptions,
      selectedTanks,
      removedTanks,
    } = this.state;

    const {
      inProgress,
      errors,
      list,
      gasTypeResource,
      locationResource,
    } = this.props;

    const searchResultColumns = [
      {
        Header: '',
        accessor: 'id',
        width: 40,
        Cell: (data) => {
          const id = data.value;
          return (
            (data.original.status === 'AVAILABLE' || !!selectedTanks[id] || !!removedTanks[id]) ? (
              <input type="checkbox" readOnly checked={!!selectedTanks[id]} />
            ) : null
          )
        }
      },
      {
        Header: 'SERIAL NUMBER',
        accessor: 'serialNumber'
      },
      {
        Header: 'GAS IN TANK',
        accessor: 'type'
      },
      {
        Header: 'VACUUM READING',
        accessor: 'vacuumReading'
      },
      {
        Header: 'STATUS',
        accessor: 'status'
      },
      {
        Header: 'LOCATION',
        accessor: 'location'
      },
      {
        Header: 'NEXT INSPECTION DATE',
        accessor: 'nextInspectionDate',
        Cell: data => {
          return moment(data.value).format('DD MMM YYYY');
        },
      }
    ]

    return (
      <div className="tank-info-input">
        <div className="tank-input-field">
          <div className="tank-input-field__add-new">
            <ul className="tank-input-field__selected-list">
              {this._renderSelectedTanks()}
            </ul>
            <div onClick={this.whoTankSelectPopup}>
              <PlusIcon className="tank-input-field__add-icon" size={20} />
              <span>Add tanks</span>
            </div>
          </div>
        </div>
        <div className="tank-search-popup">
          <Popup
            bigOne
            ref={(ref) => {this.popup = ref}}>
            <div className="tank-search-popup__inner">
              <div className="tank-search-popup__form">
                <div className="flex-default">
                  <span>Tank info:</span>
                  <div className="inline-field">
                    <div className="row">
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <TextBox
                          name="serialNumber"
                          placeholder="Serial number"
                          onChange={this.setValue}
                          fullWidth
                          value={serialNumber}/>
                      </div>
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <SelectBox
                          name="gasType"
                          placeholder="Type of gas"
                          onChange={this.setValue}
                          fullWidth
                          options={gasTypeResource.list}
                          value={gasType}/>
                        { gasTypeResource.errors ? <ErrorsDisplay errors={gasTypeResource.errors} /> : null }
                        { gasTypeResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 inline-field__col inline-field__col--left">
                      <SelectBox
                          name="status"
                          placeholder="Status"
                          onChange={this.setValue}
                          fullWidth
                          options={statusOptions}
                          allowCreate
                          addNewOption={this.addNewOption}
                          value={status}/>
                      </div>
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <SelectBox
                          name="location"
                          placeholder="Location"
                          onChange={this.setValue}
                          fullWidth
                          options={locationResource.list}
                          value={location}/>
                        { locationResource.errors ? <ErrorsDisplay errors={locationResource.errors} /> : null }
                        { locationResource.fetching ? <LoadingIndicator mini overlay noText onDuty={true}/> : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 inline-field__col inline-field__col--left">
                        <DateBox
                          name="nextInspectdionDate"
                          onChange={this.setValue}
                          value={nextInspectionDate}/>
                      </div>
                      <div className="col-6 inline-field__col inline-field__col--left">
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
              <div className="tank--popup__result">
                {(list.length) ? (
                  <Table
                    data={list}
                    columns={searchResultColumns}
                    getTdProps={(state, rowInfo) => {
                      return {
                        onClick: (e) => {
                          tankInfoInput.tankClick(rowInfo)
                        }
                      }
                    }}
                    pageSize={list.length}/>
                ) : null }
              </div>
              <div className="tank-search-popup__btns row">
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
                    onClick={this.sendOutSelectedTanks}
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