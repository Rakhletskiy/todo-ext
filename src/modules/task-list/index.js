import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './task-list.sass';
import { onAddNewTask, fetchTasksData } from '../../actions';

import LogOut from './log-out';
import Card from './card';
import FullList from './full-list';

const TaskList = props => {
  const [taskText, setTaskText] = useState('');
  const [isFullList, setIsFullList] = useState(false);

  useEffect(() => {
    props.fetchTasksData(props.userId);
  }, []);
  return (
    <div className='task-list'>
      <div className='task-list-inner'>
        <h1 className='task-list__title'>Task list</h1>
        <Icon onClick={() => setIsFullList(true)} className='task-list__list-btn' type="unordered-list" />
        <ul className='task-list__tasks'>
          {props.tasks &&
            props.tasks.map((task, taskIndex) => {
              return (
                <Card
                  shared={task.from ? true : false}
                  label={task.from ? task.task.label : task.label}
                  from={task.from || null}
                  taskIndex={taskIndex}
                  userId={props.userId}
                  taskId={task.from ? task.task.id : task.id}
                  key={taskIndex}
                />
              );
            })}
        </ul>
        
        <div className='task-list__add-block'>
          <input onChange={e => setTaskText(e.target.value)} value={taskText} placeholder='New task...' />
          <button onClick={() => props.onAddNewTask(props.userId, taskText, setTaskText)}>ADD</button>
        </div>
      </div>
      {isFullList && <FullList tasks={props.tasks} setIsFullList={setIsFullList} />}
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
    onAddNewTask: (userId, taskText, setTaskText) => dispatch(onAddNewTask(userId, taskText, setTaskText)),
    fetchTasksData: userId => dispatch(fetchTasksData(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
