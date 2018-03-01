import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './DateBox.css';

import CustomInput from './CustomInput';

export default class DateBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const selected = moment(date).format('DD MMM YYYY')
    const { onChange, name } = this.props;
    if (!onChange) return;
    if (name) return onChange(name, date);
    return onChange(selected);
  }

  render() {
    const { value, className, placeholder } = this.props;
    return (
      <DatePicker
        ref={(c) => {this._calendar = c }}
        dateFormat="DD MMM YYYY"
        selected={value ? value : moment()}
        onChange={this.handleChange}
        customInput={<CustomInput />}
        className={className}
        placeholderText={placeholder}
      />
    )
  }
}

DateBox.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  fallbackValue: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
}