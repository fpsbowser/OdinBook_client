import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Loading from './components/Loading';
import Login from './components/Login';
import Signup from './components/Signup';
import authService from './services/auth.service';
import ProfileDetail from './components/ProfileDetail';
import Nav from './components/Nav';
import Error from './components/Error';
import PostDetail from './components/PostDetail';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checks localstorage for user
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  function handlelogout() {
    authService.logout();
    setUser(null);
  }

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Nav loggedInUser={user} handlelogout={handlelogout} />
      <Routes>
        <Route
          path='/'
          element={<Home loggedInUser={user} handlelogout={handlelogout} />}
        />
        <Route
          path='/login'
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path='/error' element={<Error error={error} />} />
        <Route path='/signup' element={<Signup setUser={setUser} />} />
        <Route
          path='/profile/:userid'
          element={<ProfileDetail currentUser={user} />}
        />
        <Route
          path='/profile/:userid/posts/:postid'
          element={<PostDetail loggedInUser={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
