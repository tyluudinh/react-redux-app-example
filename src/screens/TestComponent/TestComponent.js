/*---
 Testing Component list:
 (You can use component name to search for related parts in this file)
 - SelectBox
*/
import React, { Component } from 'react';
import './TestComponent.css';

// SelectBox
import SelectBox from 'app/components/SelectBox/SelectBox';
// TextBox
import TextBox from 'app/components/TextBox/TextBox';
// DateBox
import DateBox from 'app/components/DateBox/DateBox';
// Button
import Button from 'app/components/Button/Button';
// Table 
import Table from 'app/components/Table/Table';

const SelectBoxOptions = [
  { value: 'one', label: 'option one' },
  { value: 'two', label: 'option two' },
  { value: 'three', label: 'option three' },
  { value: 'four', label: 'option four' },
  { value: 'all', label: 'all options' },
]

const fakeTableData = [
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Banner Linsley',
    age: 24,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Hanner Linsley',
    age: 22,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
];

const fakeTableComlumnConfig = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Age',
  accessor: 'age',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // SelectBox
      selectBoxValue: 'all',
      // TextBox
      TextBoxValue: '',
      phoneNumber: '',
      // DateBox
      DateBoxValue: '1 Nov 2017',
    }
    // SelectBox
    this.selectBoxOnChanged = this.selectBoxOnChanged.bind(this);
    // TextBox
    this.TextBoxOnChanged = this.TextBoxOnChanged.bind(this);
    // DateBox
    this.DateBoxOnChanged = this.DateBoxOnChanged.bind(this);
    // Button
    this.ButtonClick = this.ButtonClick.bind(this);
  }

  // SelectBox
  selectBoxOnChanged(data) {
    if (data) {
      this.setState({
        selectBoxValue: data.value
      });
    }
  }

  // TextBox
  TextBoxOnChanged(name, value) {
    this.setState({
      [name]: value
    })
  }

  // DateBox
  DateBoxOnChanged(value) {
    this.setState({
      DateBoxValue: value
    })
  }

  // Button
  ButtonClick() {
    console.log('button clicked');
  }

  render() {
    return (
      <div className="container">
       {/* // SelectBox */}
        <div className="row">
          <div className="col-4">
            <SelectBox 
              options={SelectBoxOptions}
              onChange={this.selectBoxOnChanged} 
              value={this.state.selectBoxValue}
            />
          </div>
          <div className="col-4">
            <SelectBox 
              options={SelectBoxOptions}
              onChange={this.selectBoxOnChanged} 
              value={this.state.selectBoxValue}
            />
          </div>
          <div className="col-4">
            <SelectBox 
              options={SelectBoxOptions}
              onChange={this.selectBoxOnChanged} 
              value={this.state.selectBoxValue}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TextBox 
              name="TextBoxValue"
              value={this.state.TextBoxValue}
              onChange={this.TextBoxOnChanged}
              placeholder="Enter some text here"
            />
            <TextBox
              name="TextBoxValue"
              className="space-top reverse"
              value={this.state.TextBoxValue}
              onChange={this.TextBoxOnChanged}
              placeholder="Text box with icon"
              withIcon={{ name: 'lock' }}
            />
            <TextBox
              name="phoneNumber"
              className="space-top"
              type="phone"
              value={this.state.phoneNumber}
              onChange={this.TextBoxOnChanged}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <DateBox 
              value={this.state.DateBoxValue}
              onChange={this.DateBoxOnChanged}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Button onClick={() => {}} fullWidth>Confirm</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="green-reverse" fullWidth>Edit</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="blue-reverse" fullWidth>Create</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="red-reverse" fullWidth>Delete</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="blue-reverse" withIcon={{ name: 'plus' }} fullWidth noBorderRadius>Create new type</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="blue-reverse" withIcon={{ name: 'download' }}>Download</Button>
          </div>
          <div className="col-4">
            <Button onClick={() => {}} type="blue-reverse" withIcon={{ name: 'upload' }}>Upload</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Table
              columns={fakeTableComlumnConfig}
              data={fakeTableData} />
          </div>
        </div>
      </div>
    )
  }
}
