import React from 'react';

import './flagIcon.css';

const FlagIcon = ({ name = 'Argentina' }) => {
  return(
    <span className='flag-icon'>
      <img src={require(`../../assets/flags/${name}.png`)} alt={name}/>
    </span>
  );
};

export default FlagIcon;