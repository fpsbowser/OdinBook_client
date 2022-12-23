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
    });
};

const authService = { login, signup };

export default authService;
