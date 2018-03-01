import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchForm from './components/SearchForm/container';
import SearchResult from './components/SearchResult/SearchResult';
import Logo from 'app/components/Logo/Logo';
import Button from 'app/components/Button/Button';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Main.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
    }
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clean();
  }

  _renderCreateDropDown() {
    return (
      <ul className="create-drop-down">
        <li><Link to="/order/create">Create order</Link></li>
        <li><Link to="/reservation/create">Create reservation</Link></li>
        <li><Link to="/tank/create">Create tank info</Link></li>
      </ul>
    )
  }

  searchSubmit(keyword, options) {
    this.props.search(keyword, options);
  }

  render() {
    const { history, orders, tanks, reservations, found, inProgress, errors } = this.props;
    const searchResult = { orders, tanks, reservations };
    return (
      <div className="main-screen container">
        <div className="logo">
          <Logo />
        </div>
        <SearchForm onSubmit={this.searchSubmit} />
        <ErrorsDisplay errors={errors} center/>
        {(found) ? (
          <SearchResult 
            result={searchResult} 
            history={history}/>
        ) : (
          <div>
            <div className="separate-text">
              or
            </div>
            <div className="center">
              <Button 
                type="blue-reverse" 
                minPadding
                dropDown={this._renderCreateDropDown()}>
                Create
              </Button>
            </div>
          </div>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>      
    )
  }
}