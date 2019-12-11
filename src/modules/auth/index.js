import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { regNewUser, fetchData, loginUser } from '../../actions';

import './auth.sass';

const Auth = props => {
  const [isRegister, setIsRegister] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [requiredMessage, setRequiredMessage] = useState(null);

  useEffect(() => {
    props.fetchData();
  }, [])
  return (
    <form className='auth'>
      <div className='auth__title'>
        <legend>{!isRegister ? 'Login' : 'Registration'}</legend>
        <span>{!isRegister ? 'Login to your account' : "Create your account. It's free ;)"}</span>
      </div>

      <fieldset className='auth__actions'>
        <label className={requiredMessage === 1 ? 'required-message' : null}>
          <span>Login:</span>
          <input onChange={e => setLogin(e.target.value)} value={login} type='text' placeholder='Login...'/>
        </label>
        <label className={requiredMessage === 2 ? 'required-message' : null}>
          <span>Password:</span>
          <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password...'/>
        </label>
        {isRegister && (
          <label className={requiredMessage === 3 ? 'required-message' : null}>
            <span>Confirm password:</span>
            <input onChange={e => setConfPassword(e.target.value)} value={confPassword} type='password' placeholder='Password...'/>
          </label>
        )}
        {isRegister ? 
            <button onClick={event => props.regNewUser(event, login, password, confPassword, setLogin, setPassword, setConfPassword, setRequiredMessage, setIsRegister)} className='auth__actions-submit-btn'>register
        </button>
        :
        <button onClick={event => props.login(event, login, password, setLogin, setPassword)} className='auth__actions-submit-btn'>
        login
      </button>
}
        <button
          onClick={e => {
            e.preventDefault();
            setIsRegister(!isRegister);
          }}
          className='auth__actions-switch-btn'
        >
          {!isRegister ? 'Sign up' : 'I have an account. Go to login page'}
        </button>
      </fieldset>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    test: state.auth.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    regNewUser: (login, password, confPassword, event, setLogin, setPassword, setConfPassword, setRequiredMessage, setIsRegister) =>
      dispatch(regNewUser(login, password, confPassword, event, setLogin, setPassword, setConfPassword, setRequiredMessage, setIsRegister)),
    fetchData: () => dispatch(fetchData()),
    login: (event, login, password, setLogin, setPassword) => dispatch(loginUser(event, login, password, setLogin, setPassword))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
