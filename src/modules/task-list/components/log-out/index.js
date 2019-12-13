import React from 'react';
import { Icon } from 'antd';

import './log-out.sass';

const LogOut = ({ logOut, name }) => {
  return (
    <div className='log-out'>
      <span className='log-out__name'>{name}</span>
      <Icon onClick={() => logOut()} className='log-out__icon' type='logout' size='large' />
    </div>
  );
};

export default LogOut;
