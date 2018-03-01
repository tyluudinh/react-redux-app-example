import React, { Component } from 'react';
import { persistor } from 'app/App';

export default class Purge extends Component {
  componentDidMount() {
    persistor.purge();
    this.props.history.push('/');
  }
  render() {
    return (<h1 className="main-title">PURGE THE STORE!</h1>);
  }
}