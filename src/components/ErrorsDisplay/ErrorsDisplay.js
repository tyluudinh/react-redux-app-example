import React from 'react';
import classNames from 'classnames';

import './ErrorsDisplay.css';

export default ({ errors, center, fieldError }) => {
  return (
    (errors) ? (
      <ul className={classNames(
          'errors-display',
          { 'errors-display--field': fieldError },
          { 'center': center }
      )}>
        {(errors.map) ? errors.map((error) => {
          return (
            <li 
              key={`${error.message}${Math.floor(Math.random() * 8)}`}
              className="errors-display__error">
              {(error.message) ? error.message : 'Something wrong happen! Please try again later'}
            </li>
          )
        }) : null}
      </ul>
    ) : null
  );
}