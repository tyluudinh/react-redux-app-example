import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from 'react-icons/lib/fa/calendar'

export default class CustomInput extends Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <div className="custom-date-input-wrapper" onClick={onClick}>
        <input type="text" className="custom-date-input" value={value} readOnly/>
        <div className="custom-date-input__icon">
          <CalendarIcon className="calendar-icon"/>
        </div>
      </div>
    )
  }
}

CustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
}

