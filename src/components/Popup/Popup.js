import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';

import './Popup.css';

export default class Popup extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    innerClass: PropTypes.string,
    bigOne: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  show() {
    this.setState({
      show: true
    })
  }
  hide() {
    this.setState({
      show: false
    })
  }
  stopPropagating(e) {
    e.stopPropagation();
  }
  render() {
    const { children, title, innerClass, bigOne } = this.props;
    return (
      <div 
        className={
          classNames(
            'popup__wrapper',
            { 'active': this.state.show }
          )
        }
        onClick={this.hide}
      > 
        <div 
          className={classNames(
            'popup__inner',
            { 'popup__inner--big': bigOne },
            innerClass
          )} 
          onClick={this.stopPropagating}
        >
          <CloseIcon className="popup__close-button" onClick={this.hide} />
          {(title) ? (<h3 className="popup__title">{title}</h3>) : null}
          <div className="popup__content">
            {children}
          </div>
        </div>
      </div>
    )
  }
}