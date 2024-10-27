import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import Home from './pages/home.jsx';
import Listings from './pages/listings.jsx';
import About from './pages/about.jsx';
import ContactUs from './pages/contactUs.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';

function App() {
  return (
    <Router>
      <div>
        {/* Header Section with Title and Slogan }
        <header>
          <Container className="text-center py-3">
            <h1>Rent-a-Buy Real Estate</h1>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>We make it easy</p>
          </Container>
        </header>

        { Navbar }
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        { Main content routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router> 
  );
};

export default App;