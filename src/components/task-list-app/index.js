import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './task-list-app.sass';

import Auth from '../../modules/auth';
import TaskList from '../../modules/task-list';

const TaskListApp = () => {
  return ( 
    <div className="task-list-app">
      <Auth />
      <TaskList />
    </div>
   );
}
 
export default TaskListApp;