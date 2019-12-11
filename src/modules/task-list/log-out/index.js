import React from 'react';
import { Icon } from 'antd';

import './log-out.sass';

const LogOut = props => {
  return (
    <div className='log-out'>
      <span className='log-out__name'>{props.name}</span>
      <Icon onClick={() => props.logOut()} className='log-out__icon' type='logout' size='large' />
    </div>
  );
};

export default LogOut;
