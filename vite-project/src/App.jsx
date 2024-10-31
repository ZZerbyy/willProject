// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Listings from './pages/listings.jsx';
import About from './pages/about.jsx';
import ContactUs from './pages/contactUs.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import Search from './pages/Search.jsx';
import client from './apolloClient'; // Import the Apollo Client
import { ApolloProvider } from '@apollo/client';
function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <ApolloProvider client={client}> {/* Wrap the entire app with ApolloProvider */}
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/listings" element={isLoggedIn ? <Listings /> : <Navigate to="/login" />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/contactUs" element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
