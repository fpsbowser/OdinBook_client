import React from 'react';
import authService from '../services/auth.service';

function Error(props) {
  const { error } = props;
  console.log(error);
  if (error.response !== undefined) {
    if (error.response.status === 401) {
      authService.logout();
      return (
        <div className='error-container'>
          <h2>
            Error: {error.response.status} : {error.response.statusText}
          </h2>
          <p className='error-message'>
            Your session has expired, please log back in.
          </p>
        </div>
      );
    }
  }

  if (error.message !== undefined) {
    if (error.message === 'user is null') {
      return (
        <div className='error-container'>
          <h2>Error: {error.message}</h2>
          <p className='error-message'>
            Your session has expired, please log back in.
          </p>
        </div>
      );
    }
    return (
      <div className='error-container'>
        <h2>Error: {error.message}</h2>
        <p className='error-message'>
          Please make sure the user ID is correct!
        </p>
      </div>
    );
  }
}

export default Error;
