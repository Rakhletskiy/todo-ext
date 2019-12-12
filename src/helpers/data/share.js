import { openNotification } from '../notification';

export const onShareTask = (destinationEmail, userId, taskIndex, setDestinationEmail, setIsSharing) => {
  setDestinationEmail('');
  

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);
  const tempTasksArr = parsedData[userId - 1].tasks;
  const destinationUser = parsedData.filter(user => user.login === destinationEmail);
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(destinationEmail);

  if (destinationUser.length != 0) {
    console.log(destinationUser.length)
    console.log('ahutet')
    if (!destinationUser[0].sharedTasks && isValidEmail) {
      destinationUser[0].sharedTasks = [];
    }
  }

  if (destinationEmail.length > 0 && isValidEmail && destinationUser.length != 0) {
    destinationUser[0].sharedTasks.push({ from: parsedData[userId - 1].login, task: [tempTasksArr[taskIndex]] });
    parsedData.splice(destinationUser[0].id - 1, 1, destinationUser[0]);
    localStorage.setItem('users', JSON.stringify(parsedData));
    openNotification('Success!', 'Task shared successfully', true);
    setIsSharing(false);
  } else if (destinationUser.length == 0 && isValidEmail) {
    openNotification('Error!', 'User is not register in system', false);
  } else if (!isValidEmail) {
    openNotification('Error!', 'Invalid e-mail format', false);
  } else {
    openNotification('Error!', 'Please type the user email address for share', false);
  }
};
