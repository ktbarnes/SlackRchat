import React from 'react';

const Giphy = ({url}) => (
  <div>
    <img className="image" src={url}></img>
  </div>
);

export default Giphy;