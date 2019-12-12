import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './card.sass';
import { onDelTask, onEditTask } from '../../../actions';

import ShareTaskBlock from './share-task-block';

const Card = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  return (
    <li className='task-list__tasks-item'>
      {isEditing ? (
        <div className='task-list__tasks-item-edit-block'>
          <input onChange={e => setEditedTask(e.target.value)} value={editedTask || props.label} autoFocus />
          <button onClick={() => props.onEditTask(props.taskIndex, props.userId, props.taskId, editedTask, setIsEditing)}>OK</button>
        </div>
      ) : (
        <div>
          {
            <span>{props.label}</span>
          }
          {isSharing && <ShareTaskBlock task={props.task} setIsSharing={setIsSharing} taskIndex={props.taskIndex} userId={props.userId} />}
        </div>
      )}
      <Icon onClick={() => setIsSharing(!isSharing)} className='task-list__tasks-item-share-btn' type='share-alt' />
      <Icon onClick={() => setIsEditing(!isEditing)} className='task-list__tasks-item-edit-btn' type='edit' />
      <Icon onClick={() => props.onDelTask(props.taskIndex, props.userId)} className='task-list__tasks-item-del-btn' type='delete' />
    </li>
  );
};

export default connect(
  state => ({ userId: state.auth.currentUser.id }),
  dispatch => ({
    onDelTask: (taskIndex, userId) => dispatch(onDelTask(taskIndex, userId)),
    onEditTask: (taskIndex, userId, taskId, editedTask, setIsEditing) => dispatch(onEditTask(taskIndex, userId, taskId, editedTask, setIsEditing))
  })
)(Card);
