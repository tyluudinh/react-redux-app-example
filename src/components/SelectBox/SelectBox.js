import React, { Component } from "react";
import Select, { Creatable } from "react-select";
import classNames from "classnames";
import PropTypes from "prop-types";
import DownArrow from "react-icons/lib/fa/chevron-down";

import "react-select/dist/react-select.css";
import "./SelectBox.css";

class CustomValue extends Component {
  render() {
    const { color, label } = this.props.value;
    if (color)
      return (
        <span className="custom-value--default" style={{ color }}>
          {label}
        </span>
      );
    return <span>{label}</span>;
  }
}

class CustomOption extends Component {
  render() {
    const { onSelect, isFocused } = this.props;
    const { color, label, value } = this.props.option;
    if (color) {
      return (
        <span
          className={classNames("custom-option--default", {
            "is-focused": isFocused
          })}
          style={{ color }}
          onClick={e => onSelect({ value }, e)}
        >
          {label}
        </span>
      );
    }
    return <span>{label}</span>;
  }
}

export default class SelectBox extends Component {
  constructor(props) {
    super(props);
    const { allowCreate } = props;

    this.getProperSelect({ allowCreate });

    this.onChange = this.onChange.bind(this);
    this.onNewOption = this.onNewOption.bind(this);
    this._renderArrow = this._renderArrow.bind(this);
  }

  SelectComponent = Select;

  // This function gonna check whether to use Select or Creatable as SelectBox Comonent
  getProperSelect({ allowCreate }) {
    if (allowCreate) this.SelectComponent = Creatable;
  }

  onNewOption(option) {
    const { type, onNewOption } = this.props;
    return type ? onNewOption(type, option) : onNewOption(option);
  }

  onChange(option) {
    const { onChange, name } = this.props;
    const goodOption = (option === null) ? { value: null, label: '', serverSync: true } : option;
    if (goodOption && onChange) {
      return name ? onChange(name, goodOption.value) : onChange(goodOption.value);
    }
  }

  _renderArrow() {
    if (this.props.noArrow) return null;
    return (
      <span>
        <DownArrow className="custom-select__arrow down" />
      </span>
    );
  }

  render() {
    const {
      options,
      value,
      flat,
      passive,
      customItems,
      name,
      onNewOption,
      placeholder,
      disabled,
    } = this.props;
    let additionalOptions = {};
    if (customItems) {
      additionalOptions.valueComponent = CustomValue;
      additionalOptions.optionComponent = CustomOption;
    }
    if (onNewOption) {
      additionalOptions.onNewOptionClick = this.onNewOption;
    }

    return (
      <this.SelectComponent
        className={classNames(
          "custom-select",
          { "custom-select--flat": flat },
          { "custom-select--passive": passive }
        )}
        name={name}
        value={value}
        options={options}
        onChange={this.onChange}
        arrowRenderer={this._renderArrow}
        placeholder={placeholder}
        clearable={onNewOption ? true : false}
        disabled={disabled}
        {...additionalOptions}
      />
    );
  }
}

SelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  passive: PropTypes.bool,
  flat: PropTypes.bool,
  customItems: PropTypes.bool,
  allowCreate: PropTypes.bool
};
