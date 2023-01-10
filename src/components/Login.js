import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';

function Login(props) {
  const { user, setUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const user = await authService.login(email, password);
      if (user.success) {
        console.log('User successfully logged in- proceed to home');
        setUser(user);
        window.location.href = '/';
      } else {
        // TODO: Add error handling
        console.log('User login failed- refresh login with error/errors');
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (user) {
    return (
      <div className='main-container'>
        <h1>You are already logged in</h1>
      </div>
    );
  }

  return (
    <div className='main-container'>
      <div className='login-container'>
        <div className='logo-container'>
          {/* <img src={require('../assets/bird.png')} alt='logo' id='login-logo' /> */}
          <h1>Login</h1>
        </div>

        <h1>Login Form</h1>
        <form onSubmit={onSubmit} className='login-form'>
          <label id='email-label'>
            Email:
            <input type='text' value={email} onChange={handleEmail} />
          </label>
          <label id='password-label'>
            Password:
            <input type='password' value={password} onChange={handlePassword} />
          </label>
          <button type='submit' id='login-btn'>
            LOGIN
          </button>
        </form>
        <Link to={'/signup'}>
          <button id='signup-btn'>Create New Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
