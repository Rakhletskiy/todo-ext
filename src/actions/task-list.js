import store from '../store';

export const fetchTasksData = userId => {
  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);

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

  setTaskText('');

  let tempTasksArr = state.taskList.currentTasks != null ? [...state.taskList.currentTasks] : [];

  const tasks = tempTasksArr.filter(task => !task.from && task);

  const tempUsersArr = [...state.auth.users];

  const tempUser = { ...state.auth.users[userId - 1] };

  if (taskText !== '') {
    tasks.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });
    tempTasksArr.push({ id: tempTasksArr.length > 0 ? tempTasksArr[tempTasksArr.length - 1].id + 1 : 1, label: taskText });
    tempUsersArr.splice(userId - 1, 1, tempUser);

    tempUser.tasks = tasks;

    // because Redux doesn't love when we change state directly

    localStorage.setItem('users', JSON.stringify(tempUsersArr));
  }

  return {
    type: 'ADD_TASK',
    tasks: tempTasksArr
  };
};

export const onDelTask = (taskIndex, userId) => {
  const state = store.getState();

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);
  let tempTasksArr = [...state.taskList.currentTasks];


  const emailOfSourceUser = tempTasksArr[taskIndex].from;
 

  parsedData.forEach(user => {
    if(user.id === userId && user.sharedTasks) {
      user.sharedTasks.forEach((sharedTask, index) => sharedTask.id === tempTasksArr[taskIndex].id && user.sharedTasks.splice(index, 1))
    } else if (user.login === emailOfSourceUser && user.sharedTasks) {
      user.tasks.forEach((task, index) => tempTasksArr[taskIndex].task.id === task.id && tempTasksArr[taskIndex].task.label === task.label && user.tasks.splice(index, 1))
    }
  })

  tempTasksArr.splice(taskIndex, 1);

  

  parsedData[userId - 1].tasks = tempTasksArr;

  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'DEL_TASK',
    tasks: tempTasksArr
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

  const sharedTasksEdited = parsedData[userId - 1].sharedTasks && [...parsedData[userId - 1].sharedTasks];

  if (isSharedTask) {
    const sourceUser = parsedData.filter(user => user.login === emailOfSourceUser);
    const sourceUserEditedTasks = isSharedTask && sourceUser[0].tasks.map(task => (task.id === taskId ? { id: task.id, label: editedTask } : task));
    parsedData[sourceUser[0].id - 1].tasks = sourceUserEditedTasks;

    let sharedEditTaskInd;
    sharedTasksEdited.forEach((task, index) => (sharedEditTaskInd = task.task.id === taskId && index));

    sharedTasksEdited.splice(sharedEditTaskInd, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
    parsedData[userId - 1].sharedTasks = sharedTasksEdited;
    tempTasksArr.splice(taskIndex, 1, { from: emailOfSourceUser, task: { id: taskId, label: editedTask } });
  } else {
    tempTasksArr.splice(taskIndex, 1, { id: taskId, label: editedTask });
    const ownTasks = tempTasksArr.filter(task => !task.from && task);
    parsedData[userId - 1].tasks = ownTasks;
  }

  localStorage.setItem('users', JSON.stringify(parsedData));

  return {
    type: 'EDIT_TASK',
    tasks: tempTasksArr
  };
};
