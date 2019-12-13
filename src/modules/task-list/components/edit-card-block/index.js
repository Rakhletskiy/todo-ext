import React from 'react';

const EditCardBlock = props => {
  const { setEditedTask, editedTask, label, taskIndex, userId, taskId, onEditTask, setIsEditing } = props;
  return (
    <div className='task-list__tasks-item-edit-block'>
      <input onChange={e => setEditedTask(e.target.value)} value={editedTask || label} autoFocus />
      <button onClick={() => onEditTask(taskIndex, userId, taskId, editedTask, setIsEditing)}>OK</button>
    </div>
  );
};

export default EditCardBlock;
