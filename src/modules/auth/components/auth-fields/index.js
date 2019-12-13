import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { regNewUser, fetchData, loginUser, setIsRegister } from '../../../../actions';

import AuthBtn from '../auth-btn';
import AuthSwitchBtn from '../auth-switch-btn';

const AuthFields = props => {
  const [loginText, setLoginText] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [validatingField, setValidatingField] = useState(null);

  // fetching data in componentDidMount lifecycle phase
  useEffect(() => {
    fetchData();
  }, []);

  const { isRegister, fetchData, login, setIsRegister, regNewUser } = props;
  return (
    <fieldset className='auth__actions'>
      <label className={validatingField === 1 ? 'required-message' : validatingField === 4 ? 'invalid-email' : null}>
        <span>E-mail:</span>
        <input onChange={e => setLoginText(e.target.value)} value={loginText} type='email' placeholder='E-mail...' />
      </label>
      <label className={validatingField === 2 ? 'required-message' : null}>
        <span>Password:</span>
        <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password...' />
      </label>
      {isRegister && (
        <label className={validatingField === 3 ? 'required-message' : null}>
          <span>Confirm password:</span>
          <input onChange={e => setConfPassword(e.target.value)} value={confPassword} type='password' placeholder='Password...' />
        </label>
      )}
      <AuthBtn
        isRegister={isRegister}
        regNewUser={regNewUser}
        loginText={loginText}
        password={password}
        confPassword={confPassword}
        setLoginText={setLoginText}
        setPassword={setPassword}
        setConfPassword={setConfPassword}
        setValidatingField={setValidatingField}
        setIsRegister={setIsRegister}
        login={login}
      />
      <AuthSwitchBtn setIsRegister={setIsRegister} isRegister={isRegister} />
    </fieldset>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setIsRegister: (isRegister, e) => dispatch(setIsRegister(isRegister, e)),
    regNewUser: (login, password, confPassword, event, setLogin, setPassword, setConfPassword, setValidatingField, setIsRegister) =>
      dispatch(regNewUser(login, password, confPassword, event, setLogin, setPassword, setConfPassword, setValidatingField, setIsRegister)),
    fetchData: () => dispatch(fetchData()),
    login: (event, login, password, setLogin, setPassword) => dispatch(loginUser(event, login, password, setLogin, setPassword))
  };
};

export default connect(null, mapDispatchToProps)(AuthFields);
