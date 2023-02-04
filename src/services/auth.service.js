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
    console.log('ERRRR', error.response);
    return error.response;
  }

  // return axios.post(API_URI + '/login', { email, password }).then((res) => {
  //   // console.log(res.data);
  //   localStorage.setItem('user', JSON.stringify(res.data.user));
  //   return res.data;
  // });
};

const signup = async (email, password, firstname, lastname) => {
  return axios
    .post(API_AUTH_URI + '/signup', { email, password, firstname, lastname })
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

const authService = { loginAwait, signup, logout, getCurrentUser };

export default authService;
