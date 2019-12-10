import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import './auth.sass';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <form className='auth'>
      <div className='auth__title'>
        <legend>{isLogin ? 'Login' : 'Registration'}</legend>
        <span>{isLogin ? 'Login to your account' : "Create your account. It's free ;)"}</span>
      </div>

      <fieldset className='auth__actions'>
        <label>
          <span>Login:</span>
          <input placeholder='Login...' />
        </label>
        <label>
          <span>Password:</span>
          <input placeholder='Password...' />
        </label>
        {!isLogin && (
          <label>
            <span>Confirm password:</span>
            <input placeholder='Password...' />
          </label>
        )}
        <button className='auth__actions-submit-btn'>{isLogin ? 'login' : 'register'}</button>
        <button onClick={e => {e.preventDefault(); setIsLogin(!isLogin)}} className='auth__actions-switch-btn'>
          {isLogin ? 'Sign up' : 'I have an account. Go to login page'}
        </button>
      </fieldset>
    </form>
  );
};

export default Auth;
