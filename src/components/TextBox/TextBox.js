import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// React Phone Number input
import Phone from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';

import './TextBox.css';

export default class TextBox extends Component {
  constructor(props) {
    super(props);

    this.textBoxOnChange = this.textBoxOnChange.bind(this);
    this._renderInput = this._renderInput.bind(this);
  }

  textBoxOnChange(e) {
    const { onChange, name } = this.props;
    // pass the value to outer event handler
    // If target property doesn't exist => special input field (value return directly)
    if (e) {
      onChange(name, (e.target) ? e.target.value : e);
    }
  }

  _renderInput() {
    const { type, name, value, placeholder, multiline } = this.props;
    if (type === 'phone') {
      return (
        <Phone 
          placeholder="Phone number"
          value={ value }
          onChange={this.textBoxOnChange}
          />
      )
    }
    if (multiline) {
      return (
        <textarea
          className={classNames('custom-textbox multiline')}
          name={name}
          value={value}
          onChange={this.textBoxOnChange}
          placeholder={placeholder}
        ></textarea>
      )
    }
    return (
      <input 
        type={(type) ? type : 'text'}
        className={classNames('custom-textbox',)}
        name={name}
        value={value}
        onChange={this.textBoxOnChange}
        placeholder={placeholder}
      />
    )
  }

  _renderIcon(withIcon) {
    const { name, style, size } = withIcon;
    const Icon = require(`react-icons/lib/fa/${name}`);
    if (Icon) {
      return (
        <div className="icon-wrapper">
          <Icon style={(style) ? style : {}} size={(size) ? size : null} className="icon-wrapper__icon" />
        </div>
      )
    }
    // Ignore 
    // It's hard to reproduce this icon missing case
    // istanbul ignore next
    return null;
  }

  render() {
    const { className, withIcon, reverseTheme } = this.props;

    return (
      <div 
        className={
          classNames(
            'custom-textbox-wrapper',
            { 
              'with-icon': withIcon,
              'reverse': reverseTheme,
            },
            className,
          )
        }
      >
        {(withIcon) ? this._renderIcon(withIcon) : null}
        {this._renderInput()}
      </div>
    )
  }
}

TextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  withIcon: PropTypes.object,
  name: PropTypes.string,
  reverserTheme: PropTypes.bool,
  type: PropTypes.string,
  multiline: PropTypes.bool,
};