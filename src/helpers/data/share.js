import { openNotification } from '../notification';

export const onShareTask = (destinationEmail, userId, taskIndex, setDestinationEmail, setIsSharing, label) => {
  setDestinationEmail('');

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);
  const tempTasksArr = parsedData[userId - 1].tasks;
  const destinationUser = parsedData.filter(user => user.login === destinationEmail);
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(destinationEmail);
  const ownerOfTask = parsedData.filter(user => user.id === userId);
  let copyOfSharedTask;
  parsedData.forEach(user => {
    if (user.login === destinationEmail) {
      copyOfSharedTask =
        user.sharedTasks &&
        tempTasksArr[taskIndex] &&
        user.sharedTasks.filter(task => task.task && task.task.id === tempTasksArr[taskIndex].id && task.task.label === tempTasksArr[taskIndex].label && task);
    }
  });

  if (destinationUser.length != 0) {
    if (!destinationUser[0].sharedTasks && isValidEmail) {
      destinationUser[0].sharedTasks = [];
    }
  }


  if (destinationEmail.length > 0 && isValidEmail && destinationUser.length != 0 && destinationUser[0].login !== ownerOfTask[0].login && copyOfSharedTask.length === 0) {
    destinationUser[0].sharedTasks.push({ from: parsedData[userId - 1].login, task: tempTasksArr[taskIndex] });
    parsedData.splice(destinationUser[0].id - 1, 1, destinationUser[0]);
    localStorage.setItem('users', JSON.stringify(parsedData));
    openNotification('Success!', `Task >> ${label} << shared successfully`, true);
    setIsSharing(false);
  } else if (destinationUser.length == 0 && isValidEmail) {
    openNotification('Error!', 'User is not register in system', false);
  } else if (!isValidEmail) {
    openNotification('Error!', 'Invalid e-mail format', false);
  } else if (destinationUser[0].login === ownerOfTask[0].login) {
    openNotification('Error!', 'Task can not sharing itself!', false);
  } else if (copyOfSharedTask.length !== 0) {
    openNotification('Error!', 'You can not copy the shared task!', false);
  } else if (destinationEmail.length === 0) {
    openNotification('Error!', 'Please type the user email address for share', false);
  }
};
