import React, { Component } from 'react';

import TextBox from 'app/components/TextBox/TextBox';
import SelectBox from 'app/components/SelectBox/SelectBox';
import Button from 'app/components/Button/Button';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      location: '',
      gasType: '',
      customer: '',
      status: '',
      date: '',
    }

    this.setFilterValue = this.setFilterValue.bind(this);
    this.setKeyword = this.setKeyword.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchResource('location');
  }

  setFilterValue(name, option) {
    this.setState({ [name]: option });
  }

  setKeyword(name, value) {
    this.setState({ keyword: value });
  }

  searchSubmit(e) {
    e.preventDefault();
    const { keyword } = this.state;
    this.props.onSubmit(keyword, {});
  }
  
  render() {
    const { keyword, location, gasType, status, customer, date } = this.state;
    const { locationResource } = this.props;
    return (
      <form onSubmit={this.searchSubmit} className="search-form">
        <div className="row">
          <div className="col-12">
            <TextBox 
              placeholder="Search for orders, tank info and reservation number" 
              name="keyword"
              onChange={this.setKeyword}
              value={keyword} />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <SelectBox
              name="location" 
              onChange={this.setFilterValue} 
              options={locationResource.list} 
              placeholder="Location"
              value={location}/>
          </div>
          <div className="col-2">
            <SelectBox
              name="gasType" 
              onChange={this.setFilterValue} 
              options={[]} 
              value={gasType}
              placeholder="Type of gas"
              disabled/>
          </div>
          <div className="col-2">
            <SelectBox
              name="status" 
              onChange={this.setFilterValue} 
              options={[]} 
              value={status}
              placeholder="Status"
              disabled/>
          </div>
          <div className="col-2">
            <SelectBox
              name="customer" 
              onChange={this.setFilterValue} 
              options={[]} 
              value={customer}
              placeholder="Customer"
              disabled/>
          </div>
          <div className="col-2">
            <SelectBox
              name="date" 
              onChange={this.setFilterValue} 
              options={[]} 
              value={date}
              placeholder="Date"
              disabled/>
          </div>
          <input type="submit" className="hidden"/>
          <div className="col-2">
            <Button onClick={this.searchSubmit} fullWidth type="green-reverse" withIcon={{ name: 'search', style: {marginBottom: '3px'}, size: 18 }}>
              Search
            </Button>
          </div>
        </div>
      </form>   
    )
  }  
}