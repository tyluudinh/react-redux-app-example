import React, { Component } from 'react';

import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import './Logs.css';

export default class TankLogs extends Component {
  constructor(props) {
    super(props);
    this._renderLogs = this._renderLogs.bind(this);
  }

  componentDidMount() {
    const { fetchLogs, match } = this.props;
    fetchLogs(match.params.id);  
  }

  _renderLogs() {
    const { data } = this.props;
    const toRender = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      toRender.push(
        <div className="tank-logs__list-wrapper" key={`${item.date}-${i}`}>
          <h4 className="tank-logs__date">{item.date}</h4>
          <ul className="tank-logs__list">
            {item.logs.map(value => (
              <li className="tank-logs__item" key={value.message}>
                {value.message}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return toRender;
  }

  render() {
    const { inProgress, errors } = this.props;
    return (
      <div className="tank-logs container">
        <h1 className="main-title">
          Tank info #{this.props.match.params.id} - Activity log
        </h1>
        { errors ? (
          <ErrorsDisplay errors={errors} center/>
        ) : (
          <div className="tank-logs__list-container">
            {this._renderLogs()}
          </div>
        )}
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}