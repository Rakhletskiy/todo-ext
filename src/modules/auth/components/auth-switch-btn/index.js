import React from 'react';

const AuthSwitchBtn = ({ setIsRegister, isRegister }) => {
  return (
    <button
      onClick={e => {
        setIsRegister(isRegister, e);
      }}
      className='auth__actions-switch-btn'
    >
      {!isRegister ? 'Sign up' : 'I have an account. Go to login page'}
    </button>
  );
};

export default AuthSwitchBtn;
