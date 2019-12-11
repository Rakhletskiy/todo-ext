import { combineReducers } from 'redux';

import auth from './auth';
import taskList from './task-list';

export default combineReducers({
  auth,
  taskList
});