import React from 'react';
import { connect } from 'react-redux';

import './auth.sass';
import AuthTitle from './components/auth-title';
import AuthFields from './components/auth-fields';

const Auth = ({ isRegister }) => {
  return (
    <form className='auth'>
      <AuthTitle isRegister={isRegister} />
      <AuthFields isRegister={isRegister} />
    </form>
  );
};

const mapStateToProps = state => {
  return {
    isRegister: state.auth.isRegister
  };
};

export default connect(mapStateToProps)(Auth);
