import React from 'react';

const AuthTitle = ({ isRegister }) => {
  return (
    <div className='auth__title'>
      <legend>{!isRegister ? 'Login' : 'Registration'}</legend>
      <span>{!isRegister ? 'Login to your account' : "Create your account. It's free ;)"}</span>
    </div>
  );
};

export default AuthTitle;
