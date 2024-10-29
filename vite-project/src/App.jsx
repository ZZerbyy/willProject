import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Listings from './pages/listings.jsx';
import About from './pages/about.jsx';
import ContactUs from './pages/contactUs.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import Search from './pages/Search.jsx';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not logged in */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/listings" element={isLoggedIn ? <Listings /> : <Navigate to="/login" />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/contactUs" element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
