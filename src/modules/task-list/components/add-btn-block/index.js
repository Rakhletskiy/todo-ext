import React from 'react';

const AddBtnBlock = ({ onAddNewTask, userId, taskText, setTaskText }) => {
  return ( 
    <div className='task-list__add-block'>
          <input onChange={e => setTaskText(e.target.value)} value={taskText} placeholder='New task...' />
          <button onClick={() => onAddNewTask(userId, taskText, setTaskText)}>ADD</button>
        </div>
      
   );
}
 
export default AddBtnBlock;