import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';

function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleFirstname(e) {
    setFirstname(e.target.value);
  }

  function handleLastname(e) {
    setLastname(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const user = await authService.signup(
        email,
        password,
        firstname,
        lastname
      );
      console.log(user);
      // if (user.success) {
      //   console.log('User successfully logged in- proceed to home');
      //   props.setUser(user);
      //   props.setUserLoggedIn(true);
      // } else {
      //   console.log('User login failed- refresh login with error/errors');
      // }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='main-container'>
      <div className='login-container'>
        <div className='logo-container'>
          {/* <img src={require('../assets/bird.png')} alt='logo' id='login-logo' /> */}
          <h1>Signup</h1>
        </div>

        <h1>Signup Form</h1>
        <form onSubmit={onSubmit} className='login-form'>
          <label id='email-label'>
            Email:
            <input type='text' value={email} onChange={handleEmail} />
          </label>
          <label id='password-label'>
            Password:
            <input type='password' value={password} onChange={handlePassword} />
          </label>
          <label id='firstname-label'>
            First name:
            <input
              type='firstname'
              value={firstname}
              onChange={handleFirstname}
            />
          </label>
          <label id='lastname-label'>
            Last name:
            <input type='lastname' value={lastname} onChange={handleLastname} />
          </label>
          <button type='submit' id='login-btn'>
            SUBMIT
          </button>
        </form>
        <Link to={'/login'}>
          <button id='signup-btn'>Already have an account?</button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
