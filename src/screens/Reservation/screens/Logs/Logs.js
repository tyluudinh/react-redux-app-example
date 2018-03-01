import React, { Component } from 'react';

export default class TankLogs extends Component {
  render() {
    return (
      <h1 className="main-title">
        Reservation #{this.props.match.params.id} - Activity log
      </h1>
    )
  }
}