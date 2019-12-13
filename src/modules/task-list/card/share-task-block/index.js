import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './share-task-block.sass';
import { onShareTask } from '../../../../helpers/data/share';

const ShareTaskBlock = props => {
  const [destinationEmail, setDestinationEmail] = useState('');

  return (
    <div className='share-block-wrapper'>
      <div className='share-block'>
        <h2>share task</h2>
        <span>User e-mail for share <span>"{props.label}"</span> task:</span>
        <input onChange={e => setDestinationEmail(e.target.value)} value={destinationEmail} placeholder='E-mail...' autoFocus />
        <button onClick={() => onShareTask(destinationEmail, props.userId, props.taskIndex, setDestinationEmail, props.setIsSharing, props.label)}>SHARE</button>
        <Icon onClick={() => props.setIsSharing(false)} className='share-block__close-btn' type='close' />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    // onShareTask: (destinationEmail, userId, taskIndex, setIsSharing) => dispatch(onShareTask(destinationEmail, userId, taskIndex, setIsSharing))
  }
}

export default connect(null, mapDispatchToProps)(ShareTaskBlock);
