import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const URI = 'http://localhost:4000/api/';

  // Chnage to check if user exists/logged in
  function getData() {
    fetch(URI, { mode: 'cors' })
      .then((res) => res.json())
      .then(
        (result) => {
          // setUser(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getData();
  }, []);

  // if (userLoggedIn) {
  //   return <Home user={user} />;
  // } else {
  //   return <Login setUser={setUser} setUserLoggedIn={setUserLoggedIn} />;
  // }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
