
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';  // Import the custom CSS for the navbar

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="/">CTU Buddy</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/" className="me-3">Home</Nav.Link>
          <Nav.Link href="listings" className="me-3">Listings</Nav.Link>
          <Nav.Link href="/about" className="me-3">About</Nav.Link>
          <Nav.Link href="/contactUs" className="me-3">Contact Us</Nav.Link>
          <Nav.Link href="/login" className="me-3">Login</Nav.Link>
          <Nav.Link href="/signUp" className="me-3">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
