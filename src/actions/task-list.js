import store from '../store';
import { Item } from 'rc-menu';

export const fetchTasksData = userId => {
  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);

  console.log(parsedData)

  return {
    type: 'FETCH_TASK_DATA',
    tasks:
      parsedData !== null && parsedData[userId - 1].sharedTasks && !parsedData[userId - 1].tasks
        ? parsedData[userId - 1].sharedTasks
        : parsedData !== null && parsedData[userId - 1].sharedTasks && parsedData[userId - 1].tasks
        ? parsedData[userId - 1].sharedTasks.concat(parsedData[userId - 1].tasks)
        : parsedData !== null
        ? parsedData[userId - 1].tasks
        : []
  };
};

export const onAddNewTask = (userId, taskText) => {
  const state = store.getState();

  let tempTasksArr = state.taskList.currentTasks != null ? [...state.taskList.currentTasks] : [];
  
  

  // const sharedTasks = tempTasksArr.filter(task => task.from && task);
  const tasks = tempTasksArr.filter(task => !task.from && task);


  const tempUsersArr = [...state.auth.users];

  const tempUser = { ...state.auth.users[userId - 1] };


  tasks.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });
  tempTasksArr.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });

    tempUser.tasks = tasks;
    console.log(tempUser)
    // tempUser.sharedTasks = sharedTasks;
    tempUsersArr.splice(userId - 1, 1, tempUser);
  // }

  // because Redux doesn't love when we change state directly

  // localStorage.removeItem('users');
  localStorage.setItem('users', JSON.stringify(tempUsersArr));

  return {
    type: 'ADD_TASK',
    tasks: tempTasksArr
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

export const onEditTask = (taskIndex, userId, taskId, editedTask, setIsEditing) => {
  const state = store.getState();
  setIsEditing(false);

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);
  const tempTasksArr = [...state.taskList.currentTasks];

  const emailOfSourceUser = tempTasksArr[taskIndex].from;
  let isSharedTask = !!emailOfSourceUser;
  // if()
  const sharedTasksEdited = [...parsedData[userId - 1].sharedTasks];
  if (isSharedTask) {
    const sourceUser = parsedData.filter(user => user.login === emailOfSourceUser);
    const sourceUserEditedTasks = isSharedTask && sourceUser[0].tasks.map(task => (task.id === taskId ? { id: task.id, label: editedTask } : task));
    parsedData[sourceUser[0].id - 1].tasks = sourceUserEditedTasks;

    let sharedEditTaskInd;
    sharedTasksEdited.forEach((task, index) => sharedEditTaskInd = task.task.id === taskId && index)
    
    console.log(sharedEditTaskInd);
    sharedTasksEdited.splice(sharedEditTaskInd, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
    console.log(sharedTasksEdited);
    parsedData[userId - 1].sharedTasks = sharedTasksEdited;
    tempTasksArr.splice(taskIndex, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
  } else {
    tempTasksArr.splice(taskIndex, 1, { id: taskId, label: editedTask });
    const ownTasks = tempTasksArr.filter(task => !task.from && task)
    parsedData[userId - 1].tasks = ownTasks;
  }


  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'EDIT_TASK',
    tasks: tempTasksArr
  };
};
