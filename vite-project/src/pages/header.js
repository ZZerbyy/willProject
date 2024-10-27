import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Header.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Rent-A-Buy Real Estate</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/home.js">Home</Nav.Link>
        <Nav.Link as={Link} to="/listings.js">Listings</Nav.Link>
        <Nav.Link as={Link} to="/about.js">About</Nav.Link>
        <Nav.Link as={Link} to="/contact.js">Contact Us</Nav.Link>
        <Nav.Link as={Link} to="/login.js">Login</Nav.Link>
        <Nav.Link as={Link} to="/signup.js">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;