import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './RadioGroup.css';
import TextBox from 'app/components/TextBox/TextBox';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherValue: '',
    }
    this._renderDefaultRadios = this._renderDefaultRadios.bind(this);
    this._renderCustomRadios = this._renderCustomRadios.bind(this);
    this._renderOtherPrompt = this._renderOtherPrompt.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setOtherValue = this.setOtherValue.bind(this);
  }

  setOtherValue(name, value) {
    this.setState({ otherValue: value })
  }

  onChange(e) {
    const { onChange } = this.props;
    const { name, value } = e.target;
    if (!onChange) return;
    onChange(name, value, {
      others: (value === 'others') ? this.state.otherValue : null
    });
  }

  _renderCustomRadios() {
    const { options, name, value, optionClass, customOption, customKey } = this.props;
    const radioGroup = this;
    const radioComponents = [];
    options.forEach(option => {
      radioComponents.push(
        <label 
          key={(customKey) ? customKey(option) : `value-${option.value}`}
          className={classNames(
            'radio-group__option',
            optionClass
          )}>
          <input 
            type="radio" 
            name={name} 
            onChange={radioGroup.onChange}
            checked={value === option.value}
            value={option.value}/>
          {customOption(option)}
        </label>
      )
    });
    return radioComponents;
  }

  _renderDefaultRadios() {
    const { options, name, value, optionClass } = this.props;
    const radioGroup = this;
    const radioComponents = [];
    options.forEach(option => {
      radioComponents.push(
        <label 
          key={`value-${option.value}`}
          className={classNames(
            'radio-group__option',
            optionClass
          )}>
          <input 
            type="radio" 
            name={name} 
            onChange={radioGroup.onChange}
            checked={value === option.value}
            value={option.value}/>
          <span>{option.label}</span>
        </label>
      )
    });
    return radioComponents;
  }

  _renderOtherPrompt() {
    const { optionClass, name, value } = this.props;
    const radioGroup = this;
    return (
      <label 
      className={classNames(
        'radio-group__option',
        optionClass,
        'col-12 radio-group__others',
      )}>
      <input 
        type="radio" 
        name={name} 
        onChange={radioGroup.onChange}
        checked={value === 'others'}
        value='others'/>
      <span>Others</span>
      <div className="radio-group__others-input">
        <TextBox
          name="others"
          fullWidth
          onChange={this.setOtherValue}
          value={this.state.otherValue}
        />
      </div>
    </label>
    )
  }

  render() {
    const { 
      className,
      customOption,
      othersPrompt,
    } = this.props;
    return (
      <div className={classNames(
        'radio-group row',
        className
      )}>
        { (!customOption) ? this._renderDefaultRadios() : this._renderCustomRadios() }
        { (othersPrompt) ? this._renderOtherPrompt() : null}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
}