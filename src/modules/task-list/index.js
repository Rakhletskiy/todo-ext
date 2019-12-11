import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './task-list.sass';
import { onAddNewTask, fetchTasksData } from '../../actions';

import LogOut from './log-out';
import Card from './card';

const TaskList = props => {
  const [taskText, setTaskText] = useState('');
  

  useEffect(() => {
    props.fetchTasksData(props.userId);
  }, []);
  return (
    <div className='task-list'>
      <div className='task-list-inner'>
        <h1 className='task-list__title'>Task list</h1>
        <div className='task-list__search-block'>
          <Icon className='task-list__search-block-icon' type='search' />
          <input placeholder='search...' />
        </div>
        <ul className='task-list__tasks'>
          {props.tasks &&
            props.tasks.map((task, taskIndex) => <Card task={task} taskIndex={taskIndex} userId={props.userId} key={taskIndex} />)}
        </ul>
        <div className='task-list__add-block'>
          <input onChange={e => setTaskText(e.target.value)} placeholder='new task...' />
          <button onClick={() => props.onAddNewTask(props.userId, taskText)}>ADD</button>
        </div>
      </div>

      <LogOut name={props.name} logOut={props.logOut} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    name: state.auth.currentUser.login,
    userId: state.auth.currentUser.id,
    tasks: state.taskList.currentTasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch({ type: 'LOGOUT_USER' }),
    onAddNewTask: (userId, taskText) => dispatch(onAddNewTask(userId, taskText)),
    fetchTasksData: userId => dispatch(fetchTasksData(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
