import React, { Component } from 'react';

import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

export default class ActivateAccount extends Component {
  componentDidMount() {
    const { clean, match, activate } = this.props;
    clean();
    activate(match.params.token);
  }
  render() {
    const { errors, inProgress, done } = this.props;
    console.log(done);
    return (
      <div className="verify-activate-account container">
        <h1 className="main-title">Activate Account</h1>
        { done ? <h3 className="center">Account is activated successfully!</h3> : null }
        <ErrorsDisplay errors={errors} center/>
        <LoadingIndicator onDuty={inProgress} />
      </div>
    )
  }
}