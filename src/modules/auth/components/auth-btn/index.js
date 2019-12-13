import React from 'react';

const AuthBtn = props => {
  const { isRegister, loginText, password, confPassword, setLoginText, setPassword, setConfPassword, setValidatingField, setIsRegister, login, regNewUser } = props;
  return isRegister ? (
    <button
      onClick={event => regNewUser(event, loginText, password, confPassword, setLoginText, setPassword, setConfPassword, setValidatingField, setIsRegister)}
      className='auth__actions-submit-btn'
    >
      register
    </button>
  ) : (
    <button onClick={event => login(event, loginText, password, setLoginText, setPassword)} className='auth__actions-submit-btn'>
      login
    </button>
  );
};

export default AuthBtn;
