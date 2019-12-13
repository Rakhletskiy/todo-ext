import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './card.sass';
import { onDelTask, onEditTask } from '../../../../actions';

import ShareTaskBlock from '../share-task-block';
import EditCardBlock from '../edit-card-block';

const Card = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [destinationEmail, setDestinationEmail] = useState('');

  const { label, taskIndex, userId, taskId, onEditTask, shared, onDelTask } = props;
  return (
    <li className='task-list__tasks-item'>
      {isEditing ? (
        <EditCardBlock
          setEditedTask={setEditedTask}
          editedTask={editedTask}
          label={label}
          taskIndex={taskIndex}
          userId={userId}
          taskId={taskId}
          onEditTask={onEditTask}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div>
          <span className='task-list__tasks-item-label'>{label}</span>
          {isSharing && (
            <ShareTaskBlock
              label={label}
              setIsSharing={setIsSharing}
              taskIndex={taskIndex}
              userId={userId}
              destinationEmail={destinationEmail}
              setDestinationEmail={setDestinationEmail}
            />
          )}
        </div>
      )}
      {shared ? (
        <span className='task-list__tasks-item-shared'>shared</span>
      ) : (
        <Icon onClick={() => setIsSharing(!isSharing)} className='task-list__tasks-item-share-btn' type='share-alt' />
      )}
      <Icon onClick={() => setIsEditing(!isEditing)} className='task-list__tasks-item-edit-btn' type='edit' />
      <Icon onClick={() => onDelTask(taskIndex, userId)} className='task-list__tasks-item-del-btn' type='delete' />
    </li>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.auth.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelTask: (taskIndex, userId) => dispatch(onDelTask(taskIndex, userId)),
    onEditTask: (taskIndex, userId, taskId, editedTask, setIsEditing) => dispatch(onEditTask(taskIndex, userId, taskId, editedTask, setIsEditing))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
