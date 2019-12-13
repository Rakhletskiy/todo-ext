import store from '../store';
import { getParsedUsers } from '../helpers/data/get-parsed-users';

export const fetchTasksData = userId => {
  
  // get parsed users
  const parsedData = getParsedUsers();

  // check if current user have shared tasks and if true - concat shared tasks array and tasks array
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

export const onAddNewTask = (userId, taskText, setTaskText) => {
  const state = store.getState();

  // discard add task input value
  setTaskText('');

  // make copy of current tasks (Redux rules) if the current tasks array not empty
  let tempTasksArr = state.taskList.currentTasks != null ? [...state.taskList.currentTasks] : [];

  // get only user's tasks (without shared)
  const tasks = tempTasksArr.filter(task => !task.from && task);

  // make copy of users array
  const tempUsersArr = [...state.auth.users];

  // find current user
  const tempUser = { ...state.auth.users[userId - 1] };

  // validate new task text input
  if (taskText !== '') {
    // push new task to only tasks array and push to temp tasks array with shared tasks for Redux
    tasks.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });
    tempTasksArr.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });
    tempUsersArr.splice(userId - 1, 1, tempUser);

    // redefine tasks key of user
    tempUser.tasks = tasks;

    // set updated users array to Local Storage
    localStorage.setItem('users', JSON.stringify(tempUsersArr));
  }

  return {
    type: 'ADD_TASK',
    tasks: tempTasksArr
  };
};

export const onDelTask = (taskIndex, userId) => {
  const state = store.getState();

  // get parsed users from Local Storage
  const parsedData = getParsedUsers();

  // copy current tasks
  let tempTasksArr = [...state.taskList.currentTasks];

  // get owner of task login if removing shared task
  const emailOfSourceUser = tempTasksArr[taskIndex].from;
 
  // delete task from LS tasks array or from LS source user shared tasks array if removing shared task
  parsedData.forEach(user => {
    if(user.id === userId && user.sharedTasks) {
      user.sharedTasks.forEach((sharedTask, index) => sharedTask.id === tempTasksArr[taskIndex].id && user.sharedTasks.splice(index, 1))
    } else if (user.login === emailOfSourceUser && !user.sharedTasks) {
      user.tasks.forEach((task, index) => tempTasksArr[taskIndex].task.id === task.id && tempTasksArr[taskIndex].task.label === task.label && user.tasks.splice(index, 1))
    }
  })

  // update tasks array for Redux
  tempTasksArr.splice(taskIndex, 1);
  // update tasks array for LS
  parsedData[userId - 1].tasks = tempTasksArr;

  // set updated users array to LS
  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'DEL_TASK',
    tasks: tempTasksArr
  };
};

export const onEditTask = (taskIndex, userId, taskId, editedTask, setIsEditing) => {
  const state = store.getState();

  // delete from html edit block
  setIsEditing(false);

  // get parsed users from LS
  const parsedData = getParsedUsers();

  // copy current tasks array (Redux rules)
  const tempTasksArr = [...state.taskList.currentTasks];

  // get login of source user if current task is shared
  const emailOfSourceUser = tempTasksArr[taskIndex].from;

  let isSharedTask = !!emailOfSourceUser;

  // edit get shared tasks array of user for update in LS if editing shared task
  const sharedTasksEdited = parsedData[userId - 1].sharedTasks && [...parsedData[userId - 1].sharedTasks];

  // check if editing shared task
  if (isSharedTask) {
    // get source user
    const sourceUser = parsedData.filter(user => user.login === emailOfSourceUser);
    
    // update users array with new editing list of tasks of source user
    const sourceUserEditedTasks = isSharedTask && sourceUser[0].tasks.map(task => (task.id === taskId ? { id: task.id, label: editedTask } : task));
    parsedData[sourceUser[0].id - 1].tasks = sourceUserEditedTasks;

    // update users array with new iditing list of task of user
    let sharedEditTaskInd;
    sharedTasksEdited.forEach((task, index) => (sharedEditTaskInd = task.task.id === taskId && index));
    sharedTasksEdited.splice(sharedEditTaskInd, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
    parsedData[userId - 1].sharedTasks = sharedTasksEdited;

    // update tasks array for Redux
    tempTasksArr.splice(taskIndex, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
  } else {
    // update tasks array for Redux
    tempTasksArr.splice(taskIndex, 1, { id: taskId, label: editedTask });

    // update users array with new iditing list of task of user
    const ownTasks = tempTasksArr.filter(task => !task.from && task);
    parsedData[userId - 1].tasks = ownTasks;
  }

  // set updated users array to LS
  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'EDIT_TASK',
    tasks: tempTasksArr
  };
};
