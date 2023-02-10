import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import Loading from './Loading';
import Icon from '@mdi/react';
import { mdiBookOpenVariant } from '@mdi/js';
import '../style/signup.css';

function Signup(props) {
  const { setUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

      if (user.status === 400 || user.status === 401) {
        setError(user.data.errors);
      }

      if (user.success) {
        setLoading(true);
        try {
          const res = await authService.loginAwait(email, password);
          if (res.success) {
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='signup-main-container'>
      <div className='signup-logo-container'>
        <p>ODIN-</p>
        <Icon path={mdiBookOpenVariant} size={1.5} />
      </div>
      <form onSubmit={onSubmit} className='signup-form'>
        <h1 className='signup-header'>Signup</h1>
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
        <button type='submit' id='signup-btn'>
          SUBMIT
        </button>
      </form>
      {error ? (
        <div className='signup-error-container'>
          {error.map((error) => {
            return (
              <ul key={error.msg ? error.msg : error.message}>
                <li className='signup-error-text'>
                  {error.msg ? error.msg : error.message}
                </li>
              </ul>
            );
          })}
        </div>
      ) : null}
      <Link to={'/login'}>
        <button id='signup-btn'>Already have an account?</button>
      </Link>
    </div>
  );
}

export default Signup;
