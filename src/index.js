import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import TaskListApp from './components/task-list-app';

ReactDOM.render(
  <Provider store={store}>
    <TaskListApp />
  </Provider>,
  document.getElementById('root')
);
