import React from 'react';
import classNames from 'classnames';

import './LoadingIndicator.css';

export default ({ onDuty, mini, inline, text, overlay, noText, ...restProps }) => {
  if (mini) return (
    <div className={classNames(
      'loading-indicator-mini',
      { 'loading-indicator-mini--show': onDuty },
      { 'loading-indicator-mini--right-overlay': overlay }
    )}
      {...restProps}>
      <img className="loading-indicator-mini__img" src={require('app/assets/images/loading-tanker.svg')} alt="BNF loading" />
      <span className="loading-indicator-mini__text">{noText ? '' : (text ? text : 'on my way..!')}</span>
    </div>
  )

  if (inline) return (
    <div className={classNames(
      'loading-indicator-inline',
      { 'loading-indicator-inline--show': onDuty },
    )}
      {...restProps}>
      <span className="loading-indicator-inline__text">{noText ? '' : (text ? text : 'on my way..!')}</span>
      <img className="loading-indicator-inline__img" src={require('app/assets/images/loading-tanker.svg')} alt="BNF loading" />
    </div>
    
  )

  return (
    <div className={classNames(
      'loading-indicator',
      { 'loading-indicator--show': onDuty }
    )}>
      <div className="loading-indicator__outer">
        <div className="loading-indicator__inner">
          <img className="loading-indicator__img" src={require('app/assets/images/loading-tanker.svg')} alt="BNF loading" />
          <div className="loading-indicator__text">{text ? text : 'on my way..!'}</div>
        </div>
      </div>
    </div>
  )
}
