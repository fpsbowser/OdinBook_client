import axios from 'axios';

const API_URI = 'http://localhost:4000/api/auth';

const login = async (email, password) => {
  return axios.post(API_URI + '/login', { email, password }).then((res) => {
    // console.log(res.data);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  });
};

const signup = async (email, password, firstname, lastname) => {
  return axios
    .post(API_URI + '/signup', { email, password, firstname, lastname })
    .then((res) => {
      console.log(res.data);
      return res.data;
      // if success login newly created user?
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = async () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = { login, signup, logout, getCurrentUser };

export default authService;
