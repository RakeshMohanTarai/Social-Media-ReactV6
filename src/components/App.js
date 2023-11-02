// import React, { useEffect, useState } from 'react';
// import { getPosts } from '../api/index';
import {Home} from '../pages';
import { Signup, Login, Settings, UserProfile } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useAuth } from '../hooks';
import { AuthContext, useProviderAuth } from "../hooks";
import { Navigate } from 'react-router-dom';

const Error = () => {
  return <h1>404</h1>;
};

function App() {
  // const [posts, setposts] = useState([]);
  // const [loading, setLoading] = useState(true);
  //const auth = useAuth();
  const auth = useProviderAuth();
  console.log('auth', auth);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const response = await getPosts();

  //     //console.log('response', response);

  //     if (response.success) {
  //       setposts(response.data.posts);
  //     }

  //     setLoading(false);
  //   };
  //   fetchPost();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

  // const About = () => {
  //   return <h1>About</h1>;
  // };

  // const UserInfo = () => {
  //   return <h1>User</h1>;
  // };
 
  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
      <Router>
        <Navbar />
  {/* Provide the AuthContext value to the components */}
        <Routes>
          {/* <Route path="/" element={<Home posts={[]} />} /> */}
          <Route exact path='/' element={auth.user? (<> <Home/> </>) : <Navigate to={'/Login'}/>}/>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/about" element={<About />} /> */}
          <Route path="/register" element={<Signup />} /> 
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route element={<Error />} />
        </Routes>
        
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
