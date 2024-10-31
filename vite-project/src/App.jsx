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
import client from './apolloClient';
import AddProperty from './pages/AddProperty.jsx';
import { ApolloProvider } from '@apollo/client';

function App() {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Check for token presence

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/listings"
            element={isLoggedIn ? <Listings /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/about"
            element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/contactUs"
            element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/search"
            element={isLoggedIn ? <Search /> : <Navigate to="/login" replace />}
          />
          <Route path ="/add-property" element={isLoggedIn ? <AddProperty /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
