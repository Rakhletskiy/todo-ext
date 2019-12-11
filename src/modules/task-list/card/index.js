import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './card.sass';
import { onDelTask, onEditTask } from '../../../actions';

const Card = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  return (
    <div className='task-list__tasks-item'>
      {isEditing ? (
        <div className='task-list__tasks-item-edit-block'>
          <input onChange={e => setEditedTask(e.target.value)} value={editedTask || props.task} autoFocus />
          <button onClick={() => props.onEditTask(props.taskIndex, props.userId, editedTask, setIsEditing)}>OK</button>
        </div>
      ) : (
        <span>{props.task}</span>
      )}
      <Icon onClick={() => setIsEditing(!isEditing)} className='task-list__tasks-item-edit-btn' type='edit' />
      <Icon onClick={() => props.onDelTask(props.taskIndex, props.userId)} className='task-list__tasks-item-del-btn' type='delete' />
    </div>
  );
};

export default connect(
  state => ({ userId: state.auth.currentUser.id }),
  dispatch => ({
    onDelTask: (taskIndex, userId) => dispatch(onDelTask(taskIndex, userId)),
    onEditTask: (taskIndex, userId, editedTask, setIsEditing) => dispatch(onEditTask(taskIndex, userId, editedTask, setIsEditing))
  })
)(Card);
