import React from 'react';

import Button from 'app/components/Button/Button';

export default (props) => (
  <div className="message-display container">
    <h1 className="message-display__message">
      Your request is received! Please check your email for password recovery email!
    </h1>
    <div className="center">
      <Button onClick={() => props.history.push('/')} minPadding>Back to homepage</Button>
    </div>
  </div>
)