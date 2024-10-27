import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import Home from './pages/home.js';
import Listings from './pages/listings.js';
import About from './pages/about.js';
import ContactUs from './pages/contactUs.js';
import Login from './pages/login.js';
import SignUp from './pages/signUp.js';

function App() {
  return (
    <Router>
      <div>
        {/* Header Section with Title and Slogan /}
        <header>
          <Container className="text-center py-3">
            <h1>Rent-a-Buy Real Estate</h1>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>We make it easy</p>
          </Container>
        </header>

        {/ Navbar /}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/listings">Listings</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/ Main content routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;