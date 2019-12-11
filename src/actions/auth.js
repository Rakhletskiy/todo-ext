import store from '../store';
import { openNotification } from '../helpers/notification';

export const fetchData = () => {
  const users = localStorage.getItem('users');

  return {
    type: 'FETCH_DATA',
    users: JSON.parse(users)
  };
};

export const regNewUser = (event, login, password, confPassword, setLogin, setPassword, setConfPassword, setRequiredMessage, setIsRegister) => {
  const state = store.getState();

  event.preventDefault();

  setPassword('');
  setConfPassword('');

  let tempArr = [];

  const data = localStorage.getItem('users');
  const parsedData = JSON.parse(data);

  let haveThisLogin;
  parsedData !== null && parsedData.forEach(item => (haveThisLogin = item.login === login && true));

  const lastUserId = parsedData !== null ? state.auth.users[state.auth.users.length - 1].id : 0;

  login === '' ? setRequiredMessage(1) : password === '' ? setRequiredMessage(2) : confPassword === '' ? setRequiredMessage(3) : setRequiredMessage(null);
  if (password !== confPassword && password !== '' && confPassword !== '' && login !== '') {
    openNotification('Error!', 'Type the identical passwords please', false);
  } else if (password.length < 6 && password === confPassword && password !== '' && confPassword !== '' && login !== '') {
    openNotification('Error!', 'Password requires 6 or more characters', false);
  } else if (haveThisLogin) {
    openNotification('Error!', 'This login already exists', false);
  } else if (password !== '' && confPassword !== '' && login !== '') {
    openNotification('Success!', 'Thank you for registration! Now you can login in system.', true);
    setLogin('');
    setIsRegister(false);

    const newUser = { id: lastUserId + 1, login: login, password: password };

    if (state.auth.users !== null) {
      tempArr = [...state.auth.users];
    }

    tempArr.push(newUser);
    localStorage.setItem('users', JSON.stringify(tempArr));
  }

  return {
    type: 'REG_NEW_USER',
    users: tempArr.length !== 0 ? tempArr : state.auth.users
  };
};

export const loginUser = (event, login, password, setLogin, setPassword) => {
  event.preventDefault();
  const state = store.getState();

  let currentUser = null;
  if (state.auth.users !== null) {
    state.auth.users.forEach(user => (currentUser = user.login === login && user.password === password && { ...user }));
  }

  if (!currentUser) {
    openNotification('Error!', 'Invalid login or password', false);
    setPassword('');
  } else {
    openNotification('Success!', 'You logged in. Welcome!', true);
    setLogin('');
    setPassword('');
  }

  return {
    type: 'LOGIN_USER',
    payload: currentUser,
    isAuth: currentUser ? true : false
  };
};
