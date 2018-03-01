import React from 'react';

export default () => {
  const logoStyle = {
    width: '100%',
    maxHeight: '100%',
  }

  return (
    <img style={logoStyle} src={require('app/assets/images/logo213.png')} alt="BNF Logo"/>
  )
}