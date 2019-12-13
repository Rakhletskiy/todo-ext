import store from '../store';
import { openNotification } from '../helpers/notification';
import { getParsedUsers } from '../helpers/data/get-parsed-users';
import { regValidate } from '../helpers/data/reg-validation';

export const fetchData = () => {
  return {
    type: 'FETCH_DATA',
    users: getParsedUsers()
  };
};

export const setIsRegister = (isRegister, event) => {
  event.preventDefault();
  return {
    type: 'SET_IS_REGISTER',
    isRegister: !isRegister
  };
};

export const regNewUser = (event, login, password, confPassword, setLogin, setPassword, setConfPassword, setValidatingField) => {
  const state = store.getState();

  event.preventDefault();

  // discard password input fields
  setPassword('');
  setConfPassword('');

  // make empty temporary empty array bcs Redux doesn't love when we change state directly
  let tempArr = [];
  // get data from LocalStorage
  const parsedData = getParsedUsers();

  let haveThisLogin;

  const lastUserId = parsedData !== null ? state.auth.users[state.auth.users.length - 1].id : 0;

  // check if user already exists in system
  parsedData !== null && parsedData.forEach(item => (haveThisLogin = item.login === login && true));

  // initialize newUser
  const newUser = { id: lastUserId + 1, login: login, password: password };

  // get users from state if anyone exists
  if (state.auth.users !== null) {
    tempArr = [...state.auth.users];
  }

  // check if fields validated success
  const isValid = regValidate(login, password, confPassword, haveThisLogin, setValidatingField, openNotification, setLogin);
  if (isValid) {
    // set to LocalStorage updated array with users
    tempArr.push(newUser);
    localStorage.setItem('users', JSON.stringify(tempArr));
  }

  return {
    type: 'REG_NEW_USER',
    users: tempArr.length !== 0 ? tempArr : state.auth.users,
    isRegister: isValid ? false : true
  };
};

export const loginUser = (event, login, password, setLogin, setPassword) => {
  event.preventDefault();
  const state = store.getState();

  // set current user
  let currentUser;
  if (state.auth.users !== null) {
    state.auth.users.forEach(user => {
      if(user.login === login && user.password === password) {
        currentUser = { ...user }
      }
    });
  }
  
  // validate login fields
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
