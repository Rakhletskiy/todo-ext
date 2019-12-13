import React from 'react';
import { Empty, Icon } from 'antd';

import './full-list.sass';

const FullList = props => {
  return (
    <div onClick={e => props.setIsFullList(false)} className='full-list'>
      <div onClick={e => e.stopPropagation()} className='full-list__inner'>
        <h2 className='full-list__title'>Full list of tasks</h2>
  <div className='full-list__total-count'>Number of tasks:<b>{props.tasks.length ? props.tasks.length : '0'}</b></div>
        {props.tasks.length > 0 ? (
          <ul>
            {props.tasks.map((task, taskIndex) => {
              return (
                <li className='full-list__item' key={taskIndex}>
                  <div className='full-list__item-label'>{task.from ? task.task.label : task.label}</div>
              <div className='full-list__item-from'>{task.from ? <span>from:</span>: null } {task.from ? <span>{task.from}</span> : null}</div>
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty className='full-list__no-data' />
        )}

        <Icon onClick={() => props.setIsFullList(false)} className='full-list__close-btn' type='close' />
      </div>
    </div>
  );
};

export default FullList;
