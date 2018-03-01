import React from 'react';
import SadICon from 'react-icons/lib/fa/frown-o';

import './NotFound.css';

export default (props) => {
  return (
    <div className="screen-not-found center">
      <SadICon size={50} />
      <h2>Uhoh! <br/> The page you're looking for is not existed!</h2>
    </div>
  )
}