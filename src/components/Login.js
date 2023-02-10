import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import Loading from './Loading';
import Icon from '@mdi/react';
import { mdiBookOpenVariant } from '@mdi/js';
import '../style/login.css';

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
    <div className='login-component'>
      <div className='login-main-container'>
        <div className='login-logo-container'>
          <p>ODIN-</p>
          <Icon path={mdiBookOpenVariant} size={1.5} />
        </div>
        <form onSubmit={onSubmit} className='login-form'>
          <h1 className='login-header'>Login</h1>
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
        {error ? (
          <div className='login-error-container'>
            {error.map((error) => {
              return (
                <ul key={error.msg ? error.msg : error.message}>
                  <li className='login-error-text'>
                    {error.msg ? error.msg : error.message}
                  </li>
                </ul>
              );
            })}
          </div>
        ) : null}
        <Link to={'/signup'}>
          <button id='signup-btn'>Create New Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
