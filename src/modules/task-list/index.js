import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Empty } from 'antd';

import './task-list.sass';
import { onAddNewTask, fetchTasksData } from '../../actions';

import LogOut from './components/log-out';
import Card from './components/card';
import AddBtnBlock from './components/add-btn-block';
import FullList from './components/full-list';

const TaskList = props => {
  const [taskText, setTaskText] = useState('');
  const [isFullList, setIsFullList] = useState(false);

  // fetching data in componentDidMount cycle
  useEffect(() => {
    fetchTasksData(userId);
  }, []);

  const { fetchTasksData, userId, tasks, onAddNewTask, logOut, name } = props;
  return (
    <div className='task-list'>
      <div className='task-list-inner'>
        <h1 className='task-list__title'>Task list</h1>
        <Icon onClick={() => setIsFullList(true)} className='task-list__list-btn' type='unordered-list' />
        <ul className='task-list__tasks'>
          {tasks ?
            tasks.map((task, taskIndex) => {
              return (
                <Card
                  shared={task.from ? true : false}
                  label={task.from ? task.task.label : task.label}
                  from={task.from || null}
                  taskIndex={taskIndex}
                  userId={userId}
                  taskId={task.from ? task.task.id : task.id}
                  key={taskIndex}
                />
              );
            })
            :
            <Empty className='task-list__empty' />}
        </ul>
        <AddBtnBlock taskText={taskText} setTaskText={setTaskText} userId={userId} onAddNewTask={onAddNewTask} />
      </div>
      {isFullList && <FullList tasks={tasks} setIsFullList={setIsFullList} />}
      <LogOut name={name} logOut={logOut} />
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
