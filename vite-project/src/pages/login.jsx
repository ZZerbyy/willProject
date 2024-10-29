import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

function Login() {
  return (
    <Container className="login-container">
      <Navigation />
      <h1>Login/<Nav.Link href="/signUp" className="me-3">Sign-Up</Nav.Link></h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Footer />
    </Container>
  );
}

export default Login;