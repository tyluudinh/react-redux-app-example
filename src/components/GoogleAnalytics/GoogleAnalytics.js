import React, { Component } from 'react';
import { BrowserRouter } from 'react-g-analytics';

export default class GoogleAnalytics extends Component {
  render() {
    let isProd = process.env.NODE_ENV === 'production';
    const { children, id } = this.props;
    if (isProd) {
      return (<BrowserRouter id={id}>{children}</BrowserRouter>);
    }
    return (<div>{children}</div>);
  }
}