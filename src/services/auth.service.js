import axios from 'axios';

const API_AUTH_URI = 'http://localhost:4000/api/auth';

const loginAwait = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      data: { email, password },
      url: `${API_AUTH_URI}/login`,
    });

    if (res.status === 200) {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    }
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const signup = async (email, password, firstname, lastname) => {
  try {
    const res = await axios({
      method: 'post',
      data: {
        email,
        password,
        firstname,
        lastname,
      },
      url: `${API_AUTH_URI}/signup`,
    });
    if (res.status === 200) {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = async () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = { loginAwait, signup, logout, getCurrentUser };

export default authService;
