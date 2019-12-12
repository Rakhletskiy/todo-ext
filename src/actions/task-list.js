import store from '../store';
import { Item } from 'rc-menu';

export const fetchTasksData = userId => {
  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);


  return {
    type: 'FETCH_TASK_DATA',
    tasks:
      parsedData !== null && parsedData[userId - 1].sharedTasks && !parsedData[userId - 1].tasks
        ? parsedData[userId - 1].sharedTasks
        : parsedData !== null && parsedData[userId - 1].sharedTasks && parsedData[userId - 1].tasks
        ? parsedData[userId - 1].tasks.concat(parsedData[userId - 1].sharedTasks)
        : parsedData !== null
        ? parsedData[userId - 1].tasks
        : []
  };
};

export const onAddNewTask = (userId, taskText) => {
  const state = store.getState();

  let tasks = state.taskList.currentTasks != null ? [...state.taskList.currentTasks] : [];
  tasks.push(taskText);

  // because Redux doesn't love when we change state directly
  const tempUser = { ...state.auth.users[userId - 1] };
  tempUser.tasks = tasks;

  const tempUsersArr = [...state.auth.users];
  tempUsersArr.splice(userId - 1, 1, tempUser);

  // localStorage.removeItem('users');
  localStorage.setItem('users', JSON.stringify(tempUsersArr));

  return {
    type: 'ADD_TASK',
    tasks: tasks
  };
};

export const onDelTask = (taskIndex, userId) => {
  const state = store.getState();

  let tasks = [...state.taskList.currentTasks];

  tasks.splice(taskIndex, 1);

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);

  parsedData[userId - 1].tasks = tasks;

  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'DEL_TASK',
    tasks: tasks
  };
};

export const onEditTask = (taskIndex, userId, editingTask, setIsEditing) => {
  const state = store.getState();
  setIsEditing(false);

  const tempTasksArr = [...state.taskList.currentTasks];
   
  

  tempTasksArr.splice(taskIndex, 1, editingTask);



  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);

  const emailOfSourceUser = tempTasksArr[taskIndex].from;
  const sourceUser = parsedData.filter(user => user.login === emailOfSourceUser)
  // console.log(sourceUser)


  parsedData[userId - 1].tasks = tempTasksArr;
  

  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'EDIT_TASK',
    tasks: tempTasksArr
  };
};
