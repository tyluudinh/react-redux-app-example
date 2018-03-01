import React, { Component }  from 'react';

import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

export default class Logout extends Component {
  componentDidMount() {
    this.props.logout(this.props.history);
  }

  render() {
    const {
      inProgress,
      errors,
    } = this.props;
    return (
      <div>
        { errors ? (
          <div>
            <ErrorsDisplay center errors={errors} />
            <h2>There's error! Please refresh the page to try again!</h2>
          </div>
        ) : null }
        <LoadingIndicator onDuty={inProgress} text="Logging out" />
      </div>
    )
  }
} 
