import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import BackIcon from 'react-icons/lib/fa/arrow-left'

import './TooltipNav.css';

export default class MainNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSubGroup: null
    };

    this.setActiveSubGroup = this.setActiveSubGroup.bind(this);
    this._renderNavItem = this._renderNavItem.bind(this);
  }

  setActiveSubGroup(id) {
    const component = this;
    return function(e) {
      e.preventDefault();
      component.setState({ activeSubGroup: id });
    }
  }

  _renderNavItem(item, index) {
    if (item.to) return (
      <li key={index}>
        <Link onClick={() => this.props.toggleNav()} className={classNames({ 'is-disable': item.disable })} to={item.to}>{item.title}</Link>
      </li>
    )
    if (item.subNav) return (
      <li key={index}>
        <a onClick={this.setActiveSubGroup(item.subNav)}>{item.title}</a>
      </li>
    )
    return null;
  }

  render() {
    const { activeSubGroup } = this.state;
    const { data, children, open } = this.props;
    const { primaryList, subs } = data;
    return (
      <div className="tooltip-nav-container">
        {children}
        <div className={classNames(
            'tooltip-nav',
            { 'tooltip-nav--active': open },
          )}>
          <div className="tooltip-nav__outer">
            <div className={classNames(
                'tooltip-nav__inner',
                { 'tooltip-nav__inner--sub': activeSubGroup}
              )}>
              <div className="tooltip-nav__group">
                <ul className="tooltip-nav__list">
                  {primaryList.map(this._renderNavItem)}
                </ul>
              </div>
              { subs.map((list, index) => {
                return (
                  <div className={classNames(
                    'tooltip-nav__sub-group',
                    { 'tooltip-nav__sub-group--active': activeSubGroup === list.id}
                  )}
                  key={index}
                  >
                    <ul className="tooltip-nav__list">
                      <a className="tooltip-nav__back-button" onClick={this.setActiveSubGroup(null)}>
                        <BackIcon className="tooltip-nav__back-icon" size={12}/>
                        Back
                      </a>
                      {list.items.map(this._renderNavItem)}
                    </ul>
                  </div>
                )
              })}
              
            </div>
          </div>
        </div>
      </div>
  )
  }
}