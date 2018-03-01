import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Transition from 'react-addons-css-transition-group';
import EditIcon from 'react-icons/lib/md/edit';
import FileIcon from 'react-icons/lib/fa/file';
import CubeIcon from 'react-icons/lib/fa/cube';
import SearchIcon from 'react-icons/lib/fa/search';
import PowerOffIcon from 'react-icons/lib/fa/power-off';

import './MainNav.css';

const menuList = [
  {
    title: 'Create orders',
    icon: EditIcon,
    to: '/order/create'
  },
  {
    title: 'Create reservations',
    icon: FileIcon,
    to: '/reservation/create'
  },
  {
    title: 'Create tank info',
    icon: CubeIcon,
    to: '/tank/create'
  },
  {
    title: 'Search',
    icon: SearchIcon,
    to: '/'
  },
  {
    title: 'Logout',
    icon: PowerOffIcon,
    to: '/logout'
  },
]

export default class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const closeMenu = this.close;
    return (
      <div className="main-nav">
        <Transition
          transitionName="mn-overlay"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {(this.state.open) ? (<div className="main-nav__overlay" onClick={this.close}></div>) : null}
        </Transition>
        <Transition
          transitionName="mn-pan"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {(this.state.open) ? (
            <div className="main-nav__pan">
              <ul className="main-nav__list">
                { menuList.map((item, index) => {
                  return (
                    <li 
                      onClick={closeMenu}
                      key={index}
                      className="main-nav__item">
                      <Link to={item.to}>
                        <item.icon />
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </Transition>
      </div>
    )
  }
}
