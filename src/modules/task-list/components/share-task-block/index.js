import React from 'react';
import { Icon } from 'antd';

import './share-task-block.sass';
import { onShareTask } from '../../../../helpers/data/share';

const ShareTaskBlock = props => {
  const { label, userId, taskIndex, setIsSharing, destinationEmail, setDestinationEmail } = props;
  return (
    <div className='share-block-wrapper'>
      <div className='share-block'>
        <h2>share task</h2>
        <span>
          User e-mail for share <span>"{label}"</span> task:
        </span>
        <input onChange={e => setDestinationEmail(e.target.value)} value={destinationEmail} placeholder='E-mail...' autoFocus />
        <button onClick={() => onShareTask(destinationEmail, userId, taskIndex, setDestinationEmail, setIsSharing, label)}>SHARE</button>
        <Icon onClick={() => setIsSharing(false)} className='share-block__close-btn' type='close' />
      </div>
    </div>
  );
};

export default ShareTaskBlock;
