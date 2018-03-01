import React from 'react';

import Button from 'app/components/Button/Button';

export default (props) => (
  <div className="message-display container">
    <h1 className="message-display__message">
      We have received your request. Please check your e-mail in 3-5 workings days for a registration link if your request is approved. Thank you.
    </h1>
    <div className="center">
      <Button onClick={() => props.history.push('/')} minPadding>Back to homepage</Button>
    </div>
  </div>
)