import React from 'react';
import SadICon from 'react-icons/lib/fa/frown-o';
import i18n from 'app/languages/index'
import './NotFound.css';

export default (props) => {
  return (
    <div className="screen-not-found center">
      <SadICon size={50} />
      <h2>{i18n.notFoundScreen.title}</h2>
    </div>
  )
}