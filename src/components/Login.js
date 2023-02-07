import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import Loading from './Loading';

function Login(props) {
  const { user, setUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.loginAwait(email, password);
      if (res.success) {
        console.log('User successfully logged in- proceed to home');
        setUser(res);
        window.location.href = '/';
      }

      if (res.status === 400 || res.status === 401) {
        setError(res.data.errors);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div className='main-container'>
        <h1>You are already logged in</h1>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
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
      {error ? (
        <div className='error-container'>
          {error.map((error) => {
            return (
              <h2 key={error.msg ? error.msg : error.message}>
                {error.msg ? error.msg : error.message}
              </h2>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
