import React, { useState } from 'react';
import authService from '../services/auth.service';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(user);
      if (user.success) {
        console.log('User successfully logged in- proceed to home');
        props.setUser(user);
        props.setUserLoggedIn(true);
      } else {
        console.log('User login failed- refresh login with error/errors');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='main-container'>
      <div className='login-container'>
        <div className='logo-container'>
          {/* <img src={require('../assets/bird.png')} alt='logo' id='login-logo' /> */}
          <h1>Twotter!</h1>
        </div>

        <h1>Login</h1>
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
        <button id='signup-btn'>Create New Account</button>
      </div>
    </div>
  );
}

export default Login;
