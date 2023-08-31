import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import UserRegister from './components/userRegister';
import UserProfile from './components/UserProfile';
import ProfilePage from './components/profilePage';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/userprofile" element={<UserProfile/>}/>
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path="/about" element={<Login />} />
            <Route path="/blog" element={<Login />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
