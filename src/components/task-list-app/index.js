import React from 'react';
import { connect } from 'react-redux';

import './task-list-app.sass';

import Auth from '../../modules/auth';
import TaskList from '../../modules/task-list';

const TaskListApp = props => {
  return (
    <div className='task-list-app'>
      {props.isAuth ? <TaskList /> : <Auth />}
    </div>
  );
};

export default connect(state => ({isAuth: state.auth.isAuth}))(TaskListApp);
