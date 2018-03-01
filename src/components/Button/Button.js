import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./Button.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownShow: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown() {
    this.setState({ dropDownShow: !this.state.dropDownShow });
  }
  render() {
    const {
      type,
      withIcon,
      children,
      fullWidth,
      minPadding,
      noBorderRadius,
      onClick,
      className,
      dropDown,
      ...rest
    } = this.props;

    function renderButtonIcon() {
      if (withIcon) {
        const { name, style, size } = withIcon;
        var Icon = require(`react-icons/lib/fa/${name}`);
        return (
          <Icon
            size={size ? size : null}
            style={style ? style : {}}
            className="custom-button__icon"
          />
        );
      }
      return null;
    }

    return (
      <div
        className={classNames(
          "custom-button",
          {
            "full-width": fullWidth,
            "no-border-radius": noBorderRadius,
            "min-padding": minPadding
          },
          type ? type : "green",
          className
        )}
        {...rest}
        onClick={(dropDown) ? this.toggleDropdown : onClick}
      >
        {renderButtonIcon()}
        {children}
        {(dropDown) ? (
          <div className={classNames(
            'drop-down-container',
            { 'drop-down-container--active': this.state.dropDownShow }
          )}
          onClick={(e) => e.stopPropagation()}>
            {dropDown}
          </div>
        ) : null}
      </div>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  withIcon: PropTypes.object,
  fullWidth: PropTypes.bool,
  noBorderRadius: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  dropDown: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  minPadding: PropTypes.bool,
};
